using System.Diagnostics.CodeAnalysis;
using TodoApp.DTOs.TagDtos;
using TodoApp.Models;

namespace TodoApp.DTOs.TodoDtos
{
    public class TodoResponseDto
    {
        public required int Id { get; init; }
        public required string Title { get; init; }
        public string? Description { get; init; }
        public DateTime? DueDate { get; init; }
        public required bool IsCompleted { get; init; }
        public required Priority Priority { get; init; }
        public required DateTime CreatedAt { get; init; }
        public DateTime? UpdatedAt { get; init; }
        public List<TagResponseDto> Tags { get; init; } = [];

        [SetsRequiredMembers]
        public TodoResponseDto(Todo todo)
        {
            Id = todo.Id;
            Title = todo.Title;
            Description = todo.Description;
            DueDate = todo.DueDate;
            IsCompleted = todo.IsCompleted;
            Priority = todo.Priority;
            CreatedAt = todo.CreatedAt;
            UpdatedAt = todo.UpdatedAt;
            Tags = (todo.Tags ?? []).Select(tag => new TagResponseDto(tag)).ToList();
        }
    }
}
