using TodoApp.Models;

namespace TodoApp.Repository.Interfaces
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllTodosAsync(int userId);
        Task<Todo?> GetTodoByIdAsync(int id, int userId);
        Task<Todo> CreateTodoAsync(Todo todo);
        Task UpdateTodoAsync(Todo todo);
        Task DeleteTodoAsync(Todo todo);
    }
}
