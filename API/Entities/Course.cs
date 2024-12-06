using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }=string.Empty;
        public string Description { get; set; }=string.Empty;
        public string Category { get; set; }=string.Empty;
        public List<CourseMaterial>? Materials { get; set; }
    }
}