using TodoApp.DTOs.TagDtos;

namespace TodoApp.Services.Interfaces
{
    public interface ITagService
    {
        Task<IEnumerable<TagResponseDto>> GetAllTagsAsync(int userId);
        Task<TagResponseDto?> GetTagByIdAsync(int tagId, int userId);
        Task<TagResponseDto?> GetTagByNameAsync(string tagName, int userId);
        Task<TagResponseDto> CreateTagAsync(int userId, CreateTagDto tagCreateDto);
        Task<TagResponseDto?> UpdateTagAsync(int userId, int tagId, UpdateTagDto tagUpdateDto);
        Task<bool> DeleteTagAsync(int tagId, int userId);
    }
}
