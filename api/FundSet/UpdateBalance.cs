using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using api.Common;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;
using System.Security;
using System.Threading;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.AccountSet
{
    public class UpdateBalance : Function
    {

        private TransactionLogService _transactionLogService;
        private FundService _fundService;

        public UpdateBalance(AccountService accountService, FundService fundService,
            TransactionLogService transactionLogService) : base(accountService)
        {
            _transactionLogService = transactionLogService;
            _fundService = fundService;
        }

        [FunctionName("UpdateBalance")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "post", Route = "fundset/updatebalance")] HttpRequest request, ILogger log, CancellationToken ct)
        {
            string requestBody = await new StreamReader(request.Body).ReadToEndAsync();
            var transaction = JsonConvert.DeserializeObject<Transaction>(requestBody);
            var context = await RequestContext.CreateContext(AccountService, request);

            try
            {
                // Parents can deposit and withdraw, children can only transfer.  
                if (context.IsParent() || transaction.CategoryId == (int)Constants.TransactionCategory.Transfer)
                {

                    log.LogTrace($"UpdateBalance function processed a request from user:{context.UserPrincipal.UserDetails}.");
                    await _fundService.ProcessTransaction(transaction, transaction.TargetAccountId);
                }
                else
                { 
                    throw new SecurityException("Invalid attempt to access a record by an unauthorized user");
                }
            }
            catch (Exception exception)
            {
                return new BadRequestObjectResult($"Error trying to execute UpdateBalance.  {Utility.ParseError(exception)}");
            }
            return new OkObjectResult(true);
        }
    }
}
