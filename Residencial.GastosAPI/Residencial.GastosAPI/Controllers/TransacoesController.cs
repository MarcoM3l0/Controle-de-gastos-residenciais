using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Controllers;

/// <summary>
/// Controller responsável por gerenciar transações financeiras.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class TransacoesController : ControllerBase
{
    public readonly ITransacaoService _transacaoService;

    public TransacoesController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    /// <summary>
    /// Retorna todas as transações financeiras.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransacaoDto>>> GetAllTransacoes()
    {
        var transacoes = await _transacaoService.GetAllTransacoesAsync();
        return Ok(transacoes);
    }

    /// <summary>
    /// Cria uma nova transação financeira.
    /// </summary>
    /// <param name="transacaoDto"></param>
    [HttpPost]
    public async Task<ActionResult> CreateTransacao([FromBody] TransacaoDto transacaoDto)
    {
        await _transacaoService.CreateTransacaoAsync(transacaoDto);
        return CreatedAtAction(nameof(GetAllTransacoes), null);
    }
}
