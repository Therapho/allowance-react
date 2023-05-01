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

        public static T GetRequiredValue<T>(this IQueryCollection query, string parameterName)
        {
            if (!query.ContainsKey(parameterName)) throw new ArgumentException($"{parameterName} missing from request.");

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
        public static bool HasValue(this IQueryCollection query, string parameterName)
        {
            return query.ContainsKey(parameterName);
        }
    
         public static UserPrincipal GetUserPrincipal(this HttpRequest request)
        {
            UserPrincipal principal = null;
            if(request.Headers.ContainsKey("x-ms-client-principal"))
            {
                var header = request.Headers["x-ms-client-principal"];
                var valueBytes = System.Convert.FromBase64String(header);
                var decoded = System.Text.Encoding.UTF8.GetString(valueBytes);
                 principal = JsonConvert.DeserializeObject<UserPrincipal>(decoded);
            }
            return principal;
        }
       
    }
}
