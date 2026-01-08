using TodoApp.Services.Interfaces;
using TodoApp.DTOs.TagDtos;
using TodoApp.Validators.TagValidators;

namespace TodoApp.Endpoints
{
    public static class TagEndpoints
    {
        public static WebApplication MapTagEndpoints(this WebApplication app)
        {
            var mapGroup = app.MapGroup("/tags").WithTags("Tags").RequireAuthorization();

            mapGroup.MapGet("/", async (int userId, ITagService tagService) =>
            {
                var tags = await tagService.GetAllTagsAsync(userId);

                return Results.Ok(tags);
            });

            mapGroup.MapPost("/", async (int userId, CreateTagDto tagCreateDto, ITagService tagService, CreateTagDtoValidator validator) =>
            {

                try
                {
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

            mapGroup.MapPatch("/{tagId:int}", async (int userId, int tagId, UpdateTagDto tagUpdateDto, ITagService tagService, UpdateTagDtoValidator validator) =>
            {
                var validationResult = await validator.ValidateAsync(tagUpdateDto);

                if (!validationResult.IsValid)
                    return Results.BadRequest(validationResult.ToDictionary());

                var updatedTag = await tagService.UpdateTagAsync(userId, tagId, tagUpdateDto);

                return updatedTag is not null 
                    ? Results.Ok(updatedTag) 
                    : Results.NotFound();
            });

            mapGroup.MapDelete("/{tagId:int}", async (int userId, int tagId, ITagService tagService) =>
            {
                var deleted = await tagService.DeleteTagAsync(tagId, userId);

                return deleted 
                    ? Results.NoContent() 
                    : Results.NotFound();
            });

            return app;
        }
    }
}
