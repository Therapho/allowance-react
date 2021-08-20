using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AllowanceFunctions.Common;
using Microsoft.AspNetCore.Mvc;

namespace AllowanceFunctions.Api.TaskWeekSet
{
    public class GetTaskWeekList : Function
    {
        private TaskWeekService _taskWeekService;

        public GetTaskWeekList(AuthorizationService authorizationService, TaskWeekService taskWeekService)
            : base(authorizationService) { _taskWeekService = taskWeekService; }

        [FunctionName("GetTaskWeekList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "taskweekset")] HttpRequest req, ILogger log)
        {
            List<TaskWeek> result = null;
            try
            {
                var userIdentifier = await GetTargetUserIdentifier(req);
                int taskWeekId;

                if (req.Query.ContainsKey("taskweekid"))
                {
                    taskWeekId = req.Query.GetValue<int>("taskweekid");
                    var taskWeek = await _taskWeekService.Get(taskWeekId);
                    result = new List<TaskWeek>() { taskWeek };
                }
                else
                {
                    var dateStart = req.Query.GetValueOrDefault<DateTime>("startdate");
                    //Ensure.That<bool>(dateStart.HasValue).IsTrue();
                    dateStart = dateStart.Value.FirstDayOfWeek();


                    var dateEnd = req.Query.GetValueOrDefault<DateTime>("enddate");
                    if (!dateEnd.HasValue) dateEnd = dateStart;
                    dateEnd = dateEnd.Value.LastDayOfWeek();

                    log.LogTrace($"GetTaskWeek triggered with Date from {dateStart} to {dateEnd}");

                    if (userIdentifier == GetCallingUserIdentifier(req) && await IsParent(req))
                    {
                        result = await _taskWeekService.GetListByRange(dateStart, dateEnd);
                    }
                    else

                    {
                        result = await _taskWeekService.GetListByRange(dateStart, dateEnd, userIdentifier);
                    }
                }
                
            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute GetTaskWeekList.  {exception.Message}");
            }
            return new OkObjectResult(result);
        }
    }
}
