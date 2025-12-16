using Microsoft.AspNetCore.Diagnostics;
using Residencial.GastosAPI.Models.Errors;
using System.Net;

namespace Residencial.GastosAPI.Middlewares;

public static class ExceptionMiddlewareExtensions
{
    public static void ConfigureExceptionHandler(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(appError =>
        {
            appError.Run(async context =>
            {
                context.Response.ContentType = "application/json";

                var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                if (contextFeature is not null)
                {
                    var exception = contextFeature.Error;

                    context.Response.StatusCode = exception switch
                    {
                        ArgumentException => (int)HttpStatusCode.BadRequest,
                        InvalidOperationException => (int)HttpStatusCode.Conflict,
                        KeyNotFoundException => (int)HttpStatusCode.NotFound,
                        _ => (int)HttpStatusCode.InternalServerError
                    };

                    await context.Response.WriteAsync(new ErroDetails()
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = exception.Message
                    }.ToString());
                }
            });
        });
    }
}
