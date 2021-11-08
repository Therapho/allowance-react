using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using api.Entities;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security;
using System.Threading;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.TaskWeekSet
{
    public class AcceptTaskWeek : Function
    {
        private TaskWeekService _taskWeekService;
        private TransactionLogService _transactionLogService;
        private FundService _fundService;

        public AcceptTaskWeek(AccountService accountService, 
            TaskWeekService taskWeekService, FundService fundService, TransactionLogService transactionLogService)
            : base(accountService)
        {
            _taskWeekService = taskWeekService;
            _transactionLogService = transactionLogService;
            _fundService = fundService;
        }

        [FunctionName("AcceptTaskWeek")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "post", Route = "accepttaskweek")] HttpRequest req, ILogger log, CancellationToken ct)
        {
            

            TaskWeek taskWeek = null;

            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                taskWeek = JsonConvert.DeserializeObject<TaskWeek>(requestBody);
                log.LogTrace($"AcceptTaskWeek function processed a request for taskWeekId:{taskWeek.Id}.");

                var context = await RequestContext.CreateContext(AccountService, req);

                 
                if (!context.IsParent())
                {
                    throw new SecurityException("Invalid attempt to accept a taskweek by an invalid user");
                }

                await _taskWeekService.Update(taskWeek, false);
                var fundList = await _fundService.GetList(taskWeek.AccountId);

                _fundService.CheckAllocationTotal(fundList);

                foreach (var fund in fundList)
                {
                    var allocationAmount = taskWeek.Value * fund.Allocation.GetValueOrDefault() / 100;


                    var description = $"Weekly allowance deposit ({fund.Allocation}%)";
                    var transaction = new Transaction(description, (int)Constants.TransactionCategory.Deposit,
                                                      allocationAmount, fund.Id, taskWeek.AccountId);
                    await _fundService.ProcessTransaction(transaction, context.CallingAccount.Id);
                }

            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to update task week (AcceptTaskWeek).  {exception.Message}");
            }
            return new OkObjectResult(taskWeek.Id);
        }
       
    }
}