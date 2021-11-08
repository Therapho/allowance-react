using AllowanceFunctions.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace api.Entities
{
    [Table("funds")]
    public class Fund :Entity
    {
        public int AccountId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? TargetDate { get; set; }
        public int? Allocation { get; set; }
        public decimal? TargetBalance { get; set; }
        public decimal Balance { get; set; }
        public bool Locked { get; set; }

    }
}
