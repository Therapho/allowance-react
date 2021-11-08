using AllowanceFunctions.Common;
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
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace api.FundSet
{
    public class SetFundAllocation : Function
    {
        private FundService _fundService;

        public SetFundAllocation(AccountService accountService, FundService fundService)
            : base(accountService) { _fundService = fundService; }

        [FunctionName("SetFundAllocation")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "put", Route = "fundset/setallocation"),] HttpRequest request, ILogger log, CancellationToken ct)
        {
            log.LogTrace($"PostFundList function processed a request.");
            var context = await CreateContext(request);
            List<Fund> fundList = null;
            try
            {
                string requestBody = await new StreamReader(request.Body).ReadToEndAsync();
                fundList = JsonConvert.DeserializeObject<List<Fund>>(requestBody);
                _fundService.CheckAllocationTotal(fundList);
                foreach (var fund in fundList)
                {


                    if (!context.IsAuthorizedToAccess(fund.AccountId))                  
                        throw new SecurityException($"Invalid attempt to create a Fund by an invalid child {context.UserPrincipal.UserDetails}");
                    
                }
                await _fundService.UpdateList(fundList);

            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute PostFund.  {exception.Message}");
            }
            return new OkResult();
        }
    }
}
