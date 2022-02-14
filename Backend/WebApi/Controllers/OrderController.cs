using AutoMapper;
using Core.Entities.PurchaseOrder;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Errors;

namespace WebApi.Controllers
{
    [Authorize]
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<OrderResponseDTO>> Create(OrderDTO orderDTO)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;
            var address = _mapper.Map<AddressesDTO, Addresses>(orderDTO.Addresses);
            var order = await _orderService.AddOrderAsync(email, orderDTO.Shipping, orderDTO.Id, address);

            if (order == null) return BadRequest(new Response(400, "Error creating purchase order"));
            return Ok(_mapper.Map<Order, OrderResponseDTO>(order));
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderResponseDTO>>> GetOrder()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;
            var order = await _orderService.GetOrderByUserEmailAsync(email);
            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderResponseDTO>>(order));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderResponseDTO>> GetOrderById(int id)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;
            var order = await _orderService.GetOrderByIdAsync(id, email);
            if (order == null) return NotFound(new Response(404, "Purchase order not found"));
            return Ok(_mapper.Map<Order, OrderResponseDTO>(order));
        }

        [HttpGet("shipments")]
        public async Task<ActionResult<IReadOnlyList<ShippingType>>> GetShippingType()
        {
            var shipments = await _orderService.GetShippingType();
            return Ok(shipments);
        }
    }
}
