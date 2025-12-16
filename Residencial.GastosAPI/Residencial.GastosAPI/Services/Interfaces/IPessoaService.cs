using Residencial.GastosAPI.DTOs;

namespace Residencial.GastosAPI.Services.Interfaces;

public interface IPessoaService
{
    Task<IEnumerable<PessoaDto>> GetAllPessoasAsync();
    Task CreatePessoaAsync(PessoaDto pessoaDto);
    Task DeletePessoaAsync(int pessoaId);
    Task<TotalPessoaResponseDto> GetTotaisPorPessoaAsync();
}
