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
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProfessorController:BaseAPIController
    {
        
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
    private readonly RoleManager<Role> _roleManager;

        public ProfessorController( StoreContext context, IMapper mapper, RoleManager<Role> roleManager)
        {
            _context = context;
             _mapper=mapper;
             _roleManager=roleManager;
        }

        [HttpGet("GetAllProfessors")] 
        public async Task<ActionResult<List<UserDto>>> GetAllProfessors()
        {
            int roleId=1;
            var role = await _roleManager.FindByIdAsync(roleId.ToString());
            if (role == null)
            {
                return NotFound("Role not found");
            }

            // Get users with that role
            var usersWithRole = await _context.Users
                .Where(u => _context.UserRoles
                    .Where(ur => ur.RoleId == role.Id)
                    .Any(ur => ur.UserId == u.Id))
                .ToListAsync();

            if (usersWithRole == null || !usersWithRole.Any())
            {
                return NotFound("No users found with the specified role");
            }

            return usersWithRole.Select(c=>_mapper.Map<UserDto>(c)).ToList();
        }
    }
}