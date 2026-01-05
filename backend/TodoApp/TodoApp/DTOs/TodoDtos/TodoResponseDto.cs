using TodoApp.DTOs.TagDtos;
using TodoApp.Models;

namespace TodoApp.DTOs.TodoDtos
{
    public class TodoResponseDto
    {
        public required int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public required bool IsCompleted { get; set; }
        public required Priority Priority { get; set; }
        public required DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<TagResponseDto> Tags { get; set; } = [];
    }
}
