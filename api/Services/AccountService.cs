using AllowanceFunctions.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AllowanceFunctions.Services
{
    public class AccountService : EntityService<Account>
    {
        private MemoryCache _cache;

        public AccountService(DatabaseContext context, MemoryCache cache) : base(context) { 
            _cache = cache;
        }

        public async Task<List<Account>> GetList(string userId)
        {
            var query = from account in _context.AccountSet where account.UserId == userId select account;
            var accountList = await query.ToListAsync();
            return accountList;
        }

        public async Task<List<Account>> GetListByRole(int role)
        {
            var query = from account in _context.AccountSet where account.RoleId == role select account;
            var accountList = await query.ToListAsync();
            return accountList;
        }
        public override async Task<Account> Get(int id){
            var cacheKey = $"Account_{id}";
            Account result = _cache.Get<Account>(cacheKey);
            if (result == null)
            {
                result = await base.Get(id);
                _cache.Set(cacheKey, result);
            }
            return result;
        }
        public async Task<Account> GetByUser(string userId)
        {
            Account result = _cache.Get<Account>(userId);
            if (result == null)
            {
                var query = from account in _context.AccountSet
                        where account.UserId == userId
                        select account;
                result = await query.FirstOrDefaultAsync();
                _cache.Set(userId, result);
            }
            return result;
           
        }

        public async Task<List<Account>> GetAllAccounts()
        {
            var query = from account in _context.AccountSet select account;
            return await query.ToListAsync();
        }
    }
}
