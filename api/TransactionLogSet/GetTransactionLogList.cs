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

        public GetTransactionLogList(AuthorizationService authorizationService, 
            TransactionLogService transactionLogService)
            : base(authorizationService) { _transactionLogService = transactionLogService; }

        [FunctionName("GetTransactionLogList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "transactionlogset")] HttpRequest req, ILogger log)
        {
            List<TransactionLog> result = null;
            try
            {
                var userIdentifier = await GetTargetUserIdentifier(req);
                int accountId = req.Query.GetValue<int>("accountid");

                log.LogTrace($"GetTransactionLogList triggered for accountId:{accountId} by {userIdentifier}.");
                var callingAccount = await _authorizationService.GetAccount(userIdentifier);

                if (callingAccount.Id.Value != accountId && !await IsParent(req))
                {

                    throw new SecurityException($"Unauthorized attempt to retrieve transaction log by {callingAccount.Name}");
                }
                else

                {
                    result = await _transactionLogService.GetByAccountId(accountId);
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
