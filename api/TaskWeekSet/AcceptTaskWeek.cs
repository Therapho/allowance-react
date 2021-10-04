using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
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

        public AcceptTaskWeek(AccountService accountService, 
            TaskWeekService taskWeekService, TransactionLogService transactionLogService)
            : base(accountService)
        {
            _taskWeekService = taskWeekService;
            _transactionLogService = transactionLogService;
        }

        [FunctionName("AcceptTaskWeek")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "post", Route = "accepttaskweek")] HttpRequest req, ILogger log, CancellationToken ct)
        {
            

            TaskWeek data = null;

            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                data = JsonConvert.DeserializeObject<TaskWeek>(requestBody);
                log.LogTrace($"AcceptTaskWeek function processed a request for taskWeekId:{data.Id}.");
                
                var userPrincipal = req.GetUserPrincipal();
                 
                if (!userPrincipal.IsInRole(Constants.PARENT_ROLE))
                {
                    throw new SecurityException("Invalid attempt to accept a taskweek by an invalid user");
                }
                await _taskWeekService.Update(data, false);
                var account = await AccountService.Get(data.AccountId);
                account.Balance += data.Value;
                await AccountService.Update(account, false);

                var transaction = new TransactionLog()
                {
                    AccountId = account.Id,
                    Amount = data.Value,
                    CategoryId = (int)Constants.TransactionCategory.Deposit,
                    Date = DateTime.Now,
                    Description = "Weekly allowance deposit."


                };
                await _transactionLogService.Create(transaction, false);
                await _transactionLogService.SaveChanges();

            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute PutTaskWeek.  {exception.Message}");
            }
            return new OkObjectResult(data.Id);
        }

    }
}