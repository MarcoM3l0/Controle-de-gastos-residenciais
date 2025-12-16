using Microsoft.AspNetCore.Diagnostics;
using Residencial.GastosAPI.Models.Errors;
using System.Net;

namespace Residencial.GastosAPI.Middlewares;

/// <summary>
/// Middleware responsável por tratar exceções globais na aplicação.
/// Lança pela aplicação e retorna respostas.
/// padronizada em formato JSON.
/// </summary>
public static class ExceptionMiddlewareExtensions
{
    /// <summary>
    /// Configura o tratamento global de exceções na aplicação.
    /// </summary>
    /// <param name="app"></param>
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
