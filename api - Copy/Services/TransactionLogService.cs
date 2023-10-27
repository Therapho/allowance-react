using AllowanceFunctions.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AllowanceFunctions.Common;
using api.Entities;

namespace AllowanceFunctions.Services
{
    public class TransactionLogService : EntityService<TransactionLog>
    {
        public TransactionLogService(DatabaseContext databaseContext): base(databaseContext) { }

        public async Task<List<TransactionLogView>> GetAll(int take = 20, int skip = 0)
        {
            var query = from transactionLogView in _context.TransactionLogViewSet
                        orderby transactionLogView.Date descending
                        select transactionLogView;
            var transactionLogViewList = await query.Skip(skip).Take(take).ToListAsync();
            return transactionLogViewList;
        }
        public async Task<List<TransactionLogView>> GetByAccountId(int accountId, int take = 20, int skip =0)
        {
            var query = from transactionLogView in _context.TransactionLogViewSet
                        where transactionLogView.TargetAccountId == accountId
                        orderby transactionLogView.Date descending
                        select transactionLogView;
            var transactionLogViewList = await query.Skip(skip).Take(take).ToListAsync();
            return transactionLogViewList;
        }
        public async Task LogTransferWithdrawal(Transaction transaction, int callingAccountId)
        {
            var transactionLog = new TransactionLog()
            {
                CallingAccountId = callingAccountId,
                TargetAccountId = transaction.TargetAccountId,
                SourceFundId = transaction.SourceFundId,
                TargetFundId = transaction.TargetFundId,
                Amount = transaction.Amount,
                Date = DateTime.Now,
                CategoryId = (int)Constants.TransactionCategory.Withdraw,
                Description = $"Withdraw for transfer: {transaction.Description}"
            };
            await Create(transactionLog, false);
        }
        public async Task LogDeposit(Transaction transaction, decimal previousBalance, int callingAccountId)
        {
            var transactionLog = new TransactionLog()
            {
                TargetAccountId = transaction.TargetAccountId,
                CallingAccountId = callingAccountId,
                Amount = transaction.Amount,
                Date = DateTime.Now,
                CategoryId = transaction.CategoryId,
                Description = transaction.Description,
                TargetFundId = transaction.TargetFundId,
                PreviousAmount = previousBalance,
                NewAmount = previousBalance + transaction.Amount
            };
            await Create(transactionLog);
        }
        public async Task LogWithdrawal(Transaction transaction, decimal previousBalance, int callingAccountId)
        {
            var transactionLog = new TransactionLog()
            {
                TargetAccountId = transaction.TargetAccountId,
                CallingAccountId = callingAccountId,
                Amount = transaction.Amount,
                Date = DateTime.Now,
                CategoryId = transaction.CategoryId,
                Description = transaction.Description,
                SourceFundId = transaction.SourceFundId,
                PreviousAmount = previousBalance,
                NewAmount = previousBalance + transaction.Amount
            };
            await Create(transactionLog);
        }
    }
}
