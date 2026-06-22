using TodoApp.DTOs.UserDtos;
using TodoApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Validators.UserValidators;
using System.Security.Claims;
using TodoApp.Extensions;

namespace TodoApp.Endpoints
{
    public static class UserEndpoints
    {
        public static WebApplication MapUserEndpoints(this WebApplication app)
        {
            var mapGroup = app.MapGroup("/users").WithTags("Users").RequireAuthorization();

            mapGroup.MapGet("/me", async (IUserService service, ClaimsPrincipal user) =>
            {
                Guid userId = user.GetUserId();

                var userFound = await service.GetUserByIdAsync(userId);

                return userFound is not null
                    ? Results.Ok(userFound)
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

            mapGroup.MapPatch("/", async (UpdateUserDto dto, IUserService service, UpdateUserValidator validator, ClaimsPrincipal user) =>
            {
                try
                {
                    Guid userId = user.GetUserId();

                    var validation = await validator.ValidateAsync(dto);

                    if (!validation.IsValid)
                        return Results.ValidationProblem(validation.ToDictionary());

                    var updatedUser = await service.UpdateUserAsync(userId, dto);

                    return updatedUser is not null
                        ? Results.Ok(updatedUser)
                        : Results.NotFound(new { message = "Usuário não encontrado." });
                } 
                catch (InvalidOperationException ex)
                {
                    return Results.Conflict(new { message = ex.Message });
                }
            });
            mapGroup.MapDelete("/", async (IUserService service, ClaimsPrincipal user) =>
            {
                Guid userId = user.GetUserId();

                var deleted = await service.DeleteUserAsync(userId);

                return deleted
                    ? Results.NoContent()
                    : Results.NotFound(new { message = "Usuário não encontrado." });
            });

            return app;
        }
    }
}
