using System.Diagnostics.CodeAnalysis;
using TodoApp.Models;

namespace TodoApp.DTOs.UserDtos
{
    public class UserResponseDto
    {
        public required Guid Id { get; init; }
        public required string Name { get; init; }
        public required string Email { get; init; }

        [SetsRequiredMembers]
        public UserResponseDto(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Email = user.Email;
        }
    }
}
