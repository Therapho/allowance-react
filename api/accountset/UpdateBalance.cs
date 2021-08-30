using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;
using System.Security;
using System.Threading;
using System.Threading.Tasks;

namespace AllowanceFunctions.Api.AccountSet
{
    public class UpdateBalance : Function
    {
       
        private TransactionLogService _transactionLogService;

        public UpdateBalance( AccountService accountService,
            TransactionLogService transactionLogService):base(accountService)
        {
            _transactionLogService = transactionLogService;
        }

        [FunctionName("UpdateBalance")]
        public async Task<IActionResult> Run(
            [HttpTrigger(Constants.AUTHORIZATION_LEVEL, "post", Route = "updatebalance")] HttpRequest req, ILogger log, CancellationToken ct)
        {


            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var transaction = JsonConvert.DeserializeObject<Transaction>(requestBody);
            var userPrincipal = req.GetUserPrincipal();

            if (userPrincipal.IsInRole(Constants.PARENT_ROLE))
            {
                try
                {
                    log.LogTrace($"UpdateBalance function processed a request from userIdentifier:{userPrincipal.UserDetails}.");
                    var account = await AccountService.Get(transaction.AccountId);
                    if (transaction.CategoryId == (int)Constants.TransactionCategory.Deposit)
                        account.Balance += transaction.Amount;
                    else
                        account.Balance -= transaction.Amount;

                    await AccountService.Update(account, false);

                    var transactionLog = new TransactionLog()
                    {
                        AccountId = transaction.AccountId,
                        Amount = transaction.Amount,
                        Date = DateTime.Now,
                        CategoryId = transaction.CategoryId,
                        Description = transaction.Description,
                        UserIdentifier = account.UserIdentifier
                    };
                    await _transactionLogService.Create(transactionLog, false);

                    await _transactionLogService.SaveChanges();
                }
                catch (Exception exception)
                {

                    return new BadRequestObjectResult($"Error trying to execute UpdateBalance.  {exception.Message}");
                }
                return new OkObjectResult(true);
            }
            throw new SecurityException("Invalid attempt to access a record by an invalid user");
        }

    }
}