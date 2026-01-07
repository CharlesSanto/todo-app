using TodoApp.Repository.Interfaces;
using TodoApp.Models;
using TodoApp.Data;
using Microsoft.EntityFrameworkCore;

namespace TodoApp.Repository
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoDbContext _context;

        public TodoRepository(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Todo>> GetAllTodosAsync(int userId)
        {
            return await _context.Todos
                .AsNoTracking()
                .Include(t => t.Tags)
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<Todo?> GetTodoByIdAsync(int id, int userId)
        {
            return await _context.Todos
                .Include(t => t.Tags)
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        }

        public async Task<Todo?> GetTodoByNameAsync(string title, int userId)
        {
            return await _context.Todos
                .Include(t => t.Tags)
                .FirstOrDefaultAsync(t => t.Title == title && t.UserId == userId);
        }

        public async Task<Todo> CreateTodoAsync(Todo todo)
        {
            await _context.Todos.AddAsync(todo);
            await _context.SaveChangesAsync();

            return todo;
        }

        public async Task<Todo> UpdateTodoAsync(Todo todo)
        {
            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();

            return todo;
        }

        public async Task DeleteTodoAsync(Todo todo)
        {
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
        }

    }
}
