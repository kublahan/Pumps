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

            // Настройка связей для Pump с Material (для корпуса и колеса)
            modelBuilder.Entity<Pump>()
                .HasOne(p => p.HousingMaterialDetails) // Используем навигационное свойство
                .WithMany()
                .HasForeignKey(p => p.HousingMaterialForeignKey) // Используем свойство внешнего ключа
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Pump>()
                .HasOne(p => p.WheelMaterialDetails) // Используем навигационное свойство
                .WithMany()
                .HasForeignKey(p => p.WheelMaterialForeignKey) // Используем свойство внешнего ключа
                .OnDelete(DeleteBehavior.Restrict);

            // Настройка связи для Pump с Motor
            modelBuilder.Entity<Pump>()
                .HasOne(p => p.MotorDetails) // Используем навигационное свойство
                .WithMany()
                .HasForeignKey(p => p.MotorForeignKey) // Используем свойство внешнего ключа
                .HasConstraintName("motor_id") // Название ограничения внешнего ключа в базе данных
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}