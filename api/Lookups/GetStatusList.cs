using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.Lookups
{
    internal class GetStatusList : LookupFunction<Status>
    {
        public GetStatusList(DatabaseContext databaseContext) : base(databaseContext) { }

        [FunctionName("GetStatusList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "lookups/statusset"),] HttpRequest req, ILogger log)
        {
            return await RunInternal(log);
        }
    }
}
