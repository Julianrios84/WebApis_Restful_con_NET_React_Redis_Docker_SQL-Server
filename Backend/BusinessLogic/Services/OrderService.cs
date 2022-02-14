using Core.Entities.PurchaseOrder;
using Core.Interfaces;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class OrderService : IOrderService
    {
        //private readonly IGenericRepository<Order> _orderRepository;
        //private readonly IGenericRepository<Core.Entities.Product> _productRepository;
        private readonly IShoppingCartRepository _shoppingCartRepository;
        //private readonly IGenericRepository<ShippingType> _shippingTypeRepository;

        private readonly IUnitOfWork _unitOfWork;
      
        public OrderService(IShoppingCartRepository shoppingCartRepository, IUnitOfWork unitOfWork)
        {
            _shoppingCartRepository = shoppingCartRepository;
            _unitOfWork = unitOfWork;
        }

        /**
         *  1. Obtener el carrito de compra
         *  2. Obtener los items y el detalle de cada producto item
         *  3. Obtener el tipo de envio 
         *  4. Calcular el subtotal a pagar
         *  5. Crear la Orden de compra
         *  6. Almacenar la orden en la base de datos 
         *  7. Retornar la orden de compra **/


        public async Task<Order> AddOrderAsync(string email, int shipping, string cartId, Addresses addresses)
        {
            var shoppingCart = await _shoppingCartRepository.GetShoppingCartAsync(cartId);

            var items = new List<Item>();
            foreach (var item in shoppingCart.Items)
            {
                var productItem = await _unitOfWork.Repository<Core.Entities.Product>().GetByIdAsync(item.Id);
                var orderedItem = new Product(productItem.Id, productItem.Name, productItem.Picture);
                var orderItem = new Item(orderedItem, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            var shippingType = await _unitOfWork.Repository<ShippingType>().GetByIdAsync(shipping);
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var order = new Order(email, addresses, shippingType, items, subtotal);

            _unitOfWork.Repository<Order>().AddEntity(order);
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            await _shoppingCartRepository.DeleteShoppingCartAsync(cartId);

            return order;
        }

        public async Task<Order> GetOrderByIdAsync(int id, string email)
        {
            var spec = new OrderWithItemsSpecification(id, email);
            return await _unitOfWork.Repository<Order>().GetByIdWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrderByUserEmailAsync(string email)
        {
            var spec = new OrderWithItemsSpecification(email);
            return await _unitOfWork.Repository<Order>().GetAllWithSpec(spec);

        }

        public async Task<IReadOnlyList<ShippingType>> GetShippingType()
        {
            return await _unitOfWork.Repository<ShippingType>().GetAllAsync();
        }
    }
}
