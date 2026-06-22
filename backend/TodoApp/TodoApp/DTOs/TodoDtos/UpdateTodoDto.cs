using TodoApp.Models;

namespace TodoApp.DTOs.TodoDtos
{
    public class UpdateTodoDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public bool? IsCompleted { get; set; }
        public Priority? Priority { get; set; }
        public List<Guid>? TagIds { get; set; } = new List<Guid>();

    }
}
