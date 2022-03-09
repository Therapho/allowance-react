using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace AllowanceFunctions.Services
{
    public class TaskWeekService : EntityService<TaskWeek>
    {
        private TaskActivityService _taskActivityService;
        private TaskDefinitionService _taskDefinitionService;

        public TaskWeekService(DatabaseContext context) : base(context) { }

        public async Task<TaskWeek> Get(int accountId, DateTime dateStart)
        {
            TaskWeek result = null;

            try
            {
                var query = from taskWeek in _context.TaskWeekSet
                            where taskWeek.WeekStartDate == dateStart && taskWeek.AccountId == accountId
                            select taskWeek;
                result = await query.FirstOrDefaultAsync();
            }
            catch (Exception exception)
            {
                throw new DataException(
                    $"Error trying to retrieve a taskweek with accountId: {accountId}, dateStart: {dateStart}.  {exception.Message}", 
                    exception);
            }
            return result;
           
        }

        public async Task<TaskWeek> Create(int accountId, DateTime dateStart)
        {
            var taskWeek = new TaskWeek()
            {
                AccountId = accountId,
                WeekStartDate = dateStart,
                StatusId = (int)Constants.Status.Open
            };
            await Create(taskWeek);

            return taskWeek;
        }
        public async Task<List<TaskWeek>> GetListByRange(DateTime? dateStart, DateTime? dateEnd)
        {
            var query = from taskWeek in _context.TaskWeekSet
                        where taskWeek.WeekStartDate >= dateStart && taskWeek.WeekStartDate <= dateEnd
                        orderby taskWeek.WeekStartDate descending
                        select taskWeek;
            return await query.Take(10).ToListAsync();
        }

    

        public async Task<List<TaskWeek>> GetListByRange(DateTime? dateStart, DateTime? dateEnd, int accountId)
        {
            var query = from taskWeek in _context.TaskWeekSet
                        where taskWeek.WeekStartDate >= dateStart && taskWeek.WeekStartDate <= dateEnd
                        && taskWeek.AccountId == accountId
                        orderby taskWeek.WeekStartDate descending
                        select taskWeek;
            return await query.ToListAsync();
        }
    }
}
