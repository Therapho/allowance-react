using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
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

        public PutTaskWeek(DatabaseContext context, AccountService accountService, TaskWeekService taskWeekService)
            : base(accountService) { _taskWeekService = taskWeekService; }
        [FunctionName("PutTaskWeek")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "put", Route = "taskweekset/{id?}")] HttpRequest request, ILogger log, CancellationToken ct, int? id )
        {
            log.LogTrace($"PutTaskWeek function processed a request for id:{id}.");

            TaskWeek data = null;
            var context = await CreateContext(request);

            try
            {
                string requestBody = await new StreamReader(request.Body).ReadToEndAsync();
                data = JsonConvert.DeserializeObject<TaskWeek>(requestBody);
                
                

                if (context.IsAuthorizedToAccess())
                {
                    await _taskWeekService.Update(data);
                }
                else
                {
                    throw new SecurityException("Invalid attempt to access a record by an invalid user");
                }
                

            }
            catch (Exception exception)
            {

                return new BadRequestObjectResult($"Error trying to execute PutTaskWeek.  {exception.Message}");
            }
            return new OkObjectResult( data.Id);
        }

    }
}