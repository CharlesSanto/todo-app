using TodoApp.Models;

namespace TodoApp.Repository.Interfaces
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllTodosAsync(int userId);
        Task<Todo?> GetTodoByIdAsync(int id, int userId);
        Task<Todo> CreateTodoAsync(Todo todo);
        Task<Todo?> UpdateTodoAsync(Todo todo);
        Task<bool> DeleteTodoAsync(int id, int userId);
    }
}
