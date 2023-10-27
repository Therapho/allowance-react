using System;
using System.Collections.Generic;
using System.Text;

namespace AllowanceFunctions.Entities
{


   public class Transaction
    {

        public string Description { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public int? SourceFundId { get; set; }
        public int TargetFundId { get; set; }
        public int TargetAccountId { get; set; }

        public Transaction() { }
        public Transaction(string description, int categoryId, decimal amount, int targetFundId, int targetAccountId,  int? sourceFundId = null)
        {
            Description = description;
            CategoryId = categoryId;
            Amount = amount;
            TargetFundId = targetFundId;
            SourceFundId = sourceFundId;
            TargetAccountId = targetAccountId;
        }
    }
    
}
