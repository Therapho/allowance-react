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
    public class PutFund : Function
    {
        private FundService _fundService;

        public PutFund(AccountService accountService, FundService FundService)
            : base(accountService) { _fundService = FundService; }

        [FunctionName("PutFund")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "put", Route = "fundset"),] HttpRequest request, ILogger log, CancellationToken ct)
        {
            log.LogTrace($"SetTaskActivityList function processed a request.");
            var context = await CreateContext(request);
            Fund newFund = null;
            try
            {
                string requestBody = await new StreamReader(request.Body).ReadToEndAsync();
                newFund = JsonConvert.DeserializeObject<Fund>(requestBody);
                var oldFund = await _fundService.Get(newFund.Id);

                // can't change amount or allocation with this function.
                // amount is updated through deposits and transfers only.
                // allocation is updated simultaneously on all funds to ensure they total 100%
                newFund.Balance = oldFund.Balance;
                newFund.Allocation = oldFund.Allocation;

                if (newFund.Locked != oldFund.Locked && !context.IsParent())
                    throw new SecurityException($"Attempt to lock a Fund by a child {context.UserPrincipal.UserDetails}");

                if (context.IsAuthorizedToAccess(newFund.AccountId))
                {
                    _fundService.Replace(oldFund, newFund);
                    await _fundService.SaveChanges();

                }
                else
                {
                    throw new SecurityException($"Invalid attempt to update a Fund by an invalid child {context.UserPrincipal.UserDetails}");
                }
            }
            catch (Exception exception)
            {
                return new BadRequestObjectResult($"Error trying to execute PutFund.  {Utility.ParseError(exception)}");
            }
            return new OkObjectResult(newFund.Id);
        }
    }
}
