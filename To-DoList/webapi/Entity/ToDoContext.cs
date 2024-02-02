using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Entity
{
    public class ToDoContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<ToDo> ToDo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer("Server=MAZENAHMED;Database=ToDo;Trusted_Connection=True;Encrypt=False");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDo>()
                .HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.user_id)
                .IsRequired(false);

            // Add other configurations if needed

            base.OnModelCreating(modelBuilder);
        }
    }
}
