using TodoApp.Models;

namespace TodoApp.Repository.Interfaces
{
    public interface ITagRepository
    {
        Task<IEnumerable<Tag>> GetAllTagsAsync(Guid userId);
        Task<Tag?> GetTagByIdAsync(Guid id, Guid userId);
        Task<Tag?> GetTagByNameAsync(string name, Guid userId);
        Task<List<Tag>> GetByIdsAsync(IEnumerable<Guid> ids, Guid userId);
        Task<Tag> CreateTagAsync(Tag tag);
        Task<Tag> UpdateTagAsync(Tag tag);
        Task DeleteTagAsync(Tag tag);
    }
}
