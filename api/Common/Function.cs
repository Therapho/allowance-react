using AllowanceFunctions.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace AllowanceFunctions.Common
{
    public abstract class Function
    {
        //protected readonly DatabaseContext _context;
        protected readonly AuthorizationService _authorizationService;

        public Function(AuthorizationService authorizationService)
        {

            _authorizationService = authorizationService;
        }
        public Function() { }

        public Guid GetCallingUserIdentifier(HttpRequest request)
        {
            return request.GetUserIdentifier();
        }
        public async Task<Guid> GetTargetUserIdentifier(HttpRequest request)
        {
            Guid identifier;
            Guid currentUserIdentifier = request.GetUserIdentifier();

            if (request.Query.ContainsKey("useridentifier"))
            {
                identifier = request.Query.GetValue<Guid>("useridentifier");
                if(!await _authorizationService.IsInRole(currentUserIdentifier, Constants.Role.Parent))
                {
                    throw new SecurityException("Invalid attempt to access a record by an invalid user");
                }
            }
            else
            {
                identifier = currentUserIdentifier;
            }
            return identifier;
        }
        public async Task< bool> IsParent(HttpRequest request)
        {
            var userIdentifier = GetCallingUserIdentifier(request);
            return await IsInRole(userIdentifier, Constants.Role.Parent);
        }
        public async Task<bool> IsInRole(Guid userIdentifier, Constants.Role role)
        {
            return await _authorizationService.IsInRole(userIdentifier, role);
        }

    }
}
