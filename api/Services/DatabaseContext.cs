using AllowanceFunctions.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AllowanceFunctions.Services
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Account> AccountSet { get; set; }
        public DbSet<TaskDefinition> TaskDefinitionSet { get; set; }

        internal DbSet<Role> RoleSet { get; set; }

        internal DbSet<TaskGroup> TaskGroupSet { get; set; }

        internal DbSet<Status> StatusSet { get; set; }
        internal DbSet<TransactionCategory> TransactionCategorySet { get; set; }

        public DbSet<TaskActivity> TaskActivitySet { get; set; }

        public DbSet<TaskWeek> TaskWeekSet { get; set; }
        public DbSet<TransactionLog> TransactionLogSet { get; set; }

        internal DbSet<ActivityStatus> ActivityStatusSet { get; set; }
    }
}
