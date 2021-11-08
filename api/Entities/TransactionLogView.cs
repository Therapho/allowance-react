using AllowanceFunctions.Common;
using AllowanceFunctions.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace api.Entities
{
    [Table("TransactionLogView")]
    public class TransactionLogView : Entity
    {
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public int? CallingAccountId { get; set; }
        public int TargetAccountId { get; set; }
        public int? SourceFundId { get; set; }
        public int? TargetFundId { get; set; }
        public string TargetFundName { get; set; }
        public string SourceFundName { get; set; }
        public string CallingAccountName { get; set; }
        public string TargetAccountName { get; set; }
    }

}