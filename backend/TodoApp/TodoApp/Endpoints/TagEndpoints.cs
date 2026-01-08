using TodoApp.Services.Interfaces;
using TodoApp.DTOs.TagDtos;
using TodoApp.Validators.TagValidators;
using System.Security.Claims;
using TodoApp.Extensions;

namespace TodoApp.Endpoints
{
    public static class TagEndpoints
    {
        public static WebApplication MapTagEndpoints(this WebApplication app)
        {
            var mapGroup = app.MapGroup("/tags").WithTags("Tags").RequireAuthorization();

            mapGroup.MapGet("/", async (ITagService tagService, ClaimsPrincipal user) =>
            {
                int userId = user.GetUserId();

                var tags = await tagService.GetAllTagsAsync(userId);

                return Results.Ok(tags);
            });

            mapGroup.MapPost("/", async (CreateTagDto tagCreateDto, ITagService tagService, CreateTagDtoValidator validator, ClaimsPrincipal user) =>
            {
                try
                {
                    int userId = user.GetUserId();

                    var validationResult = await validator.ValidateAsync(tagCreateDto);

                    if (!validationResult.IsValid)
                        return Results.ValidationProblem(validationResult.ToDictionary());

                    var createdTag = await tagService.CreateTagAsync(userId, tagCreateDto);
                    return Results.Created($"/tags/{createdTag.Id}", createdTag);
                }
                catch(InvalidOperationException ex)
                {
                    return Results.Conflict(new { message = ex.Message });
                }

                
            });

            mapGroup.MapPatch("/{tagId}", async (int tagId, UpdateTagDto tagUpdateDto, ITagService tagService, UpdateTagDtoValidator validator, ClaimsPrincipal user) =>
            {
                int userId = user.GetUserId();

                var validationResult = await validator.ValidateAsync(tagUpdateDto);

                if (!validationResult.IsValid)
                    return Results.ValidationProblem(validationResult.ToDictionary());

                var updatedTag = await tagService.UpdateTagAsync(userId, tagId, tagUpdateDto);

                return updatedTag is not null 
                    ? Results.Ok(updatedTag) 
                    : Results.NotFound(new { message = "Tag não encontrada." });
            });

            mapGroup.MapDelete("/{tagId}", async (int tagId, ITagService tagService, ClaimsPrincipal user) =>
            {
                int userId = user.GetUserId();

                var deleted = await tagService.DeleteTagAsync(tagId, userId);

                return deleted 
                    ? Results.NoContent() 
                    : Results.NotFound(new { message = "Tag não encontrada."});
            });

            return app;
        }
    }
}
