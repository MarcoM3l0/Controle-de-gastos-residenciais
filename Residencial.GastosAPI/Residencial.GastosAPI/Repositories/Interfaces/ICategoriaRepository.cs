using Residencial.GastosAPI.Models;

namespace Residencial.GastosAPI.Repositories.Interfaces;

public interface ICategoriaRepository
{
    Task<IEnumerable<Categoria>> GetAllCategorias();
    Task<Categoria> CreateCategoria(Categoria categoria);
    Task<Categoria?> GetCategoriaById(int categoriaId);
}
