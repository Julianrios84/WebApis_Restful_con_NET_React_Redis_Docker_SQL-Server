using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Addresses
    {

        public int Id { get; set; }

        public string Street { get; set; }

        public string Town { get; set; }

        public string Department { get; set; }

        public string Country { get; set; }

        public string ZipCode { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
    }
}
