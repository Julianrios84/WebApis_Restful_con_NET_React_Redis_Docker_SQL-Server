using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class AddressesDTO
    {
        public string Street { get; set; }

        public string Town { get; set; }

        public string Department { get; set; }

        public string Country { get; set; }

        public string ZipCode { get; set; }
    }
}
