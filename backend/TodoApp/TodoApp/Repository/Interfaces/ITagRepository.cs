using TodoApp.Models;

namespace TodoApp.Repository.Interfaces
{
    public interface ITagRepository
    {
        Task<IEnumerable<Tag>> GetAllTagsAsync(int userId);
        Task<Tag?> GetTagByIdAsync(int id, int userId);
        Task<Tag> CreateTagAsync(Tag tag);
        Task UpdateTagAsync(Tag tag);
        Task DeleteTagAsync(Tag tag);
    }
}
