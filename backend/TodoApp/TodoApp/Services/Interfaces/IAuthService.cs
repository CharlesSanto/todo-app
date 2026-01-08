using TodoApp.DTOs.AuthDtos;

namespace TodoApp.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string?> LoginAsync(LoginDTO dto);
    }
}
