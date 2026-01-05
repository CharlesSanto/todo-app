namespace TodoApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public ICollection<Todo> Todos { get; set; } = new List<Todo>();
        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
