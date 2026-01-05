namespace TodoApp.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public required int UserId { get; set; }
        public User User { get; set; } = null!;
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public required bool IsCompleted { get; set; }
        public Priority Priority { get; set; } = Priority.None;
        public required DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public ICollection<Tag> Tags { get; set; } = new List<Tag>();

    }
}
