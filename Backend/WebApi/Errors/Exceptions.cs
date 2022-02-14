using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Errors
{
    public class Exceptions : Response
    {
        public string Details { get; set; }

        public Exceptions(int statusCode, string message = null, string details = null) : base(statusCode, message)
        {
            Details = details;
        }



    }
}
