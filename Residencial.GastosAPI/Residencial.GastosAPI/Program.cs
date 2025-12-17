/*
 Sistema de Controle de Gastos Residenciais
 --------------------------------------------------
 Este sistema foi desenvolvido seguindo
 regras de negócio específicas como:

 - Pessoas menores de idade não podem registrar receitas;
 - Categorias só podem ser usadas de acordo com sua finalidade;
 - Ao excluir uma pessoa, todas as transações relacionadas a ela 
   são removidas automaticamente (cascade delete).

 A aplicação utiliza:
 - ASP.NET Core Web API;
 - Entity Framework Core;
 - Repository Pattern;
 - Service Layer;
 - DTOs e AutoMapper;
 - Middleware global para tratamento de erros.
*/


using Microsoft.EntityFrameworkCore;
using Residencial.GastosAPI.Context;
using Residencial.GastosAPI.DTOs.Mappings;
using Residencial.GastosAPI.Middlewares;
using Residencial.GastosAPI.Repositories.Concrete;
using Residencial.GastosAPI.Repositories.Interfaces;
using Residencial.GastosAPI.Services.Concrete;
using Residencial.GastosAPI.Services.Interfaces;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter());
        opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();
builder.Services.AddScoped<IPessoaService, PessoaService>();
builder.Services.AddScoped<ICategoriaService, CategoriaService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();

string mensagem = "A string de conexão 'DefaultConnection' não foi encontrada ou está inválida.";

string mysqlConnection = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? throw new ArgumentNullException(nameof(mysqlConnection), mensagem);

builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseMySql(mysqlConnection, ServerVersion.AutoDetect(mysqlConnection)));

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<MappingProfile>();
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("Residencial.GastosWEB",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("Residencial.GastosWEB");
app.ConfigureExceptionHandler(); 

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
