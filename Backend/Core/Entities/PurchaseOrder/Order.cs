using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.PurchaseOrder
{
    public class Order : ClassBase
    {
        public Order() { }

        public Order(string email, Addresses addresses, ShippingType shippingType, IReadOnlyList<Item> items, decimal subTotal)
        {
            Email = email;
            Addresses = addresses;
            ShippingType = shippingType;
            Items = items;
            SubTotal = subTotal;
        }

        public string Email { get; set; }

        public DateTimeOffset DateOfPurchase { get; set; } = DateTimeOffset.Now;

        public Addresses Addresses { get; set; }

        public ShippingType ShippingType { get; set; }

        public IReadOnlyList<Item> Items { get; set; }

        public decimal SubTotal { get; set; }

        public Status Status { get; set; } = Status.Pending;

        public string PaymentId { get; set; }

        public decimal Total ()
        {
            return SubTotal + ShippingType.Price;
        }
    }
}
