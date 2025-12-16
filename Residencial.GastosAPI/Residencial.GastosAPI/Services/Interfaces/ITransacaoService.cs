using Residencial.GastosAPI.DTOs;

namespace Residencial.GastosAPI.Services.Interfaces;

public interface ITransacaoService
{
    Task<IEnumerable<TransacaoDto>> GetAllTransacoesAsync();
    Task CreateTransacaoAsync(TransacaoDto transacaoDto);
}
