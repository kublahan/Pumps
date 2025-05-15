using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PumpApi.Models
{
    public class Motor
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; }

        [Column("powerkw")]
        public decimal PowerKw { get; set; }

        [Column("current_a")]
        public decimal CurrentA { get; set; }

        [Column("speed_rpm")]
        public int SpeedRpm { get; set; }

        [Column("motor_type")]
        public string MotorType { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("price_rub")]
        public decimal PriceRub { get; set; }
    }
}