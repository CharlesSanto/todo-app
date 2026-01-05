using TodoApp.DTOs.UserDtos;
using TodoApp.Repository.Interfaces;
using TodoApp.Services.Interfaces;

namespace TodoApp.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<UserResponseDto?> GetUserByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<UserResponseDto?> GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public Task<UserResponseDto> CreateUserAsync(CreateUserDto createUserDto)
        {
            throw new NotImplementedException();
        }

        public Task<UserResponseDto?> UpdateUserAsync(int id, UpdateUserDto updateUserDto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteUserAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
