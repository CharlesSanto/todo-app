using TodoApp.Repository;
using TodoApp.Repository.Interfaces;
using TodoApp.Services;
using TodoApp.Services.Interfaces;

namespace TodoApp.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<ITodoRepository, TodoRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITagRepository, TagRepository>();
            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<ITodoService, TodoService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITagService, TagService>();
            return services;
        }
    }
}
