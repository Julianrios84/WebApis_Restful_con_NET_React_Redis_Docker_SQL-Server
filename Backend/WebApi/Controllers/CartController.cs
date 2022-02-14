using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class CartController : BaseController
    {
        private readonly IShoppingCartRepository _shoppingCartRepository;

        public CartController(IShoppingCartRepository shoppingCartRepository)
        {
            _shoppingCartRepository = shoppingCartRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCartById(string id)
        {
            var record = await _shoppingCartRepository.GetShoppingCartAsync(id);
            return Ok(record ?? new ShoppingCart(id));
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> UpdateShoppingCart(ShoppingCart shoppingCart)
        {
            var record = await _shoppingCartRepository.UpdateShoppingCartAsync(shoppingCart);
            return Ok(record);
        }

        [HttpDelete]
        public async Task DeleteShoppingCart(string id)
        {
            await _shoppingCartRepository.DeleteShoppingCartAsync(id);
        }
    }
}
