using TodoApp.Repository.Interfaces;
using TodoApp.Services.Interfaces;
using TodoApp.Security;

namespace TodoApp.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;
        private readonly IPasswordHasher _passwordHasher;

        public AuthService(IUserRepository userRepository, JwtService jwtService, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
        }

        public async Task<string?> LoginAsync(DTOs.AuthDtos.LoginDTO dto)
        {
            var user = await _userRepository.GetUserByEmailAsync(dto.Email);

            if (user == null || !_passwordHasher.VerifyPassword(dto.Password, user.PasswordHash))
            {
                return null;
            }

            return _jwtService.GenerateToken(user);
        }
    }
}
