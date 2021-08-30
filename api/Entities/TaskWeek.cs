using AllowanceFunctions.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AllowanceFunctions.Entities
{
    [Table("taskweeks")]
    public class TaskWeek : Entity
    {
        public DateTime WeekStartDate { get; set; }
        public int StatusId { get; set; }
        public decimal Value { get; set; }
    
        public int AccountId { get; set; }


    }
}
