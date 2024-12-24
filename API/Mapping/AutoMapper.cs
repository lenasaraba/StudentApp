using API.DTOs;
using API.Entities;

namespace API.Mapping
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Course, CourseDto>();
            CreateMap<Course, GetThemeCourseDto>();
            CreateMap<CourseMaterial, CourseMaterialDto>();
            CreateMap<CreateThemeDto, Theme>();
            CreateMap<Theme, GetThemeDto>();
            CreateMap<User, UserDto>();
            CreateMap<UserCourse, UserCourseDto>();
            CreateMap<ProfessorCourse, ProfessorCourseDto>();
            CreateMap<CreateMessageDto, Message>();
            CreateMap<Message, GetMessageDto>();


        }
    }
}