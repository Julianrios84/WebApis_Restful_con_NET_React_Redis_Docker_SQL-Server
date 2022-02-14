using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.PurchaseOrder
{
    public class Addresses
    {
        public Addresses() { }

        public Addresses(string street, string town, string department, string country, string zipCode)
        {
            Street = street;
            Town = town;
            Department = department;
            Country = country;
            ZipCode = zipCode;
        }

        public string Street { get; set; }

        public string Town { get; set; }

        public string Department { get; set; }

        public string Country { get; set; }

        public string ZipCode { get; set; }

    }
}
