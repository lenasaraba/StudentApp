using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class ProfessorsParams
    {
        public string SearchTerm { get; set; } = string.Empty;
        public string Program { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
    }
}
