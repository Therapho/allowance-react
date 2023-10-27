using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.Lookups
{
    internal class GetRoleList : LookupFunction<Role>
    {

        public GetRoleList(DatabaseContext databaseContext) : base(databaseContext) { }

        [FunctionName("GetRoleList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", "options", Route = "lookups/roleset"), ] HttpRequest req, ILogger log)
        {
            return await RunInternal(log);
        }
    }
}
