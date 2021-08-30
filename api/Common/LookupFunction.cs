using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace AllowanceFunctions.Common
{
    internal abstract class LookupFunction<TEntity>  where TEntity : Lookup
    {
        private DatabaseContext _databaseContext;

        public LookupFunction(DatabaseContext databaseContext) { _databaseContext = databaseContext; }

        public async Task<List<TEntity>> GetList()
        {
            var query = from entity in _databaseContext.Set<TEntity>()
                        select entity;
            return await query.ToListAsync();
        }

        // [FunctionName("GetList")]
        protected async Task< IActionResult> RunInternal(ILogger log)
        {
            log.LogTrace("GetRoleList function processed a request.");
            List<TEntity> result = null;
            try
            {
                result = await GetList();
            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute Get{typeof(TEntity).Name }.  {exception.Message}");
            }


            return new OkObjectResult(result);
        }

    }
}
