using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class TransacoesController : ControllerBase
{
    public readonly ITransacaoService _transacaoService;

    public TransacoesController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransacaoDto>>> GetAllTransacoes()
    {
        var transacoes = await _transacaoService.GetAllTransacoesAsync();
        return Ok(transacoes);
    }

    [HttpPost]
    public async Task<ActionResult> CreateTransacao([FromBody] TransacaoDto transacaoDto)
    {
        await _transacaoService.CreateTransacaoAsync(transacaoDto);
        return CreatedAtAction(nameof(GetAllTransacoes), null);
    }
}
