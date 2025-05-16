namespace PumpApi.Models
{
    public class PumpDto
    {
        public string PumpName { get; set; }
        public double? MaxPressure { get; set; }
        public double? LiquidTemperatureCelsius { get; set; }
        public double? WeightInKilograms { get; set; }
        public string PumpDescription { get; set; }
        public string ImageUrlPath { get; set; }
        public decimal PriceInRubles { get; set; }
        public string MotorForeignKey { get; set; }
        public string HousingMaterialForeignKey { get; set; }
        public string WheelMaterialForeignKey { get; set; }
    }
}
