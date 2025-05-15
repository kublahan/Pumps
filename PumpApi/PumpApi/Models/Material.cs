using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PumpApi.Models
{
    public class Material
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }
}
