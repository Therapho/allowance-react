using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.TransactionLogSet
{
    public class GetTransactionLogList : Function
    {
        private TransactionLogService _transactionLogService;

        public GetTransactionLogList(AccountService accountService, 
            TransactionLogService transactionLogService)
            : base(accountService) { _transactionLogService = transactionLogService; }

        [FunctionName("GetTransactionLogList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "transactionlogset")] HttpRequest req, ILogger log)
        {
            List<TransactionLog> result = null;
            try
            {
                var targetAccountId = 0;
                var userPrincipal = req.GetUserPrincipal();
                var callingAccount = await AccountService.GetByUser(userPrincipal.UserId);

                if (req.Query.HasValue("accountid"))

                    targetAccountId = req.Query.GetValue<int>("accountid");
                else
                    targetAccountId = callingAccount.Id;

               
                //var account = await AccountService.Get(accountId);

                log.LogTrace($"GetTransactionLogList triggered for accountId:{targetAccountId} by {userPrincipal.UserDetails}.");
                

                if (userPrincipal.IsAuthorizedToAccess(targetAccountId, callingAccount.Id))
                {
                    
                    result = await _transactionLogService.GetByAccountId(targetAccountId);
                }
                else
                {

                   throw new SecurityException($"Unauthorized attempt to retrieve transaction log by {userPrincipal.UserDetails}");
                }   
                
            }            
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute GetTransactionLogList.  {exception.Message}");
            }
            return new OkObjectResult(result);
        }
    }
}
