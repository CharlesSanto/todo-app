using System.Diagnostics.CodeAnalysis;
using TodoApp.Models;

namespace TodoApp.DTOs.TagDtos
{
    public class TagResponseDto
    {
        public required int Id { get; set; }
        public required string Name { get; set; }

        [SetsRequiredMembers]
        public TagResponseDto(Tag tag)
        {
            Id = tag.Id;
            Name = tag.Name;
        }
    }
}
