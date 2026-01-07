using TodoApp.DTOs.TodoDtos;
using TodoApp.Repository.Interfaces;
using TodoApp.Services.Interfaces;
using TodoApp.Models;

namespace TodoApp.Services
{
    public class TodoService : ITodoService
    {

        private readonly ITodoRepository _todoRepository;

        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<IEnumerable<TodoResponseDto>> GetAllTodosAsync(int userId)
        {
            var todos = await _todoRepository.GetAllTodosAsync(userId);

            return todos.Select(todo => new TodoResponseDto(todo));
        }

        public async Task<TodoResponseDto?> GetTodoByIdAsync(int id, int userId)
        {
            var todo = await _todoRepository.GetTodoByIdAsync(id, userId);

            if (todo == null) return null;

            return new TodoResponseDto(todo);
        }

        public async Task<TodoResponseDto> CreateTodoAsync(int userId, CreateTodoDto dto)
        {
            var newTodo = new Todo
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                Priority = dto.Priority,
                IsCompleted = false,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            return new TodoResponseDto(await _todoRepository.CreateTodoAsync(newTodo));
        }

        public async Task<TodoResponseDto?> UpdateTodoAsync(int id, int userId, UpdateTodoDto dto)
        {
            var todo = await _todoRepository.GetTodoByIdAsync(id, userId);

            if (todo == null) return null;

            if (!string.IsNullOrWhiteSpace(dto.Title))
            {
                todo.Title = dto.Title;
            }

            if (!string.IsNullOrWhiteSpace(dto.Description))
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

        public async Task<bool> DeleteTodoAsync(int id, int userId)
        {
            var todo = await _todoRepository.GetTodoByIdAsync(id, userId);
            if (todo == null) return false;

            await _todoRepository.DeleteTodoAsync(todo);

            return true;
        }
    }
}
