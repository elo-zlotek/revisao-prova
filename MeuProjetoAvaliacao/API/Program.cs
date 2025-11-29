using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("AcessoTotal", configs => configs
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    )
);

var app = builder.Build();

app.UseCors("AcessoTotal");

app.MapGet("/", () => "Chamados");


app.MapGet("/api/chamado/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.TabelaChamados.Any())
    {
        return Results.Ok(ctx.TabelaChamados.ToList());
    }
    return Results.NotFound("Nenhum chamado encontrado");
});


app.MapPost("/api/chamado/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Chamado chamado) =>
{
    ctx.TabelaChamados.Add(chamado);
    ctx.SaveChanges();
    return Results.Created("", chamado);
});


app.MapPatch("/api/chamado/alterar/{id}", 
([FromServices] AppDataContext ctx, 
 [FromRoute] string id) =>
{
    Chamado? Resultado = ctx.TabelaChamados.Find(id);

    if (Resultado == null)
    {
        return Results.NotFound("Chamado não encontrado!");
    }

    if (Resultado.Status == "Aberto")
    {
        Resultado.Status = "Em atendimento";
    } else
    {
        Resultado.Status = "Resolvido";
    }

    ctx.SaveChanges();
    return Results.Ok(Resultado);
});


app.MapGet("/api/chamado/naoresolvidos", ([FromServices] AppDataContext ctx) =>
{
    var Resultado = ctx.TabelaChamados.Where(chamado => chamado.Status != "Resolvido").ToList();

    return Results.Ok(Resultado);
});


app.MapGet("/api/chamado/resolvidos", ([FromServices] AppDataContext ctx) =>
{
    var Resultado = ctx.TabelaChamados.Where(chamado => chamado.Status == "Resolvido").ToList();

    return Results.Ok(Resultado);
});


app.Run();
