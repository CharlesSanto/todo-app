namespace TodoApp.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public required string Name { get; set; }   

        public required int UserId { get; set; }
        public User User { get; set; } = null!;

        public ICollection<Todo> Todos { get; set; } = new List<Todo>();

    }
}
