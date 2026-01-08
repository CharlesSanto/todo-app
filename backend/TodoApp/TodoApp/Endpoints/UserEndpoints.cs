using TodoApp.DTOs.UserDtos;
using TodoApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Validators.UserValidators;

namespace TodoApp.Endpoints
{
    public static class UserEndpoints
    {
        public static WebApplication MapUserEndpoints(this WebApplication app)
        {
            var mapGroup = app.MapGroup("/users").WithTags("Users").RequireAuthorization();

            mapGroup.MapGet("/me", async (int id, IUserService service) =>
            {
                var user = await service.GetUserByIdAsync(id);

                return user is not null
                    ? Results.Ok(user)
                    : Results.NotFound();
            });

            mapGroup.MapPost("/", async (CreateUserDto dto, IUserService service, CreateUserDtoValidator validator) =>
            {
                try
                {
                    var validation = await validator.ValidateAsync(dto);

                    if (!validation.IsValid)
                        return Results.ValidationProblem(validation.ToDictionary());

                    var createUser = await service.CreateUserAsync(dto);

                    return Results.Created($"/users/{createUser.Id}", createUser);
                } 
                catch (InvalidOperationException ex)
                {
                    return Results.Conflict(new { message = ex.Message });
                }
            }).AllowAnonymous();

            mapGroup.MapPatch("/{id}", async (UpdateUserDto dto, IUserService service, int id, UpdateUserValidator validator) =>
            {
                try
                {
                    var validation = await validator.ValidateAsync(dto);

                    if (!validation.IsValid)
                        return Results.ValidationProblem(validation.ToDictionary());

                    var updatedUser = await service.UpdateUserAsync(id, dto);

                    return updatedUser is not null
                        ? Results.Ok(updatedUser)
                        : Results.NotFound(new { message = "Usuário não encontrado." });
                } 
                catch (InvalidOperationException ex)
                {
                    return Results.Conflict(new { message = ex.Message });
                }
            });
            mapGroup.MapDelete("/{id}", async (int id, IUserService service) =>
            {
                var deleted = await service.DeleteUserAsync(id);

                return deleted
                    ? Results.NoContent()
                    : Results.NotFound(new { message = "Usuário não encontrado" });
            });

            return app;
        }
    }
}
