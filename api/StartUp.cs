using AllowanceFunctions.Services;
using api.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using System;

[assembly: FunctionsStartup(typeof(AllowanceFunctions.StartUp))]
namespace AllowanceFunctions
{
    public class StartUp : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var services = builder.Services;

            // application insights
            string aiConnectionString = Environment.GetEnvironmentVariable("APPINSIGHTS_CONNECTIONSTRING");
            //services.AddApplicationInsightsTelemetry(aiConnectionString);

            // sql connection
            string sqlConnectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
            if (string.IsNullOrEmpty(sqlConnectionString)) throw new NullReferenceException("ConnectionString not found");
            services.AddDbContext<DatabaseContext>(
                options => SqlServerDbContextOptionsExtensions.UseSqlServer(options, sqlConnectionString));

            // services
            var cache = new MemoryCache(new MemoryCacheOptions());
            services
                .AddTransient<TaskWeekService>()
                .AddTransient<TaskDefinitionService>()
                .AddTransient<TaskActivityService>()
                .AddTransient<AccountService>()
                .AddTransient<TransactionLogService>()
                .AddTransient<FundService>()
                .AddSingleton(cache);

        }
    }
}
    