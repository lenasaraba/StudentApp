using API.Entities;

namespace API.DTOs
{
    public class ThemeDto
    {

    public string Title { get; set; }=string.Empty;

    public string? Description { get; set; }

    public DateTime Date { get; set; }
    public int? UserId { get; set; } 

    public List<MessageDto>? Messages { get; set; }

    }
}