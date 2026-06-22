using TodoApp.DTOs.TodoDtos;

namespace TodoApp.Services.Interfaces
{
    public interface ITodoService
    {
        Task<IEnumerable<TodoResponseDto>> GetAllTodosAsync(Guid userId);
        Task<TodoResponseDto?> GetTodoByIdAsync(Guid id, Guid userId);
        Task<TodoResponseDto> CreateTodoAsync(Guid userId, CreateTodoDto dto);
        Task<TodoResponseDto?> UpdateTodoAsync(Guid id, Guid userId, UpdateTodoDto dto);
        Task<bool> DeleteTodoAsync(Guid id, Guid userId);
    }
}

