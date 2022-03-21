using AllowanceFunctions.Common;
using AllowanceFunctions.Services;
using api.Common;
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
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace api.FundSet
{
    public class DeleteFund : Function
    {
        private FundService _FundService;

        public DeleteFund(AccountService accountService, FundService FundService)
            : base(accountService) { _FundService = FundService; }

        [FunctionName("DeleteFund")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "delete", Route = "fundset"),] HttpRequest request, ILogger log, CancellationToken ct)
        {
            log.LogTrace($"SetTaskActivityList function processed a request.");
            var context = await CreateContext(request);
            var FundId = request.Query.GetRequiredValue<int>("fundid");

            try
            {
                var fund = await _FundService.Get(FundId);

                if (context.IsAuthorizedToAccess(fund.AccountId))
                {
                    if (fund.Balance > 0)
                        throw new InvalidOperationException($"Invalid attempt to delete Fund '{fund.Name}' with remaining balance of {fund.Balance}.");
                    
                    if(fund.Locked)
                        throw new InvalidOperationException($"Invalid attempt to delete a locked Fund '{fund.Name}.'");

                }
                else
                {
                    throw new SecurityException($"Invalid attempt to update a Fund by an invalid child {context.UserPrincipal.UserDetails}");
                }
                _FundService.Delete(fund);
            }
            catch (Exception exception)
            {
                return new BadRequestObjectResult($"Error trying to execute DeleteFund.  {Utility.ParseError(exception)}");
            }
            return new OkResult();
        }
    }
}
