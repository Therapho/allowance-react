using AllowanceFunctions.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AllowanceFunctions.Entities
{
    [Table("taskgroups")]
    internal class TaskGroup  : Lookup
    {
        public bool Weekly { get; set; }
    }
}
