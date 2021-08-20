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
    public class TaskActivityService : EntityService<TaskActivity>
    {
        private TaskDefinitionService _taskDefinitonService;

        public TaskActivityService(DatabaseContext context, 
            TaskDefinitionService  taskDefinitonService) : base(context)
        {
            _taskDefinitonService = taskDefinitonService;
        }

        public async Task<List<TaskActivity>> GetList(Guid userIdentifier, int taskWeekId)
        {
          

            List<TaskActivity> result = null;
            try
            {
                var query = from TaskActivity in _context.TaskActivitySet
                            where TaskActivity.UserIdentifier == userIdentifier && TaskActivity.TaskWeekId == taskWeekId
                            orderby TaskActivity.Sequence
                            select TaskActivity;
                result = await query.ToListAsync();
            }
            catch (Exception exception)
            {
                throw new DataException(
                    $"Error trying to retrieve a list of TaskActivitys with userIdentifier: {userIdentifier}, taskWeekId: {taskWeekId}.  {exception.Message}", 
                    exception);
            }
            return result;
        }

        public async Task<List<TaskActivity>> CreateList(TaskWeek taskWeek, List<TaskDefinition> taskDefinitionList)
        {

            var taskActivityList = new List<TaskActivity>();

            foreach (var taskDefinition in taskDefinitionList)
            {
                var taskActivity = new TaskActivity()
                {
                    UserIdentifier = taskWeek.UserIdentifier,
                    TaskWeekId = taskWeek.Id.Value,
                    TaskGroupId = taskDefinition.TaskGroupId,
                    Sequence = taskDefinition.Sequence,
                    MondayStatusId = (int)Constants.ActivityStatus.Incomplete,
                    TuesdayStatusId = (int)Constants.ActivityStatus.Incomplete,
                    WednesdayStatusId = (int)Constants.ActivityStatus.Incomplete,
                    ThursdayStatusId = (int)Constants.ActivityStatus.Incomplete,
                    FridayStatusId = (int)Constants.ActivityStatus.Incomplete,
                    SaturdayStatusId = (int)Constants.ActivityStatus.Incomplete,
                    SundayStatusId = (int)Constants.ActivityStatus.Incomplete,
                    TaskDefinitionId = taskDefinition.Id.Value

                };
                taskActivityList.Add(taskActivity);
            }
            await CreateList(taskActivityList);

            return taskActivityList;
        }

        public async Task<List<TaskActivity>> GetOrCreate(TaskWeek taskWeek)
        {
            var taskActivityList = await GetList(taskWeek.UserIdentifier, taskWeek.Id.Value);

            if (taskActivityList == null) taskActivityList = new List<TaskActivity>();

            if (taskActivityList.Count() == 0)
            {

                var taskDefinitionList = await _taskDefinitonService.GetList();
                taskActivityList = await CreateList(taskWeek, taskDefinitionList);
            }

            return taskActivityList;
        }
    }
}
