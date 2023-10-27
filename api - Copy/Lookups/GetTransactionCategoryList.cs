using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.Lookups
{
    internal class GetTransactionCategoryList : LookupFunction<TransactionCategory>
    {
        public GetTransactionCategoryList(DatabaseContext databaseContext) : base(databaseContext) { }

        [FunctionName("GetTransactionCategoryList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "lookups/transactioncategoryset"),] HttpRequest req, ILogger log)
        {
            return await RunInternal(log);
        }
    }
}
