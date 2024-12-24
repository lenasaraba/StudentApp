using API.Entities;

namespace API.DTOs
{
    public class CreateThemeDto
    {

        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime Date { get; set; }
        public int? CourseId { get; set; }

    }
}