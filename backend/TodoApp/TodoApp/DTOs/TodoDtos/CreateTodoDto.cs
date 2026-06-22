using TodoApp.Models;

namespace TodoApp.DTOs.TodoDtos
{
    public class CreateTodoDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public Priority Priority { get; set; } = Priority.None;
        public List<Guid> TagIds { get; set; } = new List<Guid>();

    }
}
