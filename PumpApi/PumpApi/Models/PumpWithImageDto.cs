using System.ComponentModel.DataAnnotations;

namespace PumpApi.Models
{
    public class PumpWithImageDto
    {
        public int Id { get; set; }
        [Required]
        public string PumpName { get; set; }
        public double? MaxPressure { get; set; }
        public double? LiquidTemperatureCelsius { get; set; }
        public double? WeightInKilograms { get; set; }
        public string PumpDescription { get; set; }

        [Required]
        public decimal PriceInRubles { get; set; }
        [Required]
        public string MotorForeignKey { get; set; }
        [Required]
        public string HousingMaterialForeignKey { get; set; }
        [Required]
        public string WheelMaterialForeignKey { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}