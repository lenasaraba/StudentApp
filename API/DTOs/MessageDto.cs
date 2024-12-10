namespace API.DTOs
{
    public class MessageDto
    {
        public string Content { get; set; }=string.Empty;
        public DateTime CreationDate { get; set; }
        public int? UserId { get; set; }

    }
}