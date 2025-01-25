using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProfessorController : BaseAPIController
    {

        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly RoleManager<Role> _roleManager;

        public ProfessorController(StoreContext context, IMapper mapper, RoleManager<Role> roleManager)
        {
            _context = context;
            _mapper = mapper;
            _roleManager = roleManager;
        }

        [HttpGet("GetAllProfessors")]
        public async Task<ActionResult<List<UserDto>>> GetAllProfessors([FromQuery] ProfessorsParams professorsParams)
        {
            int roleId = 1;
            var role = await _roleManager.FindByIdAsync(roleId.ToString());
            if (role == null)
            {
                return NotFound("Role not found");
            }

            // Kreiranje upita za sve profesore sa specifičnom ulogom
            var query = _context.Users
                .Where(u => _context.UserRoles
                    .Where(ur => ur.RoleId == role.Id)
                    .Any(ur => ur.UserId == u.Id))
                .Include(u => u.ProfessorCourses) // Veza sa kursevima profesora
                    .ThenInclude(pc => pc.Course)
                    .ThenInclude(c => c.StudyProgram) // Veza sa programima
                .Include(u => u.ProfessorCourses)
                    .ThenInclude(pc => pc.Course)
                    .ThenInclude(c => c.Year) // Veza sa godinama
                .AsQueryable();

            // Filtriranje prema imenu i prezimenu
            if (!string.IsNullOrEmpty(professorsParams.SearchTerm))
            {
                query = query.Where(p =>
                    p.FirstName.Contains(professorsParams.SearchTerm) ||
                    p.LastName.Contains(professorsParams.SearchTerm));
            }

            // Filtriranje prema godinama
            if (!string.IsNullOrEmpty(professorsParams.Year))
            {
                if (professorsParams.Year != "Sve")
                    query = query.Where(p =>
                        p.ProfessorCourses.Any(pc => pc.Course.Year.Name == professorsParams.Year));
            }

            // Filtriranje prema programima
            if (!string.IsNullOrEmpty(professorsParams.Program))
            {
                if (professorsParams.Program != "Sve")
                    query = query.Where(p =>
                        p.ProfessorCourses.Any(pc => pc.Course.StudyProgram.Name == professorsParams.Program));
            }



            // Izvršavanje upita
            var professors = await query.ToListAsync();

            // Mapiranje rezultata na DTO
            return professors.Select(p => _mapper.Map<UserDto>(p)).ToList();
        }


        [HttpGet("getProfessorYearsPrograms/{id}")]
        public async Task<ActionResult> GetProfessorYearsPrograms(int id)
        {
            var years = await _context.ProfessorCourses
                .Where(pc => pc.UserId == id) // Filtriranje po ID-u profesora
                .Select(pc => pc.Course!.Year) // Dohvatanje godina iz povezanog kursa
                .Distinct()
                .ToListAsync();


            var programs = await _context.ProfessorCourses
                .Where(pc => pc.UserId == id) // Filtriranje po ID-u profesora
                .Select(pc => pc.Course!.StudyProgram) // Dohvatanje programa iz povezanog kursa
                .Distinct()
                .ToListAsync();



            return Ok(new { years, programs });

        }
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var years = await _context.Courses.Select(c => c.Year!.Name).Distinct().ToListAsync();
            var programs = await _context.Courses.Select(c => c.StudyProgram!.Name).Distinct().ToListAsync();

            years.Insert(0, "Sve");
            programs.Insert(0, "Sve");


            return Ok(new { years, programs });
        }
    }
}