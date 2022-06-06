using AllowanceFunctions.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace AllowanceFunctions.Entities
{
    [Table("taskdefinitions")]
    public class TaskDefinition : Entity
    {
        public int TaskGroupId { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }
        public int Sequence { get; set; }
        public int? AccountId { get; set; }
        public bool Active { get; set; }

    }

}