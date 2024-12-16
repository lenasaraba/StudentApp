using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CourseController:BaseAPIController
    {
        private readonly StoreContext _context;
        
        private readonly IMapper _mapper;
        public CourseController( StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper=mapper;
        }

        [HttpGet("getAllCourses")]
        public async Task<ActionResult<List<CourseDto>>>GetCourses()
        {
            var courses=await _context.Courses.Include(y=>y.Year).Include(s=>s.StudyProgram).Include(c => c.ProfessorsCourse).ThenInclude(pu=>pu.User).Include(c=>c.UsersCourse).ToListAsync();
            return courses.Select(c=>_mapper.Map<CourseDto>(c)).ToList();

        }
        [HttpGet("getMyCourses/{id}")]
        public async Task<ActionResult<List<CourseDto>>>GetMyCourses(string id)
        {
            //PROMIJENITI DA PRIKAZUJE KURSEVE NA KOJIMA JE TRENUTNI KORISNIK
            var courses=await _context.Courses.ToListAsync();
            return courses.Select(c=>_mapper.Map<CourseDto>(c)).ToList();

        }
    }
}