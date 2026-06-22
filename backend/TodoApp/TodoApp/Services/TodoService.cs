using TodoApp.DTOs.TodoDtos;
using TodoApp.Repository.Interfaces;
using TodoApp.Services.Interfaces;
using TodoApp.Models;

namespace TodoApp.Services
{
    public class TodoService : ITodoService
    {

        private readonly ITodoRepository _todoRepository;
        private readonly ITagRepository _tagRepository;

        public TodoService(ITodoRepository todoRepository, ITagRepository tagRepository)
        {
            _todoRepository = todoRepository;
            _tagRepository = tagRepository;
        }

        public async Task<IEnumerable<TodoResponseDto>> GetAllTodosAsync(Guid userId)
        {
            var todos = await _todoRepository.GetAllTodosAsync(userId);

            return todos.Select(todo => new TodoResponseDto(todo));
        }

        public async Task<TodoResponseDto?> GetTodoByIdAsync(Guid id, Guid userId)
        {
            var todo = await _todoRepository.GetTodoByIdAsync(id, userId);

            if (todo == null) return null;

            return new TodoResponseDto(todo);
        }

        public async Task<TodoResponseDto> CreateTodoAsync(Guid userId, CreateTodoDto dto)
        {
            var newTodo = new Todo
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                Priority = dto.Priority,
                IsCompleted = false,
                UserId = userId,
                Tags = await _tagRepository.GetByIdsAsync(dto.TagIds, userId),
                CreatedAt = DateTime.UtcNow
            };

            return new TodoResponseDto(await _todoRepository.CreateTodoAsync(newTodo));
        }

        public async Task<TodoResponseDto?> UpdateTodoAsync(Guid id, Guid userId, UpdateTodoDto dto)
        {
            var todo = await _todoRepository.GetTodoByIdAsync(id, userId);

            if (todo == null) return null;

            if (!string.IsNullOrWhiteSpace(dto.Title))
            {
                todo.Title = dto.Title;
            }

            if (dto.Description != null)
            {
                todo.Description = dto.Description;
            }

            if (dto.DueDate.HasValue)
            {
                todo.DueDate = dto.DueDate.Value;
            }

            if (dto.IsCompleted.HasValue)
            {
                todo.IsCompleted = dto.IsCompleted.Value;
            }

            if (dto.Priority.HasValue)
            {
                todo.Priority = dto.Priority.Value;
            }

            todo.UpdatedAt = DateTime.UtcNow;

            return new TodoResponseDto(await _todoRepository.UpdateTodoAsync(todo));

        }

        public async Task<bool> DeleteTodoAsync(Guid id, Guid userId)
        {
            var todo = await _todoRepository.GetTodoByIdAsync(id, userId);
            if (todo == null) return false;

            await _todoRepository.DeleteTodoAsync(todo);

            return true;
        }
    }
}
