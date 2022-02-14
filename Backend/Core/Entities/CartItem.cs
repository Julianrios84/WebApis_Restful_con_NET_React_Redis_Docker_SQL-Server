﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CartItem
    {
        public int  Id { get; set; }

        public string Product { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public string Picture { get; set; }

        public string Mark { get; set; }

        public string Category { get; set; }
    }
}
