using Core.Entities.PurchaseOrder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class OrderResponseDTO
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public DateTimeOffset DateOfPurchase { get; set; }

        public Addresses Addresses { get; set; }

        public string ShippingType { get; set; }

        public decimal ShippingTypePrice { get; set; }

        public IReadOnlyList<ItemResponseDTO> Items { get; set; }

        public decimal SubTotal { get; set; }

        public decimal Total { get; set; }

        public string Status { get; set; }
    }
}
