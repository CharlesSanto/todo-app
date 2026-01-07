using TodoApp.DTOs.UserDtos;

namespace TodoApp.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserResponseDto?> GetUserByIdAsync(int id);
        Task<UserResponseDto?> GetUserByEmailAsync(string email);
        Task<UserResponseDto> CreateUserAsync(CreateUserDto createUserDto);
        Task<UserResponseDto?> UpdateUserAsync(int id, UpdateUserDto updateUserDto);
        Task<bool> DeleteUserAsync(int id);
    }
}
