using System;
using System.Collections.Generic;
using System.Text;

namespace api.Common
{
    internal static class Utility
    {
        public static string ParseError(Exception exception)
        {
            StringBuilder errorMessage = new StringBuilder();
            while (exception != null)
            {
                errorMessage.AppendLine(exception.Message);
                exception = exception.InnerException;
            }
            return errorMessage.ToString();
        }
    }
}
