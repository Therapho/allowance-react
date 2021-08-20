using System;
using System.Configuration;
using AllowanceFunctions.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
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
            //builder.Services.AddHttpClient();
            string connectionString = Environment.GetEnvironmentVariable("ConnectionStrings:SQLConnectionString");
            //string connectionString = System.Environment.GetEnvironmentVariable($"ConnectionStrings:SQLConnectionString", EnvironmentVariableTarget.Process);
            if (string.IsNullOrEmpty(connectionString)) throw new NullReferenceException("ConnectionString not found");
            //var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
            //optionsBuilder.UseSqlServer(connectionString);
            //var options = optionsBuilder.Options;
            //var context = new DatabaseContext(options);

            //builder.Services.AddSingleton((s) => {
            //    return context;
            //});
            var cache = new MemoryCache(new MemoryCacheOptions());

            builder.Services.AddDbContext<DatabaseContext>(
                options => SqlServerDbContextOptionsExtensions.UseSqlServer(options, connectionString));
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
