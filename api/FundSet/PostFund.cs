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
using System.IO;
using System.Security;
using System.Threading;
using System.Threading.Tasks;

namespace api.FundSet
{
    public class PostFund : Function
    {
        private FundService _FundService;

        public PostFund(AccountService accountService, FundService FundService)
            : base(accountService) { _FundService = FundService; }

        [FunctionName("PostFund")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "post", Route = "fundset"),] HttpRequest request, ILogger log, CancellationToken ct)
        {
            log.LogTrace($"SetTaskActivityList function processed a request.");
            var context = await CreateContext(request);
            Fund fund = null;
            try
            {
                string requestBody = await new StreamReader(request.Body).ReadToEndAsync();
                fund = JsonConvert.DeserializeObject<Fund>(requestBody);

                // fund allocation must be updated simultaneously for all funds to ensure they total 100%
                fund.Allocation = null;

                if (context.IsAuthorizedToAccess(fund.AccountId))
                {
                    await _FundService.Create(fund);
                }
                else
                {
                    throw new SecurityException($"Invalid attempt to create a Fund by an invalid child {context.UserPrincipal.UserDetails}");
                }
            }
            catch (Exception exception)
            {
                return new BadRequestObjectResult($"Error trying to execute PostFund.  {Utility.ParseError(exception)}");
            }
            return new OkObjectResult(fund.Id);
        }
    }
}
