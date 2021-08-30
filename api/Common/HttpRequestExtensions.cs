using AllowanceFunctions.Entities;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;


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

    
         public static UserPrincipal GetUserPrincipal(this HttpRequest request)
        {
            var header = request.Headers["x-ms-client-principal"];
            var valueBytes = System.Convert.FromBase64String(header);
            var decoded = System.Text.Encoding.UTF8.GetString(valueBytes);
            var principal = JsonConvert.DeserializeObject<UserPrincipal>(decoded);
            
            return principal;
        }
       
    }
}
