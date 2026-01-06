using TodoApp.Models;

namespace TodoApp.Repository.Interfaces
{
    public interface ITagRepository
    {
        Task<IEnumerable<Tag>> GetAllTagsAsync(int userId);
        Task<Tag?> GetTagByIdAsync(int id, int userId);
        Task<Tag?> GetTagByNameAsync(string name, int userId);
        Task<Tag> CreateTagAsync(Tag tag);
        Task<Tag?> UpdateTagAsync(Tag tag);
        Task<bool> DeleteTagAsync(int id, int userId);
    }
}
