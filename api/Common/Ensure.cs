using System;
using System.Collections.Generic;
using System.Text;

namespace api.Common
{
    public static class Ensure
    {
        public static EnsureValue That(object toTest)
        {
            return new EnsureValue(toTest);
        }
    }

    public class EnsureValue
    {
        private readonly object _toTest;

        public EnsureValue(object toTest)
        {
            _toTest = toTest;
        }
       
        public EnsureResult IsTrue()
        {
            bool passed = false;
            if (_toTest is bool) passed = (bool)_toTest;
            return new EnsureResult(passed);
        }
    }

    public class EnsureResult
    {
        private bool _result;

        public EnsureResult(bool result)
        {
            _result = result;
        }

        public void Otherwise(string message)
        {
            throw new ArgumentException(message);
        }
    }
}
