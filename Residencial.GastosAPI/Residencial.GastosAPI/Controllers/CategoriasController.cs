using Microsoft.AspNetCore.Mvc;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Controllers;

/// <summary>
/// Controller responsável por gerenciar categorias.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class CategoriasController : ControllerBase
{
    private readonly ICategoriaService _categoriaService;

    public CategoriasController(ICategoriaService categoriaService)
    {
        _categoriaService = categoriaService;
    }

    /// <summary>
    /// Retorna todas as categorias.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoriaDto>>> GetAllCategorias()
    {
        var categorias = await _categoriaService.GetAllCategoriasAsync();
        return Ok(categorias);
    }

    /// <summary>
    /// Retorna os totais por categoria.
    /// </summary>
    [HttpGet("totais")]
    public async Task<ActionResult<TotalCategoriaResponseDto>> GetTotaisPorCategoria()
    {
        var totais = await _categoriaService.GetTotalCategoriasAsync();
        return Ok(totais);
    }

    /// <summary>
    /// Cria uma nova categoria.
    /// </summary>
    /// <param name="categoriaDto"></param>
    [HttpPost]
    public async Task<ActionResult> CreateCategoria([FromBody] CategoriaDto categoriaDto)
    {
        await _categoriaService.CreateCategoriaAsync(categoriaDto);
        return CreatedAtAction(nameof(GetAllCategorias), null);
    }
}
