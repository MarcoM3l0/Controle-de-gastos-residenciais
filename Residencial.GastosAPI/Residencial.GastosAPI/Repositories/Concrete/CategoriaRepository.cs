using Microsoft.EntityFrameworkCore;
using Residencial.GastosAPI.Context;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Repositories.Interfaces;

namespace Residencial.GastosAPI.Repositories.Concrete;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly AppDbContext _context;

    public CategoriaRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Categoria>> GetAllCategorias()
    {
        return await _context.Categorias.Include(c => c.Transacoes).ToListAsync();
    }

    public async Task<Categoria?> GetCategoriaById(int categoriaId)
    {
        return await _context.Categorias.Include(c => c.Transacoes)
                                        .FirstOrDefaultAsync(c => c.CategoriaId == categoriaId);
    }

    public async Task<Categoria> CreateCategoria(Categoria categoria)
    {
        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();
        return categoria;
    }
}
