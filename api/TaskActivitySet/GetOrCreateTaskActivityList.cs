using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;


namespace AllowanceFunctions.Api.TaskActivitySet
{
    public class GetOrCreateTaskActivityList :Function
    {
        private TaskWeekService _taskWeekService;
        private TaskDefinitionService _taskDefinitonService;
        private TaskActivityService _taskActivityService;

        public GetOrCreateTaskActivityList(AuthorizationService authorizationService, 
            TaskWeekService taskWeekService, TaskDefinitionService taskDefinitionService,  TaskActivityService taskActivityService):base(authorizationService)
        {
            _taskWeekService = taskWeekService;
            _taskDefinitonService = taskDefinitionService;
            _taskActivityService = taskActivityService;
        }

        [FunctionName("GetOrCreateTaskActivityList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "getorcreatetaskactivitylist"),] HttpRequest req, ILogger log)
        {
            var startDate = req.Query.GetValue<DateTime>("weekstartdate").StartOfDay();

            var taskWeekId = req.Query.GetValue<int>("taskweekid");

            
            var callingUserIdentifier = req.GetUserIdentifier();
            
            log.LogTrace($"GetTaskActivityListByDay function processed a request by userIdentifier={callingUserIdentifier}, startDate={startDate}.");

            List<TaskActivity> taskActivityList = null;

            try

            {
                TaskWeek taskWeek = null;

                if (taskWeekId > 0)
                {
                    taskWeek = await _taskWeekService.Get(taskWeekId);
                    if (taskWeek.UserIdentifier != callingUserIdentifier &&
                    !await _authorizationService.IsInRole(callingUserIdentifier, Constants.Role.Parent))
                    {
                        var targetAccount = await _authorizationService.GetAccount(taskWeek.UserIdentifier);
                        var callingAccount = await _authorizationService.GetAccount(callingUserIdentifier);
                        throw new SecurityException($"Unauthorized access of taskweek for  {targetAccount.Name} by {callingAccount.Name}");
                    }
                }
                else
                {
                    if (await _authorizationService.IsInRole(callingUserIdentifier, Constants.Role.Parent))
                    {
                        throw new SecurityException("Invalid attempt by parent to retrieve or create a taskweek by date");
                    }
                    taskWeek = await _taskWeekService.Get(callingUserIdentifier, startDate);

                }
                    

                taskActivityList = await _taskActivityService.GetOrCreate(taskWeek);
            }
            catch (Exception exception)
            {
                return new BadRequestObjectResult(new BadRequestErrorMessageResult(exception.Message));
            }
            return new OkObjectResult(taskActivityList);
        }




    }
}
