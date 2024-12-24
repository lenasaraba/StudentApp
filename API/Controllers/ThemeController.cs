using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ThemeController : BaseAPIController
    {
        private readonly StoreContext _context;
        private readonly UserManager<User> _userManager;

        private readonly IMapper _mapper;
        public ThemeController(StoreContext context, IMapper mapper, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("GetAllThemes")]
        public async Task<ActionResult<List<GetThemeDto>>> GetAllThemes()
        {
            var themes = await _context.Themes.Include(u => u.User).Include(c => c.Course).ThenInclude(y => y.Year).Include(c => c.Course).ThenInclude(s => s.StudyProgram).Include(m=>m.Messages).ThenInclude(u=>u.User).ToListAsync();

            return themes.Select(c => _mapper.Map<GetThemeDto>(c)).ToList();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<List<GetThemeDto>>> CreateTheme(CreateThemeDto newTheme)
        {
            var user = await _userManager.FindByNameAsync(User!.Identity!.Name!);
            var theme = _mapper.Map<Theme>(newTheme);
            theme.UserId = user.Id;

            //POGLEDATI
            theme.User = user;

            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == newTheme.CourseId);
            if (course != null)
            {
                theme.Course = course;
                theme.CourseId = newTheme.CourseId;
            }

            //nema poente jer themeDto nema kurs (ne dozvoljava jer i kurs ima teme pa se pravi ciklus)
            //nekako ucitati kurs ako postoji?
            // theme.Course=_context.Courses.FirstOrDefault<Course>(c=>c.Id==newTheme.CourseId);
            _context.Themes.Add(theme);
            await _context.SaveChangesAsync();
            var themes = await _context.Themes.Include(u => u.User).Include(c => c.Course).ThenInclude(y => y.Year).Include(c => c.Course).ThenInclude(s => s.StudyProgram).Include(m=>m.Messages).ThenInclude(u=>u.User).ToListAsync();

            return themes.Select(c => _mapper.Map<GetThemeDto>(c)).ToList();

        }



        [Authorize]
        [HttpPost("CreateMessage")]
        public async Task<ActionResult<List<GetMessageDto>>> CreateMessage(CreateMessageDto newMessage)
        {
            var creator = await _userManager.FindByNameAsync(User!.Identity!.Name!);
            var message = _mapper.Map<Message>(newMessage);
            message.UserId = creator.Id;
            message.User = creator;

            var theme = await _context.Themes.FirstOrDefaultAsync(t => t.Id == newMessage.ThemeId);
            if (theme != null)
            {
                message.Theme = theme;
                message.ThemeId = newMessage.ThemeId;
            }
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();


            var messages = await _context.Messages.Include(u => u.User).Include(t=>t.Theme).ToListAsync();

            return messages.Select(c => _mapper.Map<GetMessageDto>(c)).ToList();
        }

        [HttpGet("GetAllMessages")]
        public async Task<ActionResult<List<GetMessageDto>>> GetAllMessages()
        {
            var messages = await _context.Messages.Include(u => u.User).Include(t=>t.Theme).ToListAsync();

            return messages.Select(c => _mapper.Map<GetMessageDto>(c)).ToList();
        }
    }
}