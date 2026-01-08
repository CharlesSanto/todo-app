using System.Security.Claims;

namespace TodoApp.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
         public static int GetUserId(this ClaimsPrincipal user)
        {
            var id = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (int.TryParse(id, out var userId))
            {
                return userId;
            }

            throw new UnauthorizedAccessException("ID do usuário não encontrado no token.");
        }
    }
}
