using TodoApp.DTOs.UserDtos;
using TodoApp.Repository.Interfaces;
using TodoApp.Services.Interfaces;
using TodoApp.Models;
using TodoApp.Security;

namespace TodoApp.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public UserService(IUserRepository userRepository, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<UserResponseDto?> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            return user == null ? null : new UserResponseDto(user);
        }

        public async Task<UserResponseDto?> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);

            return user == null ? null : new UserResponseDto(user);
        }

        public  async Task<UserResponseDto> CreateUserAsync(CreateUserDto createUserDto)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(createUserDto.Email);

            if (existingUser != null)
            {
                throw new InvalidOperationException("O e-mail informado já está em uso.");
            }

            var user = new User
            {
                Name = createUserDto.Name,
                Email = createUserDto.Email,
                PasswordHash = _passwordHasher.HashPassword(createUserDto.Password),
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _userRepository.CreateUserAsync(user);

            return new UserResponseDto(createdUser);
        }

        public async Task<UserResponseDto?> UpdateUserAsync(int id, UpdateUserDto updateUserDto)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            if (user == null)
            {
                return null;
            }

            if (!string.IsNullOrWhiteSpace(updateUserDto.Name))
            {
                user.Name = updateUserDto.Name;
            }

            if (!(string.IsNullOrWhiteSpace(updateUserDto.Email)) && updateUserDto.Email != user.Email)
            {
                var emailTaken = await _userRepository.GetUserByEmailAsync(updateUserDto.Email);

                if (emailTaken != null)
                {
                    throw new InvalidOperationException("O novo e-mail informado já está em uso.");
                }   

                user.Email = updateUserDto.Email;
            }

            if (!string.IsNullOrWhiteSpace(updateUserDto.Password))
            {
                user.PasswordHash = _passwordHasher.HashPassword(updateUserDto.Password);
            }

            user.UpdatedAt = DateTime.UtcNow;

            var updatedUser = await _userRepository.UpdateUserAsync(user);

            return new UserResponseDto(updatedUser);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            if (user == null) return false;

            await _userRepository.DeleteUserAsync(user);

            return true;
        }
    }
}
