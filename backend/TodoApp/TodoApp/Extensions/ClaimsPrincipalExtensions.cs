using System.Security.Claims;

namespace TodoApp.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
         public static Guid GetUserId(this ClaimsPrincipal user)
        {
            var id = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (Guid.TryParse(id, out var userId))
            {
                return userId;
            }

            throw new UnauthorizedAccessException("ID do usuário não encontrado no token.");
        }
    }
}
