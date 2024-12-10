using API.DTOs;
using API.Entities;

namespace API.Mapping
{
    public class AutoMapper:Profile
    {
        public AutoMapper()
        {
            CreateMap<Course, CourseDto>();
        }
    }
}