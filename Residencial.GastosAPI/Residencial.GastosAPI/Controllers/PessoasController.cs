using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PessoasController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoasController(IPessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PessoaDto>>> GetAllPessoas()
    {
        var pessoas = await _pessoaService.GetAllPessoasAsync();
        return Ok(pessoas);
    }

    [HttpGet("totais")]
    public async Task<ActionResult<IEnumerable<TotalPessoaResponseDto>>> GetPessoasTotais()
    {
        var resultado = await _pessoaService.GetTotaisPorPessoaAsync();
        return Ok(resultado);
    }

    [HttpPost]
    public async Task<ActionResult<PessoaDto>> CreatePessoa([FromBody] PessoaDto pessoaDto)
    {
        await _pessoaService.CreatePessoaAsync(pessoaDto);
        return CreatedAtAction(nameof(GetAllPessoas), null);
    }

    [HttpDelete("{pessoaId}")]
    public async Task<IActionResult> DeletePessoa(int pessoaId)
    {
        await _pessoaService.DeletePessoaAsync(pessoaId);
        return NoContent();
    }
}
