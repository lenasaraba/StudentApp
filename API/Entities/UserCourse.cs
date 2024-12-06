using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserCourse
    {
        public int UserId { get; set; } // FK na User (IdentityUser)
        public User? User { get; set; }

        public int CourseId { get; set; } // FK na Course
        public Course? Course { get; set; }
    }
}