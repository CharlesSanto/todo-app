using TodoApp.DTOs.TagDtos;

namespace TodoApp.Services.Interfaces
{
    public interface ITagService
    {
        Task<IEnumerable<TagResponseDto>> GetAllTagsAsync(Guid userId);
        Task<TagResponseDto?> GetTagByIdAsync(Guid tagId, Guid userId);
        Task<TagResponseDto> CreateTagAsync(Guid userId, CreateTagDto tagCreateDto);
        Task<TagResponseDto?> UpdateTagAsync(Guid userId, Guid tagId, UpdateTagDto tagUpdateDto);
        Task<bool> DeleteTagAsync(Guid tagId, Guid userId);
    }
}
