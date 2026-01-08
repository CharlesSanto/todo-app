using TodoApp.DTOs.TodoDtos;
using TodoApp.Services.Interfaces;
using TodoApp.Validators.TodoValidators;

namespace TodoApp.Endpoints
{
    public static class TodoEndpoints
    {
        public static WebApplication MapTodoEndpoints(this WebApplication app)
        {
            var mapGroup = app.MapGroup("/todos").WithTags("Todos").RequireAuthorization();

            mapGroup.MapGet("/", async (int userId, ITodoService service) =>
            {
                var todos = await service.GetAllTodosAsync(userId);

                return Results.Ok(todos);
            });

            mapGroup.MapGet("/{id}", async (int id, int userId, ITodoService service) =>
            {
                var todo = await service.GetTodoByIdAsync(id, userId);

                return todo is not null
                    ? Results.Ok(todo)
                    : Results.NotFound();
            });

            mapGroup.MapPost("/", async (int userId, ITodoService service, CreateTodoDto dto, CreateTodoDtoValidator validator) =>
            {
                var validation = await validator.ValidateAsync(dto);

                if (!validation.IsValid)
                    return Results.ValidationProblem(validation.ToDictionary());

                var newTodo = await service.CreateTodoAsync(userId, dto);

                return Results.Created($"/todos/{newTodo.Id}", newTodo);
            });

            mapGroup.MapPatch("/{id}", async (int userId, int id, ITodoService service, UpdateTodoDto dto, UpdateTodoDtoValidator validator) =>
            {
                var validation = await validator.ValidateAsync(dto);

                if (!validation.IsValid)
                    return Results.ValidationProblem(validation.ToDictionary());

                var updatedTodo = await service.UpdateTodoAsync(id, userId, dto);

                return updatedTodo is not null
                    ? Results.Ok(updatedTodo)
                    : Results.NotFound(new { message = "Todo não encontrado"});

            });

            mapGroup.MapDelete("/{id}", async (int id, int userId, ITodoService service) =>
            {
                var deleted = await service.DeleteTodoAsync(id, userId);

                return deleted
                    ? Results.NoContent()
                    : Results.NotFound(new { message = "Todo não encontrado"});
            });

            return app;
        }
    }
}
