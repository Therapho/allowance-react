﻿using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using api.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Threading.Tasks;
using System.Web.Http;

namespace AllowanceFunctions.Api.TaskWeekSet
{
    public class GetOrCreateTaskWeek : Function
    {
        private TaskWeekService _taskWeekService;
        private TaskDefinitionService _taskDefinitonService;
        private TaskActivityService _taskActivityService;
   

        public GetOrCreateTaskWeek(
            TaskWeekService taskWeekService, TaskDefinitionService taskDefinitionService, AccountService accountService,
            TaskActivityService taskActivityService) : base(accountService)
        {
            _taskWeekService = taskWeekService;
            _taskDefinitonService = taskDefinitionService;
            _taskActivityService = taskActivityService;
        }
        [FunctionName("GetOrCreateTaskWeek")]
        public async Task<IActionResult> Run(
             [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "getorcreatetaskweek"),] HttpRequest request, ILogger log)
        {
           
            var context = await CreateContext(request);

            var startDate = request.Query.GetRequiredValue<DateTime>("weekstartdate").StartOfDay();
            
            

            log.LogTrace($"GetTaskActivityListByDay function processed a request for user={context.UserPrincipal.UserDetails}, startDate={startDate}.");

            TaskWeek taskWeek = null;

            try

            {
                if (request.Query.ContainsKey("taskWeekID"))
                {
                    var taskWeekId = request.Query.GetValue<int>("taskweekid");
                    taskWeek = await _taskWeekService.Get(taskWeekId);
                    if (!context.UserPrincipal.IsAuthorizedToAccess(context.CallingAccount.Id, taskWeek.AccountId))
                    {
                        throw new SecurityException("Invalid attempt to access a record by an invalid user");
                    }
                }
                else
                {
                    taskWeek = await _taskWeekService.Get(context.TargetAccount.Id, startDate);
                    if (taskWeek == null)
                    {

                        //if (context.UserPrincipal.IsInRole(Constants.PARENT_ROLE))
                        //{
                        //    throw new SecurityException($"Invalid attempt by {context.CallingAccount.Name} to create a new task week.");

                        //}
                        taskWeek = await _taskWeekService.Create(context.TargetAccount.Id, startDate);
                        context.TargetAccount.ActiveTaskWeekId = taskWeek.Id;
                        await AccountService.Update(context.TargetAccount);
                    }
                    else
                    {
                        if (!context.UserPrincipal.IsAuthorizedToAccess(context.CallingAccount.Id, taskWeek.AccountId))
                        {
                            throw new SecurityException("Invalid attempt to access a record by an invalid user");
                        }
                    }
                }
              

            }

            catch (Exception exception)
            {
                return new BadRequestObjectResult(Utility.ParseError(exception));
            }
            return new OkObjectResult(taskWeek);
        }
    }
}
