using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using System.Security;
using System.Threading.Tasks;

namespace AllowanceFunctions.Common
{
    public abstract class Function
    {
        private AccountService _accountService;

        public Function(AccountService accountService) { _accountService = accountService; }

        public AccountService AccountService { get => _accountService; }

        public async Task<RequestContext> CreateContext(HttpRequest request)
        {
            return await RequestContext.CreateContext(AccountService, request);
        }

    }
}
