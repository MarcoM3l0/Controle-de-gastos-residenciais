using Residencial.GastosAPI.DTOs;

namespace Residencial.GastosAPI.Services.Interfaces;

public interface ICategoriaService
{
    Task<IEnumerable<CategoriaDto>> GetAllCategoriasAsync();
    Task CreateCategoriaAsync(CategoriaDto categoriaDto);
    Task<TotalCategoriaResponseDto> GetTotalCategoriasAsync();
}
