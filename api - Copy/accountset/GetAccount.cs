using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using api.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.AccountSet
{
    public class GetAccount : Function
    {
        public GetAccount(AccountService accountService) : base(accountService) {  }

        [FunctionName("GetAccount")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "accountset"),] HttpRequest req,
            ILogger log, CancellationToken ct)
        {
            string userId;
            List<Account> accountList = null;

            try
            {
                if (req.Query.ContainsKey("userId"))
                {
                    userId = req.Query.GetValue<string>("userId");
                    log.LogTrace($"GetAccount function processed a request with userIdentifier: '{userId}'.");
                    accountList = await AccountService.GetList(userId);
                }
                else if (req.Query.ContainsKey("roleid"))
                {
                    var roleid = req.Query.GetValue<int>("roleid");
                    log.LogTrace($"GetAccount function processed a request with role: '{roleid}'.");
                    accountList = await AccountService.GetListByRole(roleid);
                }
                else
                {
                    log.LogTrace($"GetAccount function processed a request.");
                    accountList = await AccountService.GetAllAccounts();
                }
            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute GetAccount.  {Utility.ParseError(exception) }");
            }




            return new OkObjectResult(accountList);
        }


    }
}
