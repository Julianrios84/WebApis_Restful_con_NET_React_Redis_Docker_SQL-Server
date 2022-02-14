using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Errors;
using WebApi.Extensions;

namespace WebApi.Controllers
{
    public class UserController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IGenericRepositorySecurity<User> _securityRepository;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IMapper mapper, IPasswordHasher<User> passwordHasher, IGenericRepositorySecurity<User> securityRepository, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _securityRepository = securityRepository;
            _roleManager = roleManager;
        }


        [HttpPost("signin")]
        public async Task<ActionResult<UserDTO>> SignIn(SignInDTO signInDTO)
        {
            var user = await _userManager.FindByEmailAsync(signInDTO.Email);
            if(user == null)
            {
                return Unauthorized(new Response(401));
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, signInDTO.Password, false);

            if(!result.Succeeded)
            {
                return Unauthorized(new Response(401));
            }

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDTO {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user, roles),
                FirstName = user.FirstName,
                LastName = user.LastName,
                Picture = user.Picture,
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }

        [HttpPost("signup")]
        public async Task<ActionResult<UserDTO>> SignUp(SignUpDTO signUpDTO)
        {
            var user = new User
            {
                Email = signUpDTO.Email,
                UserName = signUpDTO.UserName,
                FirstName = signUpDTO.FirstName,
                LastName = signUpDTO.LastName,

            };

            var result = await _userManager.CreateAsync(user, signUpDTO.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new Response(400));
            }


            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user, null),
                Admin = false
            };
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> Update(string id, SignUpDTO data)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new Response(404, "User not found"));
            }
            user.FirstName = data.FirstName;
            user.LastName = data.LastName;
            user.Picture = data.Picture;

            if (!string.IsNullOrEmpty(data.Password))
            {
                user.PasswordHash = _passwordHasher.HashPassword(user, data.Password);
            }

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(new Response(400, "Could not update user"));
            }

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user, roles),
                Picture = user.Picture,
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("pagination")]
        public async Task<ActionResult<Pagination<UserDTO>>> GetUsers([FromQuery] UserParamsSpecification userParams)
        {
            var spec = new UserSpecification(userParams);
            var records = await _securityRepository.GetAllWithSpec(spec);
            var count = new UserCountingSpecification(userParams);
            var total = await _securityRepository.CountAsync(count);
            var totalPage = Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(total / userParams.Limit)));
            var data = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<UserDTO>>(records);

            return Ok(new Pagination<UserDTO>
            {
                Count = total,
                Page = userParams.Page,
                Limit = userParams.Limit,
                PageCount = totalPage,
                Data = data
            });
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("role/{id}")]
        public async Task<ActionResult<UserDTO>> UpdateRole(string id, RoleDTO roleDTO)
        {
            var role = await _roleManager.FindByNameAsync(roleDTO.Name);
            if (role == null)
            {
                return NotFound(new Response(404, "Role not found."));
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new Response(404, "User not found."));
            }

            var record = _mapper.Map<User, UserDTO>(user);

            if (roleDTO.Status)
            {
                var result = await _userManager.AddToRoleAsync(user, roleDTO.Name);
                if (result.Succeeded)
                {
                    record.Admin = true;
                }

                if (result.Errors.Any())
                {
                    if (result.Errors.Where(x => x.Code == "UserAlreadyInRole").Any())
                    {
                        record.Admin = true;
                    }
                }
            }
            else
            {
                var result = await _userManager.RemoveFromRoleAsync(user, roleDTO.Name);
                if (result.Succeeded)
                {
                    record.Admin = false;
                }
            }

            if (record.Admin)
            {
                var roles = new List<string>();
                roles.Add("ADMIN");
                record.Token = _tokenService.CreateToken(user, roles);
            }
            else
            {
                record.Token = _tokenService.CreateToken(user, null);
            }
            return record;

        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("account/{id}")]
        public async Task<ActionResult<UserDTO>> AccountById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new Response(404, "User not found."));
            }

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user, roles),
                FirstName = user.FirstName,
                LastName = user.LastName,
                Picture = user.Picture,
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> currentUser()
        {
            var user = await _userManager.SearchUser(HttpContext.User);

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user, roles),
                Picture = user.Picture,
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }

        [HttpGet("validate/email")]
        public async Task<ActionResult<bool>> ValidateEmail([FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return false;

            return true;
        }

        [Authorize]
        [HttpGet("addresses")]
        public async Task<ActionResult<AddressesDTO>> getAddresses()
        {
            var user = await _userManager.SearchUserWithAddresses(HttpContext.User);
            return _mapper.Map<Addresses, AddressesDTO>(user.Addresses);
        }

        [Authorize]
        [HttpPut("addresses")]
        public async Task<ActionResult<AddressesDTO>> UpdateAddresses(AddressesDTO addresses)
        {
            var user = await _userManager.SearchUserWithAddresses(HttpContext.User);
            user.Addresses = _mapper.Map<AddressesDTO, Addresses>(addresses);
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Addresses, AddressesDTO>(user.Addresses));

            return BadRequest("The user's address could not be updated");
        }

        

        

        
    }
}
