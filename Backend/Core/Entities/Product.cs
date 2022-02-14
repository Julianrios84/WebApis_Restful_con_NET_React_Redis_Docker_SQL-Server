using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Product : ClassBase
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Stock { get; set; }

        public int MarkId { get; set; }

        public Mark Mark { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public decimal Price { get; set; }

        public string Picture { get; set; }

    }
}
