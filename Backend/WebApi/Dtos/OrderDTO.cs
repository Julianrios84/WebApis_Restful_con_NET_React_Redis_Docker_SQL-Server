using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class OrderDTO
    {
        public string Id { get; set; }

        public int Shipping { get; set; }

        public AddressesDTO Addresses { get; set; }
    }
}
