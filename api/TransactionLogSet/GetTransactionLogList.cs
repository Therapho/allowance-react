using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using api.Common;
using api.Entities;
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
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "transactionlogset")] HttpRequest request, ILogger log)
        {
            List<TransactionLogView> result = null;
            try
            {
                var context = await CreateContext(request);
                var targetAccountId = 0;


                if (request.Query.HasValue("accountid"))
                {
                    targetAccountId = request.Query.GetValue<int>("accountid");
                    if (!context.UserPrincipal.IsAuthorizedToAccess(targetAccountId, context.CallingAccount.Id))
                        throw new SecurityException($"Unauthorized attempt to retrieve transaction log by {context.UserPrincipal.UserDetails}");

                }
                else if (!context.IsParent())
                    targetAccountId = context.CallingAccount.Id;

                log.LogTrace($"GetTransactionLogList triggered for accountId:{targetAccountId} by {context.UserPrincipal.UserDetails}.");

                if (targetAccountId > 0)
                    result = await _transactionLogService.GetByAccountId(targetAccountId);
                else
                    result = await _transactionLogService.GetAll();
                    
            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute GetTransactionLogList.  {Utility.ParseError(exception)}");
            }
            return new OkObjectResult(result);
        }
    }
}
