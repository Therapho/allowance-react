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
        public GetOrCreateTaskActivityList(AccountService accountService) : base (accountService) {}
        private TaskWeekService _taskWeekService;
        private TaskDefinitionService _taskDefinitonService;
        private TaskActivityService _taskActivityService;

        public GetOrCreateTaskActivityList(AccountService accountService, TaskWeekService taskWeekService, 
        TaskDefinitionService taskDefinitionService,  TaskActivityService taskActivityService):base(accountService)
        {
            _taskWeekService = taskWeekService;
            _taskDefinitonService = taskDefinitionService;
            _taskActivityService = taskActivityService;
        }

        [FunctionName("GetOrCreateTaskActivityList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "getorcreatetaskactivitylist"),] HttpRequest request, ILogger log)
        {
            var context = await CreateContext(request);
            var startDate = request.Query.GetValue<DateTime>("weekstartdate").StartOfDay();

            var taskWeekId = request.Query.GetValue<int>("taskweekid");
            
            
            List<TaskActivity> taskActivityList = null;
            
            log.LogTrace($"GetTaskActivityListByDay function processed a request by userIdentifier={context.UserPrincipal.UserDetails}, startDate={startDate}.");

            try

            {
                TaskWeek taskWeek = null;

                if (taskWeekId > 0)
                {

                    taskWeek = await _taskWeekService.Get(taskWeekId);
                    if (!context.UserPrincipal.IsAuthorizedToAccess(context.CallingAccount.Id, taskWeek.AccountId))
                    {
                        
                        var targetAccount = await AccountService.Get(taskWeekId);
                        throw new SecurityException($"Unauthorized access of taskweek for  {targetAccount.Name} by {context.CallingAccount.Name}");
                    }
                }
                else
                {
                    if (!context.IsParent())
                    { taskWeek = await _taskWeekService.Get(context.CallingAccount.Id, startDate); }
                    else
                    {
                        throw new SecurityException("Invalid attempt by parent to retrieve or create a taskweek by date");
                    }


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
