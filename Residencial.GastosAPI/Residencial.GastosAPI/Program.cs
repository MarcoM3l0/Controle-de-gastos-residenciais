using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Residencial.GastosAPI.Context;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string mensagem = "A string de conexão 'DefaultConnection' não foi encontrada ou está inválida.";

string mysqlConnection = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? throw new ArgumentNullException(nameof(mysqlConnection), mensagem);

builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseMySql(mysqlConnection, ServerVersion.AutoDetect(mysqlConnection)));

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
