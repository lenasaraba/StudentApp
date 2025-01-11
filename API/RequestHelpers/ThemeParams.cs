namespace API.RequestHelpers
{
    public class ThemeParams
    {
        public string Type { get; set; } = "all";

        public string SearchTerm { get; set; } = string.Empty;
        public string ThemeStatus { get; set; }=string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}