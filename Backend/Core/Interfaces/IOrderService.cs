using Core.Entities.PurchaseOrder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> AddOrderAsync(string email, int shipping, string cartId, Addresses addresses);

        Task<IReadOnlyList<Order>> GetOrderByUserEmailAsync(string email);

        Task<Order> GetOrderByIdAsync(int id, string email);

        Task<IReadOnlyList<ShippingType>> GetShippingType();
    }
}
