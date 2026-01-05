using TodoApp.DTOs.TodoDtos;

namespace TodoApp.Services.Interfaces
{
    public interface ITodoService
    {
        Task<IEnumerable<TodoResponseDto>> GetAllTodosAsync(int userId);
        Task<TodoResponseDto?> GetTodoByIdAsync(int id, int userId);
        Task<TodoResponseDto> CreateTodoAsync(int userId, CreateTodoDto dto);
        Task<TodoResponseDto?> UpdateTodoAsync(int id, int userId, UpdateTodoDto dto);
        Task<bool> DeleteTodoAsync(int id, int userId);
    }
}

