using AllowanceFunctions.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace AllowanceFunctions.Services
{
    public class TransactionLogService : EntityService<TransactionLog>
    {
        public TransactionLogService(DatabaseContext databaseContext): base(databaseContext) { }

        public async Task<List<TransactionLog>> GetAll(int take = 20, int skip = 0)
        {
            var query = from transactionLog in _context.TransactionLogSet
                        orderby transactionLog.Date descending
                        select transactionLog;
            var transactionLogList = await query.Skip(skip).Take(take).ToListAsync();
            return transactionLogList;
        }
        public async Task<List<TransactionLog>> GetByAccountId(int accountId, int take = 20, int skip =0)
        {
            var query = from transactionLog in _context.TransactionLogSet
                        where transactionLog.AccountId == accountId
                        orderby transactionLog.Date descending
                        select transactionLog;
            var transactionLogList = await query.Skip(skip).Take(take).ToListAsync();
            return transactionLogList;
        }
    }
}
