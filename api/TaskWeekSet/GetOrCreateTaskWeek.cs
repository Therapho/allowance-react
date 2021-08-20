using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
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
        private AccountService _accountService;

        public GetOrCreateTaskWeek(AuthorizationService authorizationService, 
            TaskWeekService taskWeekService, TaskDefinitionService taskDefinitionService, AccountService accountService,
            TaskActivityService taskActivityService) : base(authorizationService)
        {
            _taskWeekService = taskWeekService;
            _taskDefinitonService = taskDefinitionService;
            _taskActivityService = taskActivityService;
            _accountService = accountService;
        }
        [FunctionName("GetOrCreateTaskWeek")]
        public async Task<IActionResult> Run(
             [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "getorcreatetaskweek"),] HttpRequest req, ILogger log)
        {

            var userIdentifier = req.GetUserIdentifier();
            var startDate = req.Query.GetValue<DateTime>("startdate").StartOfDay();
            log.LogTrace($"GetTaskActivityListByDay function processed a request for userIdentifier={userIdentifier}, startDate={startDate}.");

            TaskWeek taskWeek = null;

            try

            {
                //Ensure.That(req.Query.ContainsKey("startdate")).IsTrue();
                
                taskWeek = await _taskWeekService.Get(userIdentifier, startDate);
                if(taskWeek == null)
                {
                    var callingAccount = await _authorizationService.GetAccount(userIdentifier);
                    if(await IsParent(req))
                    {
                        throw new SecurityException($"Invalid attempt by {callingAccount.Name} to create a new task week.");

                    }
                    taskWeek = await _taskWeekService.Create(userIdentifier, startDate);
                    var account = await _accountService.GetByUser(userIdentifier);
                    account.ActiveTaskWeekId = taskWeek.Id;
                    await _accountService.Update(account);
                }

                if (taskWeek.UserIdentifier != userIdentifier && ! await IsInRole(userIdentifier, Constants.Role.Parent))
                {
                    throw new SecurityException("Invalid attempt to access a record by an invalid user");
                }

            }

            catch (Exception exception)
            {
                return new BadRequestObjectResult(new BadRequestErrorMessageResult(exception.Message));
            }
            return new OkObjectResult(taskWeek);
        }
    }
}
