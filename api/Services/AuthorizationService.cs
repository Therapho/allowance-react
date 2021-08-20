using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace AllowanceFunctions.Services
{
    public class AuthorizationService
    {
        private AccountService _accountService;
        private MemoryCache _cache;

        public AuthorizationService(AccountService accountService, MemoryCache cache)
        {
            _accountService = accountService;
            _cache = cache;
        }
        public async Task<Account> GetAccount(Guid userIdentifier)
        {
            Account account = _cache.Get<Account>(userIdentifier);
            if (account == null)
            {
                account = await _accountService.GetByUser(userIdentifier);
                _cache.Set(userIdentifier, account);
            }
            return account;
        }
        public async Task<bool>  IsInRole(Guid userIdentifier, Constants.Role role)
        {
            var result = false;

            var account = await GetAccount(userIdentifier);
            result = account.RoleId == (int)role;
            return result;
        }

    }
}
