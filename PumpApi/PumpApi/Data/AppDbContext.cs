using Microsoft.EntityFrameworkCore;
using PumpApi.Models;

namespace PumpApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Material> Materials { get; set; }
        public DbSet<Motor> Motors { get; set; }
        public DbSet<Pump> Pumps { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Pump>()
                .HasOne(p => p.HousingMaterialDetails)
                .WithMany()
                .HasForeignKey(p => p.HousingMaterialForeignKey)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Pump>()
                .HasOne(p => p.WheelMaterialDetails)
                .WithMany()
                .HasForeignKey(p => p.WheelMaterialForeignKey)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Pump>()
                .HasOne(p => p.MotorDetails)
                .WithMany()
                .HasForeignKey(p => p.MotorForeignKey)
                .HasConstraintName("motor_id")
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}