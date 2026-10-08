
using EwanHolding.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EwanHolding.Api.Middlewares
{
    public class AdminEmailSetupMiddleware
    {
        private readonly RequestDelegate _next;

        public AdminEmailSetupMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(
            HttpContext context,
            EwanHoldingDbContext dbContext)
        {
            if (context.User.Identity?.IsAuthenticated != true)
            {
                await _next(context);
                return;
            }

            var adminIdValue =
                context.User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? context.User.FindFirstValue("sub");

            if (!int.TryParse(adminIdValue, out var adminId))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsJsonAsync(new
                {
                    message = "Invalid admin identity."
                });
                return;
            }

            var admin = await dbContext.Admins
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == adminId);

            if (admin == null || !admin.IsActive)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsJsonAsync(new
                {
                    message = "Admin account is unavailable."
                });
                return;
            }

            var path = context.Request.Path;

            bool IsEndpoint(string endpoint) =>
                path.Equals(
                    endpoint,
                    StringComparison.OrdinalIgnoreCase);

            bool isEmailSetupEndpoint =
                IsEndpoint("/api/Admin/email-setup-status") ||
                IsEndpoint("/api/Admin/send-email-verification") ||
                IsEndpoint("/api/Admin/verify-email-code");

            if (!admin.IsEmailSetupCompleted)
            {
                if (!isEmailSetupEndpoint)
                {
                    context.Response.StatusCode = 403;
                    await context.Response.WriteAsJsonAsync(new
                    {
                        message = "Complete your email setup first."
                    });
                    return;
                }

                await _next(context);
                return;
            }

            bool isPasswordSetupEndpoint =
                IsEndpoint("/api/Admin/email-setup-status") ||
                IsEndpoint("/api/Admin/password-change-status") ||
                IsEndpoint("/api/Admin/change-password");

            if (admin.MustChangePassword && !isPasswordSetupEndpoint)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsJsonAsync(new
                {
                    message = "Change your temporary password first."
                });
                return;
            }

            await _next(context);
        }
    }
}
