using AllowanceFunctions.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore
;
using System.Data;

namespace AllowanceFunctions.Services
{
    public class TaskDefinitionService : EntityService<TaskDefinition>
    {
        public TaskDefinitionService(DatabaseContext context) : base(context) { }

        public async Task<List<TaskDefinition>> GetList()
        {
            var query = from taskDefinition in _context.TaskDefinitionSet
                        where taskDefinition.Active == true
                        orderby taskDefinition.Sequence
                        select taskDefinition;

            List<TaskDefinition> result = null;
            try
            {
                result = await query.ToListAsync();
            }
            catch (Exception exception)
            {
                throw new DataException($"Error trying to retrieve a list of TaskDefinitions.", exception);
            }
            return result;
        }
    }
}
