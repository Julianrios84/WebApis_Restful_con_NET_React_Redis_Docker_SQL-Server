using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class UserParamsSpecification
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Sort { get; set; }

        public int Page { get; set; } = 1;

        private const int MaxPageSize = 50;

        private int _pageSize = 3;

        public int Limit
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string Search { get; set; }
    }
}
