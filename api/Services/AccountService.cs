using AllowanceFunctions.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AllowanceFunctions.Services
{
    public class AccountService : EntityService<Account>
    {
        public AccountService(DatabaseContext context) : base(context) { }

        public async Task<List<Account>> GetList(Guid userIdentifier)
        {
            var query = from account in _context.AccountSet where account.UserIdentifier == userIdentifier select account;
            var accountList = await query.ToListAsync();
            return accountList;
        }

        public async Task<List<Account>> GetListByRole(int role)
        {
            var query = from account in _context.AccountSet where account.RoleId == role select account;
            var accountList = await query.ToListAsync();
            return accountList;
        }

        public async Task<Account> GetByUser(Guid userIdentifier)
        {
            var query = from account in _context.AccountSet
                        where account.UserIdentifier == userIdentifier
                        select account;
            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<Account>> GetAllAccounts()
        {
            var query = from account in _context.AccountSet select account;
            return await query.ToListAsync();
        }
    }
}
