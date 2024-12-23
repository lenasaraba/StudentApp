using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ThemeController: BaseAPIController
    {
        private readonly StoreContext _context;
        private readonly UserManager<User> _userManager;

        private readonly IMapper _mapper;
        public ThemeController(StoreContext context, IMapper mapper,UserManager<User> userManager)
        {
            _context=context;
            _userManager=userManager;
            _mapper=mapper;
        }

        [HttpGet("GetAllThemes")]
        public async Task<ActionResult<List<ThemeDto>>> GetAllThemes()
        {
            var themes= await _context.Themes.Include(u=>u.User).Include(c=>c.Course).ToListAsync();

            return themes.Select(c => _mapper.Map<ThemeDto>(c)).ToList();
        }

        [HttpPost]
        public async Task<ActionResult<List<ThemeDto>>> CreateTheme(ThemeDto newTheme)
        {
            var user=await _userManager.FindByNameAsync(User!.Identity!.Name!);
            newTheme.UserId=user!.Id;
            
            var theme=_mapper.Map<Theme>(newTheme);

            //nema poente jer themeDto nema kurs (ne dozvoljava jer i kurs ima teme pa se pravi ciklus)
            //nekako ucitati kurs ako postoji?
           // theme.Course=_context.Courses.FirstOrDefault<Course>(c=>c.Id==newTheme.CourseId);
            _context.Themes.Add(theme);
            await _context.SaveChangesAsync(); 
            var themes= await _context.Themes.Include(u=>u.User).Include(c=>c.Course).ToListAsync();
 
            return themes.Select(c => _mapper.Map<ThemeDto>(c)).ToList();         

        }
         
    }
}