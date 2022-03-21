using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using api.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Security;
using System.Threading;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.TaskWeekSet
{
    public class PutTaskWeek : Function
    {
        private TaskWeekService _taskWeekService;
        private TaskActivityService _taskActivityService;

        public PutTaskWeek(DatabaseContext context, AccountService accountService, TaskWeekService taskWeekService, TaskActivityService taskActivityService)
            : base(accountService) { _taskWeekService = taskWeekService;
            _taskActivityService = taskActivityService;
        }
        [FunctionName("PutTaskWeek")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "put", Route = "taskweekset/{id?}")] HttpRequest request, ILogger log, CancellationToken ct, int? id )
        {
            log.LogTrace($"PutTaskWeek function processed a request for id:{id}.");

            TaskWeek taskWeek = null;
            var context = await CreateContext(request);

            try
            {
                string requestBody = await new StreamReader(request.Body).ReadToEndAsync();
                taskWeek = JsonConvert.DeserializeObject<TaskWeek>(requestBody);
                
                

                if (context.IsAuthorizedToAccess())
                {
                    var value = await _taskActivityService.RecalculateValue(taskWeek);
                    if (value != taskWeek.Value) log.LogTrace($"Task week value out of sync.  stored: {taskWeek.Value}, actual: {value}");
                    taskWeek.Value = value;
                    await _taskWeekService.Update(taskWeek);
                }
                else
                {
                    throw new SecurityException("Invalid attempt to access a record by an invalid user");
                }
                

            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute PutTaskWeek.  {Utility.ParseError(exception)}");
            }
            return new OkObjectResult( taskWeek.Id);
        }

    }
}