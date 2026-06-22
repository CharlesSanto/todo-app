using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<Tag>> GetAllTagsAsync(Guid userId)
        {
            return await _context.Tags
                .AsNoTracking()
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<Tag?> GetTagByIdAsync(Guid id, Guid userId)
        {
            return await _context.Tags
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        }

        public async Task<Tag?> GetTagByNameAsync(string name, Guid userId)
        {
            return await _context.Tags
                .FirstOrDefaultAsync(t => t.Name.ToLower() == name.ToLower() && t.UserId == userId);
        }

        public async Task<List<Tag>> GetByIdsAsync(IEnumerable<Guid> ids, Guid userId)
        {
            return await _context.Tags
                .Where(t => ids.Contains(t.Id) && t.UserId == userId)
                .ToListAsync();
        }

        public async Task<Tag> CreateTagAsync(Tag tag)
        {
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();

            return tag;
        }

        public async Task<Tag> UpdateTagAsync(Tag tag)
        {
            _context.Tags.Update(tag);
            await _context.SaveChangesAsync();

            return tag;
        }

        public async Task DeleteTagAsync(Tag tag)
        {
            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();
        }
    }
}
