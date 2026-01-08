using TodoApp.DTOs.AuthDtos;
using TodoApp.Services.Interfaces;

namespace TodoApp.Endpoints
{
    public static class AuthEndpoints
    {
        public static WebApplication MapAuthEndpoints(this WebApplication app)
        {
            app.MapPost("/login", async (LoginDTO dto, IAuthService service) =>
            {
                var token = await service.LoginAsync(dto);

                if (token is null)
                    return Results.Unauthorized();

                return Results.Ok(new { token });
            }).WithTags("Login");

            return app;
        }
    }
}
