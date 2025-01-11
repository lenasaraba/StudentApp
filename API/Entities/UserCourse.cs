using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("UserCourse")]
    public class UserCourse
    {
        public int Id { get; set; }
        public int UserId { get; set; } // FK na User (IdentityUser)
        public User? User { get; set; }
        public int CourseId { get; set; } // FK na Course
        public Course? Course { get; set; }
        public DateTime EnrollDate { get; set; }
        public DateTime? WithdrawDate { get; set; }
    }
}