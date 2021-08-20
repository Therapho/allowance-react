using System;
using System.Configuration;
using AllowanceFunctions.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Http;
using Microsoft.Extensions.Logging;


[assembly: FunctionsStartup(typeof(AllowanceFunctions.StartUp))]
namespace AllowanceFunctions
{
    public class StartUp : FunctionsStartup
    {


        

        public override void Configure(IFunctionsHostBuilder builder)
        {
            string aiConnectionString = Environment.GetEnvironmentVariable("APPINSIGHTS_CONNECTIONSTRING");
            builder.Services.AddApplicationInsightsTelemetry(aiConnectionString);
            string sqlConnectionString = Environment.GetEnvironmentVariable("SQLConnectionString");

            if (string.IsNullOrEmpty(sqlConnectionString)) throw new NullReferenceException("ConnectionString not found");

            var cache = new MemoryCache(new MemoryCacheOptions());

            builder.Services.AddDbContext<DatabaseContext>(
                options => SqlServerDbContextOptionsExtensions.UseSqlServer(options, sqlConnectionString));
            builder.Services
                .AddTransient<TaskWeekService>()
                .AddTransient<TaskDefinitionService>()
                .AddTransient<TaskActivityService>()
                .AddTransient<AccountService>()
                .AddTransient<AuthorizationService>()
                .AddTransient<TransactionLogService>()
                .AddSingleton(cache);
        }
    }
}
