using TodoApp.DTOs.TodoDtos;
using TodoApp.Repository.Interfaces;
using TodoApp.Services.Interfaces;

namespace TodoApp.Services
{
    public class TodoService : ITodoService
    {

        private readonly ITodoRepository _todoRepository;

        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public Task<IEnumerable<TodoResponseDto>> GetAllTodosAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<TodoResponseDto?> GetTodoByIdAsync(int id, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<TodoResponseDto> CreateTodoAsync(int userId, CreateTodoDto dto)
        {
            throw new NotImplementedException();
        }

        public Task<TodoResponseDto?> UpdateTodoAsync(int id, int userId, UpdateTodoDto dto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTodoAsync(int id, int userId)
        {
            throw new NotImplementedException();
        }
    }
}
