using Microsoft.Azure.WebJobs.Extensions.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AllowanceFunctions.Common
{
    public static class Constants
    {
        public const AuthorizationLevel AUTHORIZATION_LEVEL = AuthorizationLevel.Anonymous;
        public enum Status { Open = 1, Submitted = 2, Accepted = 3, Rejected = 4 };
        public enum ActivityStatus { Incomplete = 1, Complete = 2, Blocked = 3};
        public enum Role { Parent = 1, Child = 2};
        public enum TransactionCategory { Deposit=1, Withdraw=2};

    }
}
