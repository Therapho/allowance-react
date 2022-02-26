using AllowanceFunctions.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AllowanceFunctions.Entities
{
    [Table("TransactionLog")]
    public class TransactionLog: Entity
    {

        public DateTime Date { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public int? CallingAccountId { get; set; }
        public int TargetAccountId { get; set; }
        public int? SourceFundId { get; set; }
        public int? TargetFundId { get; set; }
        public decimal PreviousAmount {get;set;}
    }

    
}
