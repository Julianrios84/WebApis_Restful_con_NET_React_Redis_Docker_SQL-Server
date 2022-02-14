using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Data
{
    public class SecurityDbContextData
    {
        public static async Task SeedUserAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new User {
                    FirstName = "Julian",
                    LastName = "Rios",
                    UserName = "julianrios",
                    Email = "julianrios@gmail.com",
                    Addresses = new Addresses {
                        Street = "15 - 41",
                        Town = "Cartago",
                        Country = "Colombia",
                        ZipCode = "762022",
                        Department = "Valle del Cuca"
                    }
                };

                await userManager.CreateAsync(user, "JulianRios@091311");
            }

            if(!roleManager.Roles.Any())
            {
                var role = new IdentityRole
                {
                    Name = "ADMIN"
                };

                await roleManager.CreateAsync(role);
            }
        }
    }
}
