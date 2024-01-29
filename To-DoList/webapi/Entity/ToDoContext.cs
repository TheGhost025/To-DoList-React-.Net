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
    }
}
