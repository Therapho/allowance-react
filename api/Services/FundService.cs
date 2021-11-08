using AllowanceFunctions.Services;
using api.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Data;
using Microsoft.EntityFrameworkCore;
using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;

namespace api.Services
{
    public class FundService : EntityService<Fund>
    {
        private TransactionLogService _transactionLogService;

        public FundService(DatabaseContext context, TransactionLogService transactionLogService) : base(context)
        {
            _transactionLogService = transactionLogService;
        }
        public async Task<List<Fund>> GetList(int accountId)
        {


            List<Fund> result = null;
            try
            {
                var query = from Fund in _context.FundSet
                            where Fund.AccountId == accountId 
                            orderby Fund.TargetDate ascending
                            select Fund;
                result = await query.ToListAsync();
            }
            catch (Exception exception)
            {
                throw new DataException(
                    $"Error trying to retrieve a list of Funds with accountId: {accountId},  {exception.Message}",
                    exception);
            }
            return result;
        }
        public async Task<List<Fund>> GetActiveList(int accountId)
        {


            List<Fund> result = null;
            try
            {
                var query = from Fund in _context.FundSet
                            where Fund.AccountId == accountId && (!Fund.TargetBalance.HasValue || Fund.Balance < Fund.TargetBalance)
                            orderby Fund.TargetDate ascending
                            select Fund;
                result = await query.ToListAsync();
            }
            catch (Exception exception)
            {
                throw new DataException(
                    $"Error trying to retrieve a list of Funds with accountId: {accountId},  {exception.Message}",
                    exception);
            }
            return result;
        }
        public async Task ProcessTransaction(Transaction transaction, int callingAccountId)
        {
            
            switch ((Constants.TransactionCategory)transaction.CategoryId)
            {
                case Constants.TransactionCategory.Deposit:
                    await Deposit(transaction, callingAccountId);                   
                    break;
                case Constants.TransactionCategory.Withdraw:
                    await Withdraw(transaction, callingAccountId);
                    break;
                case Constants.TransactionCategory.Transfer:
                    await Transfer(transaction, callingAccountId);
                    await _transactionLogService.LogTransferWithdrawal(transaction, callingAccountId);
                    break;
            }
            await _transactionLogService.LogTransaction(transaction, callingAccountId);
        }
        private async Task Deposit(Transaction transaction, int callingAccountId)
        {
            var targetFund = await Get(transaction.TargetFundId);
            targetFund.Balance += transaction.Amount;
            await Update(targetFund, false);
        }
        private async Task Withdraw(Transaction transaction, int callingAccountId)
        {
            var targetFund = await Get(transaction.TargetFundId);
            if (targetFund.Balance < transaction.Amount)
                throw new InvalidOperationException("Insufficient funds");
            targetFund.Balance -= transaction.Amount;
            await Update(targetFund, false);
        }
        private async Task Transfer(Transaction transaction, int callingAccountId)
        {
            var sourceFund = await Get(transaction.SourceFundId.Value);
            if (sourceFund == null || sourceFund.Balance < transaction.Amount)
                throw new InvalidOperationException("Insufficient funds");
            sourceFund.Balance -= transaction.Amount;
            await Update(sourceFund, false);

            var targetFund = await Get(transaction.TargetFundId);
            targetFund.Balance += transaction.Amount;
            await Update(targetFund, false);            
        }
        internal void CheckAllocationTotal(List<Fund> fundList)
        {
            var allocationTotal = 0;
            foreach (var fund in fundList)
            {
                allocationTotal += fund.Allocation.GetValueOrDefault();
            }
            if (allocationTotal != 100)
                throw new InvalidOperationException("Allocation total for all funds is not 100%");

        }

    }
}
