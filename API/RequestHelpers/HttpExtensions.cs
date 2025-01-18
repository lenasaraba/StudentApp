using System.Text.Json;

namespace API.RequestHelpers
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
        {
            var options=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};

             response.Headers.Append("pagination", JsonSerializer.Serialize(metaData, options));
             response.Headers.Append("Access-Control-Expose-Headers", "pagination");
        }
    }
}