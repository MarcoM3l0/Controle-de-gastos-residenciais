using Microsoft.AspNetCore.Mvc;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class CategoriasController : ControllerBase
{
    private readonly ICategoriaService _categoriaService;

    public CategoriasController(ICategoriaService categoriaService)
    {
        _categoriaService = categoriaService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoriaDto>>> GetAllCategorias()
    {
        var categorias = await _categoriaService.GetAllCategoriasAsync();
        return Ok(categorias);
    }

    [HttpGet("totais")]
    public async Task<ActionResult<TotalCategoriaResponseDto>> GetTotaisPorCategoria()
    {
        var totais = await _categoriaService.GetTotalCategoriasAsync();
        return Ok(totais);
    }

    [HttpPost]
    public async Task<ActionResult> CreateCategoria([FromBody] CategoriaDto categoriaDto)
    {
        await _categoriaService.CreateCategoriaAsync(categoriaDto);
        return CreatedAtAction(nameof(GetAllCategorias), null);
    }
}
