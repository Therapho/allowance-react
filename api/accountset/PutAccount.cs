using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
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
    public class PutAccount : Function
    {
        private AccountService _accountService;

        public PutAccount(AuthorizationService authorizationService, AccountService accountService) 
            : base(authorizationService) { _accountService = accountService; }

        [FunctionName("PutAccount")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "put", Route = "accountset/{id?}")] HttpRequest req, ILogger log, CancellationToken ct, int? id)
        {
            log.LogTrace($"PutAccount function processed a request for id:{id}.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<Account>(requestBody);

            //if (id.HasValue) Ensure.That(data.Id = id.Value);
            var userIdentifier = GetCallingUserIdentifier(req);
            if(! await IsParent(req))
            {
                throw new SecurityException("Invalid attempt to access a record by an invalid user");
            }

            try
            {
                await _accountService.Update(data);
            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute PutAccount.  {exception.Message}");
            }
            return new OkObjectResult( data.Id.Value);
        }

    }
}