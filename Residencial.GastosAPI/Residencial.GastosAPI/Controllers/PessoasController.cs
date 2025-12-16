using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Controllers;

/// <summary>
/// Controller responsável por gerenciar operações relacionadas a pessoas.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class PessoasController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoasController(IPessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    /// <summary>
    /// Retorna todas as pessoas cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PessoaDto>>> GetAllPessoas()
    {
        var pessoas = await _pessoaService.GetAllPessoasAsync();
        return Ok(pessoas);
    }

    /// <summary>
    /// Retorna os totais agrupados por pessoa.
    /// </summary>
    [HttpGet("totais")]
    public async Task<ActionResult<IEnumerable<TotalPessoaResponseDto>>> GetPessoasTotais()
    {
        var resultado = await _pessoaService.GetTotaisPorPessoaAsync();
        return Ok(resultado);
    }

    /// <summary>
    /// Cria uma nova pessoa.
    /// </summary>
    /// <param name="pessoaDto"></param>
    [HttpPost]
    public async Task<ActionResult<PessoaDto>> CreatePessoa([FromBody] PessoaDto pessoaDto)
    {
        await _pessoaService.CreatePessoaAsync(pessoaDto);
        return CreatedAtAction(nameof(GetAllPessoas), null);
    }

    /// <summary>
    /// Exclui uma pessoa pelo ID.
    /// </summary>
    /// <param name="pessoaId"></param>
    [HttpDelete("{pessoaId}")]
    public async Task<IActionResult> DeletePessoa(int pessoaId)
    {
        await _pessoaService.DeletePessoaAsync(pessoaId);
        return NoContent();
    }
}
