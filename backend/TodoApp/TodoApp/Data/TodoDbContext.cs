using Microsoft.EntityFrameworkCore;
using TodoApp.Models;

namespace TodoApp.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) 
            : base(options)
        {
        }
        public DbSet<Todo> Todos { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User - Todo one-to-many relationship
            modelBuilder.Entity<Todo>()
                .HasOne(t => t.User)
                .WithMany(u => u.Todos)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - Tag one-to-many relationship
            modelBuilder.Entity<Tag>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tags)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Todo - Tag many-to-many relationship
            modelBuilder.Entity<Todo>()
                .HasMany(t => t.Tags)
                .WithMany(t => t.Todos)
                .UsingEntity(j => j.ToTable("TodoTags"));

            // Unique constraints
            modelBuilder.Entity<Tag>()
                .HasIndex(t => new {t.UserId, t.Name})
                .IsUnique();

            // Unique constraint on User Email
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

        }
    }
}
