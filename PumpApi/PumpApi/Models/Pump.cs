using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PumpApi.Models
{

    public class Pump
    {
        [Key]
        [Column("id")]
        public int PumpId { get; set; }

        [Column("name")]
        public string PumpName { get; set; }

        [Column("max_pressure_bar")]
        public double MaxPressure { get; set; }

        [Column("liquid_temp_c")]
        public double LiquidTemperatureCelsius { get; set; }

        [Column("weight_kg")]
        public double WeightInKilograms { get; set; }

        [Column("description")]
        public string PumpDescription { get; set; }

        [Column("image_url")]
        public string ImageUrlPath { get; set; }

        [Column("price_rub")]
        public decimal PriceInRubles { get; set; }

        [Column("motor_id")]
        public int MotorForeignKey { get; set; }

        [ForeignKey("MotorForeignKey")]
        public virtual Motor MotorDetails { get; set; }

        [Column("housing_material_id")]
        public int HousingMaterialForeignKey { get; set; }

        [ForeignKey("HousingMaterialForeignKey")]
        public virtual Material HousingMaterialDetails { get; set; }

        [Column("wheel_material_id")]
        public int WheelMaterialForeignKey { get; set; }

        [ForeignKey("WheelMaterialForeignKey")]
        public virtual Material WheelMaterialDetails { get; set; }
    }

}
