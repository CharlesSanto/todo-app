namespace TodoApp.DTOs.UserDtos
{
    public class UpdateUserDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? PasswordConfirmed { get; set; }
    }
}
