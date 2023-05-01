using System.Security;
using System.Threading.Tasks;
using AllowanceFunctions.Entities;
using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;

namespace AllowanceFunctions.Common
{
    public class RequestContext
    {
     
        public Account TargetAccount { get; set; }
        public Account CallingAccount { get; set; }

        public UserPrincipal UserPrincipal { get; set; }

        public string UserDetails 
        { 
            get
            {
                return UserPrincipal != null ? UserPrincipal.UserDetails : "Anonymous User";
            } 
        }

        public static async Task<RequestContext> CreateContext(AccountService accountService, HttpRequest request)
        {
        

            var userPrincipal = request.GetUserPrincipal();
            var callingAccount = userPrincipal !=null ? await accountService.GetByUser(userPrincipal.UserId) : null;

            int targetAccountId;
            Account targetAccount;

            if (request.Query.ContainsKey("accountId"))
            {
                targetAccountId = request.Query.GetValue<int>("accountId");
                targetAccount = await accountService.Get(targetAccountId);
            }
            else
            {
                targetAccountId = callingAccount != null ? callingAccount.Id : 0;
                targetAccount = null;
            }
            return new RequestContext(callingAccount, targetAccount, userPrincipal);
        }
        public RequestContext(Account callingAccount, Account targetAccount, UserPrincipal userPrincipal)
        {
           CallingAccount = callingAccount;
           TargetAccount = targetAccount;
           UserPrincipal  = userPrincipal;
            
        }

        public bool IsAuthorizedToAccess()
        {
            return UserPrincipal.IsAuthorizedToAccess(CallingAccount.Id, TargetAccount.Id);
        }
         public bool IsAuthorizedToAccess(int targetAccountId)
        {
            return UserPrincipal.IsAuthorizedToAccess(CallingAccount.Id, targetAccountId);
        }

        public bool IsParent()
        {
            return UserPrincipal.IsInRole(Constants.PARENT_ROLE);
        }
    }   
      

}