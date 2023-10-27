﻿using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using api.Common;
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

        public PutAccount(AccountService accountService) : base(accountService) { }

        [FunctionName("PutAccount")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "put", Route = "accountset/{id?}")] HttpRequest req, ILogger log, CancellationToken ct, int? id)
        {
            log.LogTrace($"PutAccount function processed a request for id:{id}.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<Account>(requestBody);
            var userPrincipal = req.GetUserPrincipal();

            try
            {
                if (userPrincipal.IsInRole(Constants.PARENT_ROLE))
                {

                    await AccountService.Update(data);
                }
                else
                {
                    throw new SecurityException("Invalid attempt to access a record by an invalid user");
                }
            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute PutAccount.  {Utility.ParseError(exception)}");
            }
            return new OkObjectResult(data.Id);
        }
    }

}
