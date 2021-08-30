using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AllowanceFunctions.Api.TaskDefinitionSet
{
   
    public class GetTaskDefinitionList : Function
    {
        private TaskDefinitionService _taskDefinitionService;

        public GetTaskDefinitionList(AccountService accountService, TaskDefinitionService taskDefinitionService) : 
            base(accountService) { _taskDefinitionService = taskDefinitionService; }

        [FunctionName("GetTaskDefinitionList")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "get", Route = "taskdefinitionset"), ] HttpRequest req, ILogger log)
        {
            log.LogTrace("GetTaskList function processed a request.");
           
            List<TaskDefinition> result = null;
            try
            {
                result = await _taskDefinitionService.GetList();

               
            }
            catch (Exception exception)
            {
               
                return new BadRequestObjectResult($"Error trying to execute GetTaskDefinitionList.  {exception.Message}");
            }
            
            return new OkObjectResult(result);
        }
    }
}
