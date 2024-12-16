using API.DTOs;
using API.Entities;

namespace API.Mapping
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Course, CourseDto>();
            CreateMap<CourseMaterial, CourseMaterialDto>();
            CreateMap<Theme, ThemeDto>();
            CreateMap<User, UserDto>();
            CreateMap<UserCourse, UserCourseDto>();
            CreateMap<ProfessorCourse, ProfessorCourseDto>();

        }
    }
}