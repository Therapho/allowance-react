using AllowanceFunctions.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AllowanceFunctions.Entities
{
    [Table("taskactivities")]
    public class TaskActivity : Entity
    {

        public int TaskGroupId { get; set; }
        public int Sequence { get; set; }
        public int TaskWeekId { get; set; }
        public int MondayStatusId { get; set; }
        public int TuesdayStatusId { get; set; }
        public int WednesdayStatusId { get; set; }
        public int ThursdayStatusId { get; set; }
        public int FridayStatusId { get; set; }
        public int SaturdayStatusId { get; set; }
        public int SundayStatusId { get; set; }
        public int TaskDefinitionId { get; set; }
        public int AccountId { get; set; }
    }
}
