namespace API.RequestHelpers
{
    //ovdje naslijediti pagination params kad to bude trebalo
    public class CourseParams{
    public string Type { get; set; }="all";
    
    public string SearchTerm { get; set; }=string.Empty;
    public List<string> StudyPrograms { get; set; } = new();
    public List<string> Years { get; set; } = new();
    }
}