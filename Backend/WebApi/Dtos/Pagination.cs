using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class Pagination<T> where T: class
    {
        public int Count { get; set; }

        public int Page { get; set; }

        public int Limit { get; set; }

        public IReadOnlyList<T> Data { get; set; }

        public int PageCount { get; set; }
    }
}
