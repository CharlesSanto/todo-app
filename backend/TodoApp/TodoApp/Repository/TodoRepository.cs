using TodoApp.Repository.Interfaces;
using TodoApp.Models;
using TodoApp.Data;

namespace TodoApp.Repository
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoDbContext _context;

        public TodoRepository(TodoDbContext context)
        {
            _context = context;
        }

        public Task<IEnumerable<Todo>> GetAllTodosAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<Todo?> GetTodoByIdAsync(int id, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<Todo> CreateTodoAsync(Todo todo)
        {
            throw new NotImplementedException();
        }

        public Task<Todo?> UpdateTodoAsync(Todo todo)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTodoAsync(int id, int userId)
        {
            throw new NotImplementedException();
        }

    }
}
