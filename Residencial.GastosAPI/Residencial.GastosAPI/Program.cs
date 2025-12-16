using Microsoft.EntityFrameworkCore;
using Residencial.GastosAPI.Context;
using Residencial.GastosAPI.DTOs.Mappings;
using Residencial.GastosAPI.Repositories.Concrete;
using Residencial.GastosAPI.Repositories.Interfaces;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter());
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();

string mensagem = "A string de conexão 'DefaultConnection' não foi encontrada ou está inválida.";

string mysqlConnection = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? throw new ArgumentNullException(nameof(mysqlConnection), mensagem);

builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseMySql(mysqlConnection, ServerVersion.AutoDetect(mysqlConnection)));

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<MappingProfile>();
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
