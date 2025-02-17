using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController:BaseAPIController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user=await _userManager.FindByEmailAsync(loginDto.Email);
            
            if(user==null||!await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();
            
            return new UserDto{
                Email=user.Email,
                Username=user.UserName,
                Token=await _tokenService.GenerateToken(user),
                FirstName=user.FirstName,
                LastName=user.LastName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user=new User{
                UserName=registerDto.Username,
                Email=registerDto.Email
            };

            var result=await _userManager.CreateAsync(user, registerDto.Password);
            if(!result.Succeeded)
            {
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();          
            }
            await _userManager.AddToRoleAsync(user, "Student");

            return StatusCode(201); 
        }

        [Authorize] 
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user=await _userManager.FindByNameAsync(User.Identity.Name);
            //ovim cemo dobiti name claim iz tokena

            return new UserDto
            {
                Email=user.Email,
                Token=await _tokenService.GenerateToken(user),
                Username=user.UserName,
                FirstName=user.FirstName,
                LastName=user.LastName
            };
        }

        [HttpPost("updateUser")]
        public async Task<ActionResult<UserDto>> UpdateUser([FromBody] UpdateUserDto userData)
        {
            if (userData.FirstName == null || userData.LastName==null)
            {
                return BadRequest("Invalid data.");
            }

            var user=await _userManager.FindByNameAsync(User!.Identity!.Name!);
            user!.FirstName = userData.FirstName;
            user.LastName =userData.LastName;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest("Greška prilikom ažuriranja korisničkih podataka.");
            }

            return new UserDto
            {
                Email=user.Email,
                Token=await _tokenService.GenerateToken(user),
                Username=user.UserName,
                FirstName=user.FirstName,
                LastName=user.LastName
            };
        }
    }
}