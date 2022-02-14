using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.PurchaseOrder
{
    public class Item : ClassBase
    {
        public Item() { }

        public Item(Product product, decimal price, int quantity)
        {
            Product = product;
            Price = price;
            Quantity = quantity;
        }

        public Product Product { get; set; }
        
        public decimal Price { get; set; }

        public int Quantity { get; set; }


    }
}
