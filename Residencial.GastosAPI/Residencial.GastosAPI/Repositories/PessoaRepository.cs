using Microsoft.EntityFrameworkCore;
using Residencial.GastosAPI.Context;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Repositories.Interfaces;

namespace Residencial.GastosAPI.Repositories;

public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _context;
    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Pessoa>> GetAllPessoas()
    {
        return await _context.Pessoas.ToListAsync();
    }

    public async Task<Pessoa> CreatePessoa(Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();
        return pessoa;
    }

    public async Task<bool> DeletePessoa(int id)
    {
        var pessoa = await GetPessoaById(id) ?? throw new KeyNotFoundException();

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<Pessoa?> GetPessoaById(int id)
    {
        return await _context.Pessoas.Include(p => p.Transacoes)
                                     .FirstOrDefaultAsync(p => p.PessoaId == id);
    }
}
