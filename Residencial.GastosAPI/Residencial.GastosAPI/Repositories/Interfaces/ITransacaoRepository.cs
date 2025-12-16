using Residencial.GastosAPI.Models;

namespace Residencial.GastosAPI.Repositories.Interfaces;

public interface ITransacaoRepository
{
    Task<IEnumerable<Transacao>> GetAllTransacoes();
    Task<Transacao> CreateTransacao(Transacao transacao);
}
