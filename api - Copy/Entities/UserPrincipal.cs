using System.Linq;
using AllowanceFunctions.Common;
using Newtonsoft.Json;

namespace AllowanceFunctions.Entities
{
    public class UserPrincipal{

        [JsonProperty("userDetails")]
        public string UserDetails { get; set; }

        [JsonProperty("userRoles")]
        public string[] UserRoles { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("identityProvider")]
        public string IdentityProvider { get; set; }

        public bool IsInRole(string userRole)
        {
            return this.UserRoles.Contains(userRole);
        }
        public bool IsAuthorizedToAccess(int callingAccountId, int targetAccountId)
        {
            return targetAccountId == callingAccountId || IsInRole(Constants.PARENT_ROLE);
        }
        public bool IsAuthorizedToAccess(string targetUserId)
        {
            return targetUserId == UserId || IsInRole(Constants.PARENT_ROLE);
        }
    }
}