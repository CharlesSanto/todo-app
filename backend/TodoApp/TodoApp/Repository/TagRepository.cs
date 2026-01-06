using TodoApp.Data;
using TodoApp.Models;
using TodoApp.Repository.Interfaces;

namespace TodoApp.Repository
{
    public class TagRepository : ITagRepository
    {

        private readonly TodoDbContext _context;

        public TagRepository(TodoDbContext context)
        {
            _context = context;
        }

        public Task<IEnumerable<Tag>> GetAllTagsAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<Tag?> GetTagByIdAsync(int id, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<Tag?> GetTagByNameAsync(string name, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<Tag> CreateTagAsync(Tag tag)
        {
            throw new NotImplementedException();
        }

        public Task<Tag?> UpdateTagAsync(Tag tag)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTagAsync(int id, int userId)
        {
            throw new NotImplementedException();
        }
    }
}
