using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EwanHolding.Api.Filters
{
    public class ValidationFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            foreach (var argument in context.ActionArguments.Values)
            {
                if (argument == null) continue;
                var argumentType = argument.GetType();
                if (argumentType.IsPrimitive || argumentType.IsEnum || argumentType == typeof(string) || argument is IFormFile)
                    continue;

                var validatorType = typeof(IValidator<>).MakeGenericType(argumentType);
                var validator = context.HttpContext.RequestServices.GetService(validatorType) as IValidator;
                if (validator == null) continue;

                var result = await validator.ValidateAsync(new ValidationContext<object>(argument));
                if (!result.IsValid)
                {
                    var errors = result.Errors.GroupBy(e => e.PropertyName)
                        .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());
                    context.Result = new BadRequestObjectResult(new { errors });
                    return;
                }
            }
            await next();
        }
    }
}
