using Residencial.GastosAPI.Models;

namespace Residencial.GastosAPI.Repositories.Interfaces;

public interface IPessoaRepository
{
    Task<IEnumerable<Pessoa>> GetAllPessoas();
    Task<Pessoa> CreatePessoa(Pessoa pessoa);
    Task<bool> DeletePessoa(int id);
}
