namespace TodoApp.DTOs.UserDtos
{
    public class CreateUserDto
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string PasswordConfirmed { get; set; }
    }
}
