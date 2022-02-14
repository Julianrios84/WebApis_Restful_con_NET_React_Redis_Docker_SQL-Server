using Core.Entities.PurchaseOrder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class OrderWithItemsSpecification : BaseSpecification<Order>
    {
        public OrderWithItemsSpecification(string email) : base(x => x.Email == email)
        {
            AddInclude(x => x.Items);
            AddInclude(x => x.ShippingType);
            AddOrderByDescending(x => x.DateOfPurchase);
        }

        public OrderWithItemsSpecification(int id, string email) :
            base(x => x.Email == email && x.Id == id)
        {
            AddInclude(x => x.Items);
            AddInclude(x => x.ShippingType);
            AddOrderByDescending(x => x.DateOfPurchase);
        }
    }
}
