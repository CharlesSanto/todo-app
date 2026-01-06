using TodoApp.DTOs.TagDtos;
using TodoApp.Repository.Interfaces;
using TodoApp.Services.Interfaces;

namespace TodoApp.Services
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;

        public TagService(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public Task<IEnumerable<TagResponseDto>> GetAllTagsAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<TagResponseDto> GetTagByIdAsync(int tagId, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<TagResponseDto> GetTagByNameAsync(string name, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<TagResponseDto> CreateTagAsync(int userId, CreateTagDto tagCreateDto)
        {
            throw new NotImplementedException();
        }

        public Task<TagResponseDto> UpdateTagAsync(int userId, int tagId, UpdateTagDto tagUpdateDto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTagAsync(int tagId, int userId)
        {
            throw new NotImplementedException();
        }

    }
}
