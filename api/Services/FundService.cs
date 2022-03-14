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
            decimal previousBalance = 0;
            switch ((Constants.TransactionCategory)transaction.CategoryId)
            {
                case Constants.TransactionCategory.Deposit:
                    previousBalance = await Deposit(transaction, callingAccountId);
                    await _transactionLogService.LogDeposit(transaction, previousBalance, callingAccountId);
                    break;
                case Constants.TransactionCategory.Withdraw:
                    previousBalance = await Withdraw(transaction, callingAccountId);
                    await _transactionLogService.LogWithdrawal(transaction, previousBalance, callingAccountId);
                    break;
                case Constants.TransactionCategory.Transfer:
                    previousBalance = await Withdraw(transaction, callingAccountId);
                    await _transactionLogService.LogWithdrawal(transaction, previousBalance, callingAccountId);
                    previousBalance = await Deposit(transaction, callingAccountId);
                    await _transactionLogService.LogDeposit(transaction, previousBalance, callingAccountId);
                    break;
            }
        }
        private async Task<decimal> Deposit(Transaction transaction, int callingAccountId)
        {
            var targetFund = await Get(transaction.TargetFundId);
            var previousBalance = targetFund.Balance;
            targetFund.Balance += transaction.Amount;
            await Update(targetFund, false);
            return previousBalance;
        }
        private async Task<decimal> Withdraw(Transaction transaction, int callingAccountId)
        {
            var sourceFund = await Get(transaction.SourceFundId.GetValueOrDefault());
            var previousBalance = sourceFund.Balance;
            if (sourceFund.Balance < transaction.Amount)
                throw new InvalidOperationException("Insufficient funds");
            sourceFund.Balance -= transaction.Amount;
            await Update(sourceFund, false);
            return previousBalance;
        }
        private async Task<decimal> Transfer(Transaction transaction, int callingAccountId)
        {
            var sourceFund = await Get(transaction.SourceFundId.Value);
            var previousBalance = sourceFund.Balance;
            if (sourceFund == null || sourceFund.Balance < transaction.Amount)
                throw new InvalidOperationException("Insufficient funds");
            sourceFund.Balance -= transaction.Amount;
            await Update(sourceFund, false);

            var targetFund = await Get(transaction.TargetFundId);
            targetFund.Balance += transaction.Amount;
            await Update(targetFund, false);   
            return previousBalance;         
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
