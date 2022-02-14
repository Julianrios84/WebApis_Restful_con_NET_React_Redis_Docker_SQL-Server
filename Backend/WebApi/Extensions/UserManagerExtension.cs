using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApi.Extensions
{
    public static class UserManagerExtension
    {
        public static async Task<User> SearchUserWithAddresses(this UserManager<User> userManager, ClaimsPrincipal httpContext)
        {
            var email = httpContext.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await userManager.Users.Include(x => x.Addresses).SingleOrDefaultAsync(x => x.Email == email);

            return user;
        }

        public static async Task<User> SearchUser(this UserManager<User> userManager, ClaimsPrincipal httpContext)
        {
            var email = httpContext.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await userManager.Users.SingleOrDefaultAsync(x => x.Email == email);

            return user;
        }
    }
}
