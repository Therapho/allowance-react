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
        public int AccountId { get; set; }
    }
}
