using AllowanceFunctions.Common;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AllowanceFunctions.Entities
{
    [Table("accounts")]
    public class Account  : Entity
    {
        
        public int RoleId { get; set; }
        public decimal Balance { get; set; }
        public Guid UserIdentifier { get; set; }
        public string Name { get; set; }
        public int? ActiveTaskWeekId { get; set; }

    }
    
    
}

