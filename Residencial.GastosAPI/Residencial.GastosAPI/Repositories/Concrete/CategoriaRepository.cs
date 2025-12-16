using Microsoft.EntityFrameworkCore;
using Residencial.GastosAPI.Context;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Repositories.Interfaces;

namespace Residencial.GastosAPI.Repositories.Concrete;

/// <summary>
/// Repositório responsavel pelo acesso aos dados da entidade categoria.
/// </summary>
public class CategoriaRepository : ICategoriaRepository
{
    private readonly AppDbContext _context;

    public CategoriaRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retorna todas as categorias cadastradas no sistema.
    /// Incluindo as transações associadas a cada categoria.
    /// </summary>
    public async Task<IEnumerable<Categoria>> GetAllCategorias()
    {
        return await _context.Categorias.Include(c => c.Transacoes).ToListAsync();
    }

    /// <summary>
    /// Retorna uma categoria pelo seu ID.
    /// </summary>
    /// <param name="categoriaId"></param>
    public async Task<Categoria?> GetCategoriaById(int categoriaId)
    {
        return await _context.Categorias.Include(c => c.Transacoes)
                                        .FirstOrDefaultAsync(c => c.CategoriaId == categoriaId);
    }
    
    /// <summary>
    /// Cria uma nova categoria no sistema.
    /// </summary>
    /// <param name="categoria"></param>
    public async Task<Categoria> CreateCategoria(Categoria categoria)
    {
        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();
        return categoria;
    }
}
