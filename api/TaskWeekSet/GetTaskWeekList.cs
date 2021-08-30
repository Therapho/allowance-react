﻿using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AllowanceFunctions.Common;
using Microsoft.AspNetCore.Mvc;

namespace AllowanceFunctions.Api.TaskWeekSet
{
    public class GetTaskWeekList : Function
    {
        private TaskWeekService _taskWeekService;

        public GetTaskWeekList(AccountService accountService, TaskWeekService taskWeekService)
            : base(accountService) { _taskWeekService = taskWeekService; }

        [FunctionName("GetTaskWeekList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "taskweekset")] HttpRequest request, ILogger log)
        {
            List<TaskWeek> result = null;
            try
            {
             
                var context = await CreateContext(request);

                int taskWeekId;

            
                if (request.Query.ContainsKey("taskweekid"))
                {
                    taskWeekId = request.Query.GetValue<int>("taskweekid");
                    var taskWeek = await _taskWeekService.Get(taskWeekId);
                    result = new List<TaskWeek>() { taskWeek };
                }
                else
                {
                    var dateStart = request.Query.GetValueOrDefault<DateTime>("startdate");
                    //Ensure.That<bool>(dateStart.HasValue).IsTrue();
                    dateStart = dateStart.Value.FirstDayOfWeek();


                    var dateEnd = request.Query.GetValueOrDefault<DateTime>("enddate");
                    if (!dateEnd.HasValue) dateEnd = dateStart;
                    dateEnd = dateEnd.Value.LastDayOfWeek();

                    log.LogTrace($"GetTaskWeek triggered with Date from {dateStart} to {dateEnd}");

                    if (context.UserPrincipal.IsAuthorizedToAccess(context.CallingAccount.Id, context.TargetAccount.Id))
                    {
                        result = await _taskWeekService.GetListByRange(dateStart, dateEnd);
                    }
                    else

                    {
                        result = await _taskWeekService.GetListByRange(dateStart, dateEnd, context.TargetAccount.Id);
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
