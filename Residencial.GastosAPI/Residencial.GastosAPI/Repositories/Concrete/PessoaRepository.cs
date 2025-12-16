using Microsoft.EntityFrameworkCore;
using Residencial.GastosAPI.Context;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Repositories.Interfaces;

namespace Residencial.GastosAPI.Repositories.Concrete;

/// <summary>
/// Repositório responsavel pelo acesso aos dados da entidade Pessoa.
/// </summary>
public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _context;
    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retorna todas as pessoas cadastradas no sistema.
    /// Incluindo as transações associadas a cada pessoa.
    /// </summary>
    public async Task<IEnumerable<Pessoa>> GetAllPessoas()
    {
        return await _context.Pessoas.Include(p => p.Transacoes).ToListAsync();
    }

    /// <summary>
    /// Retorna uma pessoa pelo seu ID.
    /// Incluindo as transações associadas a essa pessoa.
    /// </summary>
    /// <param name="pessoaId"></param>
    public async Task<Pessoa?> GetPessoaById(int pessoaId)
    {
        return await _context.Pessoas.Include(p => p.Transacoes)
                                     .FirstOrDefaultAsync(p => p.PessoaId == pessoaId);
    }

    /// <summary>
    /// Cria uma nova pessoa no sistema.
    /// </summary>
    /// <param name="pessoa"></param>
    public async Task<Pessoa> CreatePessoa(Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();
        return pessoa;
    }

    /// <summary>
    /// Exclui uma pessoa do sistema pelo seu ID.
    /// Caso a pessoa não seja encontrada, lança uma exceção KeyNotFoundException.
    /// </summary>
    /// <param name="pessoaId"></param>
    /// <exception cref="KeyNotFoundException"></exception>
    public async Task<bool> DeletePessoa(int pessoaId)
    {
        var pessoa = await GetPessoaById(pessoaId) ?? throw new KeyNotFoundException();

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
        return true;
    }
}
