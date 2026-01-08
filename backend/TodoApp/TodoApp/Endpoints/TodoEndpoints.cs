using TodoApp.DTOs.TodoDtos;
using TodoApp.Services.Interfaces;
using TodoApp.Validators.TodoValidators;
using System.Security.Claims;
using TodoApp.Extensions;

namespace TodoApp.Endpoints
{
    public static class TodoEndpoints
    {
        public static WebApplication MapTodoEndpoints(this WebApplication app)
        {
            var mapGroup = app.MapGroup("/todos").WithTags("Todos").RequireAuthorization();

            mapGroup.MapGet("/", async (ITodoService service, ClaimsPrincipal user) =>
            {
                int userId = user.GetUserId();

                var todos = await service.GetAllTodosAsync(userId);

                return Results.Ok(todos);
            });

            mapGroup.MapGet("/{id}", async (int id, ITodoService service, ClaimsPrincipal user) =>
            {
                int userId = user.GetUserId();

                var todo = await service.GetTodoByIdAsync(id, userId);

                return todo is not null
                    ? Results.Ok(todo)
                    : Results.NotFound(new { message = "Todo não encontrado."});
            });

            mapGroup.MapPost("/", async (ITodoService service, CreateTodoDto dto, CreateTodoDtoValidator validator, ClaimsPrincipal user) =>
            {
                int userId = user.GetUserId();

                var validation = await validator.ValidateAsync(dto);

                if (!validation.IsValid)
                    return Results.ValidationProblem(validation.ToDictionary());

                var newTodo = await service.CreateTodoAsync(userId, dto);

                return Results.Created($"/todos/{newTodo.Id}", newTodo);
            });

            mapGroup.MapPatch("/{id}", async (int id, ITodoService service, UpdateTodoDto dto, UpdateTodoDtoValidator validator, ClaimsPrincipal user) =>
            {
                int userId = user.GetUserId();

                var validation = await validator.ValidateAsync(dto);

                if (!validation.IsValid)
                    return Results.ValidationProblem(validation.ToDictionary());

                var updatedTodo = await service.UpdateTodoAsync(id, userId, dto);

                return updatedTodo is not null
                    ? Results.Ok(updatedTodo)
                    : Results.NotFound(new { message = "Todo não encontrado."});

            });

            mapGroup.MapDelete("/{id}", async (int id, ITodoService service, ClaimsPrincipal user) =>
            {
                int userId = user.GetUserId();

                var deleted = await service.DeleteTodoAsync(id, userId);

                return deleted
                    ? Results.NoContent()
                    : Results.NotFound(new { message = "Todo não encontrado."});
            });

            return app;
        }
    }
}
