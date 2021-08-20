using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.Lookups
{
    internal class GetActivityStatusList : LookupFunction<ActivityStatus>
    {
        public GetActivityStatusList(DatabaseContext databaseContext) : base(databaseContext) { }

        [FunctionName("GetActivityStatusList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "lookups/activitystatusset"),] HttpRequest req, ILogger log)
        {
            return await RunInternal(log);
        }
    }
}
