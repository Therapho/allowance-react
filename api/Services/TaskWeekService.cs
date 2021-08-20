using AllowanceFunctions.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data;
using AllowanceFunctions.Common;

namespace AllowanceFunctions.Services
{
    public class TaskWeekService : EntityService<TaskWeek>
    {
        public TaskWeekService(DatabaseContext context) : base(context) { }

        public async Task<TaskWeek> Get(Guid userIdentifier, DateTime dateStart)
        {
            TaskWeek result = null;

            try
            {
                var query = from taskWeek in _context.TaskWeekSet
                            where taskWeek.WeekStartDate == dateStart && taskWeek.UserIdentifier == userIdentifier
                            select taskWeek;
                result = await query.FirstOrDefaultAsync();
            }
            catch (Exception exception)
            {
                throw new DataException(
                    $"Error trying to retrieve a taskweek with userIdentifier: {userIdentifier}, dateStart: {dateStart}.  {exception.Message}", 
                    exception);
            }
            return result;
           
        }

        public async Task<TaskWeek> Create(Guid userIdentifier, DateTime dateStart)
        {
            var taskWeek = new TaskWeek()
            {
                UserIdentifier = userIdentifier,
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
        public async Task<List<TaskWeek>> GetListByRange(DateTime? dateStart, DateTime? dateEnd, Guid userIdentifier)
        {
            var query = from taskWeek in _context.TaskWeekSet
                        where taskWeek.WeekStartDate >= dateStart && taskWeek.WeekStartDate <= dateEnd
                        && taskWeek.UserIdentifier == userIdentifier
                        select taskWeek;
            return await query.ToListAsync();
        }
    }
}
