﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.PurchaseOrder
{
    public class Product
    {
        public Product() { }

        public Product(int id, string name, string picture)
        {
            Id = id;
            Name = name;
            Picture = picture;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Picture { get; set; }
    }
}
