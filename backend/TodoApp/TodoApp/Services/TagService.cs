using TodoApp.DTOs.TagDtos;
using TodoApp.Repository.Interfaces;
using TodoApp.Services.Interfaces;
using TodoApp.Models;

namespace TodoApp.Services
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;

        public TagService(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<IEnumerable<TagResponseDto>> GetAllTagsAsync(int userId)
        {
            var tags = await _tagRepository.GetAllTagsAsync(userId);

            return tags.Select(tag => new TagResponseDto(tag));
        }

        public async Task<TagResponseDto?> GetTagByIdAsync(int tagId, int userId)
        {
            var tag =  await _tagRepository.GetTagByIdAsync(tagId, userId);

            if (tag == null) return null;

            return new TagResponseDto(tag);
        }

        public async Task<TagResponseDto?> GetTagByNameAsync(string tagName, int userId)
        {
            var tag = await _tagRepository.GetTagByNameAsync(tagName, userId);
            if (tag == null) return null;

            return new TagResponseDto(tag);
        }

        public async Task<TagResponseDto> CreateTagAsync(int userId, CreateTagDto tagCreateDto)
        {
            var existingTag = await _tagRepository.GetTagByNameAsync(tagCreateDto.Name, userId);

            if (existingTag != null)
            {
                return new TagResponseDto(existingTag);
            }

            var newTag = new Tag
            {
                Name = tagCreateDto.Name,
                UserId = userId
            };

            var tag = await  _tagRepository.CreateTagAsync(newTag);

            return new TagResponseDto(tag);
        }

        public async Task<TagResponseDto?> UpdateTagAsync(int userId, int tagId, UpdateTagDto tagUpdateDto)
        {
            var existingTag = await _tagRepository.GetTagByIdAsync(tagId, userId);

            if (existingTag == null) return null;

            if (!string.IsNullOrWhiteSpace(tagUpdateDto.Name) && tagUpdateDto.Name != existingTag.Name)
            {
                existingTag.Name = tagUpdateDto.Name;
            }

            var updatedTag = await _tagRepository.UpdateTagAsync(existingTag);

            return new TagResponseDto(updatedTag);
        }

        public async Task<bool> DeleteTagAsync(int tagId, int userId)
        {
            var tag = await _tagRepository.GetTagByIdAsync(tagId, userId);

            if (tag == null) return false;

            await _tagRepository.DeleteTagAsync(tag);
            return true;
        }

    }
}
