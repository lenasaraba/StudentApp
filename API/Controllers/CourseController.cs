using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CourseController : BaseAPIController
    {
        private readonly StoreContext _context;

        private readonly IMapper _mapper;
        public CourseController(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        
        [HttpGet("getAllCourses")]
        public async Task<ActionResult<List<CourseDto>>> GetCourses([FromQuery] CourseParams coursesParams)
        {
                // var courses = await _context.Courses.Include(y => y.Year).Include(s => s.StudyProgram).Include(c => c.ProfessorsCourse!).ThenInclude(pu => pu.User).Include(c => c.UsersCourse).ToListAsync();
                // return courses.Select(c => _mapper.Map<CourseDto>(c)).ToList();

                var query=_context.Courses
            .Include(y => y.Year)
            .Include(s => s.StudyProgram)
            .Include(c => c.ProfessorsCourse!).ThenInclude(pu => pu.User)
            .Include(c => c.UsersCourse)
            .AsQueryable();
            // Filtriranje prema searchTerm
            if (!string.IsNullOrEmpty(coursesParams.SearchTerm))
            {
                query = query.Where(c =>
                    c.Name.Contains(coursesParams.SearchTerm) ||
                    c.Description.Contains(coursesParams.SearchTerm));
            }
            // Filtriranje prema Year
            if (coursesParams.Years != null && coursesParams.Years.Count > 0)
            {
                query = query.Where(c => coursesParams.Years.Contains(c.Year!.Name));
            }

            // Filtriranje prema StudyProgram
            if (coursesParams.StudyPrograms != null && coursesParams.StudyPrograms.Count > 0)
            {
                query = query.Where(c => coursesParams.StudyPrograms.Contains(c.StudyProgram!.Name));
            }

            // Dobavljanje filtriranih kurseva
            var courses = await query.ToListAsync();

            return courses.Select(c => _mapper.Map<CourseDto>(c)).ToList();
        }

        [HttpGet("getMyCourses/{id}")]
        public async Task<ActionResult<List<CourseDto>>> GetMyCourses(string id)
        {
            //PROMIJENITI DA PRIKAZUJE KURSEVE NA KOJIMA JE TRENUTNI KORISNIK
            var courses = await _context.Courses.ToListAsync();
            return courses.Select(c => _mapper.Map<CourseDto>(c)).ToList();

        }

        [HttpGet("getProfessorsCourses/{id}")]
        public async Task<ActionResult<List<CourseDto>>> getProfessorsCourses(int id)
        {
            var courses = await _context.Courses
            .Where(c => c.ProfessorsCourse!.Any(pc => pc.UserId == id))
            .Include(y => y.Year).Include(s => s.StudyProgram).ToListAsync();

            return courses.Select(c => _mapper.Map<CourseDto>(c)).ToList();
        }

        [HttpGet("getCourseById/{id}")]
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
            var course = await _context.Courses
        .Include(y => y.Year)  
        .Include(s => s.StudyProgram) 
        .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CourseDto>(course));
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var years=await _context.Courses.Select(c=>c.Year!.Name).Distinct().ToListAsync();
            var programs=await _context.Courses.Select(c=>c.StudyProgram!.Name).Distinct().ToListAsync();


            return Ok(new {years, programs});
        }


    }
}