namespace TodoApp.Models
{
    public class Tag
    {
        public Guid Id { get; set; } = Guid.CreateVersion7();
        public required string Name { get; set; }   

        public required Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public ICollection<Todo> Todos { get; set; } = new List<Todo>();

    }
}
