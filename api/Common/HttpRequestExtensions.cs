using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace AllowanceFunctions.Common
{
    public static class HttpRequestExtensions 
    {
        public static T? GetValueOrDefault<T>(this IQueryCollection query, string parameterName) where T: struct
        {
            if (!query.ContainsKey(parameterName) || string.IsNullOrEmpty(query[parameterName])) return null;
            return query.GetValue<T>(parameterName);
        }

        public static T GetValue<T>(this IQueryCollection query, string parameterName) 
        {
            object convertedValue = default(T);

            if (!query.ContainsKey(parameterName)) return default(T);
            string stringValue = query[parameterName];
            if (typeof(T).Name == "Guid")
            {
                convertedValue = Guid.Parse(stringValue);
            }
            else
            {
                convertedValue = (T)Convert.ChangeType(stringValue, typeof(T));
            }
            return (T)convertedValue;
        }

        public static JwtSecurityToken GetToken(this HttpRequest req)
        {
            var authorizationHeader = req.Headers["Authorization"].ToString().Remove(0, 7);
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(authorizationHeader);

            return token;
        }
        public static Guid GetUserIdentifier (this HttpRequest req)
        {

            return Guid.Parse(req.GetToken().Subject);            
        }
    }
}
