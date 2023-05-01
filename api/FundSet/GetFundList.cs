using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using api.Common;
using api.Entities;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace AllowanceFunctions.Api.FundSet
{
    public class GetFundList : Function    
    {
        private FundService _FundService;

        public GetFundList(AccountService accountService, FundService FundService)
            : base(accountService) { _FundService = FundService; }

        [FunctionName("GetFundList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "fundset"),] HttpRequest req, ILogger log)
            {

            var context = await RequestContext.CreateContext(AccountService, req);

            
            log.LogTrace($"GetFundList function processed a request for accountid={context.TargetAccount.Id}. by user {context.UserDetails}");
            
            List<Fund> result = null;
            try
            {
                result = await _FundService.GetList(context.TargetAccount.Id);
            }
            catch (Exception exception)
            {
               
                return new BadRequestObjectResult($"Error trying to execute GetFundList with account:{context.TargetAccount.Id} and user:{context.UserDetails}.  {Utility.ParseError(exception)}");
            }
            
            return new OkObjectResult( result);
        }
    }
}
