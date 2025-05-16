namespace PumpApi.Models
{
    public class UpdatePumpDto
    {
        public int Id { get; set; }
        public string PumpName { get; set; }
        public double? MaxPressure { get; set; }
        public double? LiquidTemperatureCelsius { get; set; }
        public double? WeightInKilograms { get; set; }
        public string PumpDescription { get; set; }
        public string ImageUrlPath { get; set; }
        public decimal PriceInRubles { get; set; }
        public int MotorForeignKey { get; set; }
        public int HousingMaterialForeignKey { get; set; }
        public int WheelMaterialForeignKey { get; set; }
    }
}
