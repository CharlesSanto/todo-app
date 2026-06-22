using TodoApp.Models;

namespace TodoApp.Repository.Interfaces
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllTodosAsync(Guid userId);
        Task<Todo?> GetTodoByIdAsync(Guid id, Guid userId);
        Task<Todo> CreateTodoAsync(Todo todo);
        Task<Todo> UpdateTodoAsync(Todo todo);
        Task DeleteTodoAsync(Todo todo);
    }
}
