using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace BusinessLogic.Logic
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly IDatabase _database;

        public ShoppingCartRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteShoppingCartAsync(string id)
        {
            return await _database.KeyDeleteAsync(id);
        }

        public async Task<ShoppingCart> GetShoppingCartAsync(string id)
        {
            var data = await _database.StringGetAsync(id);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<ShoppingCart>(data);
        }

        public async Task<ShoppingCart> UpdateShoppingCartAsync(ShoppingCart shoppingCart)
        {
            var status = await _database.StringSetAsync(shoppingCart.Id, JsonSerializer.Serialize(shoppingCart), TimeSpan.FromDays(30));
            if (!status) return null;
            return await GetShoppingCartAsync(shoppingCart.Id);
        }
    }
}
