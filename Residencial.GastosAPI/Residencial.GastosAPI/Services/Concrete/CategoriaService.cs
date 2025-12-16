using AutoMapper;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Repositories.Interfaces;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Services.Concrete;

/// <summary>
/// Serviço para gerenciar operações relacionadas a categorias.
/// </summary>
public class CategoriaService : ICategoriaService
{
    private readonly ICategoriaRepository _categoriaRepository;
    private readonly IMapper _mapper;

    public CategoriaService(ICategoriaRepository categoriaRepository, IMapper mapper)
    {
        _categoriaRepository = categoriaRepository;
        _mapper = mapper;
    }

    /// <summary>
    /// Retorna todas as categorias cadastradas.
    /// Em seguida, mapeia as entidades para DTOs antes de retornar ao chamador.
    /// </summary>
    public async Task<IEnumerable<CategoriaDto>> GetAllCategoriasAsync()
    {
        var categoriasEntities = await _categoriaRepository.GetAllCategorias();
        return _mapper.Map<IEnumerable<CategoriaDto>>(categoriasEntities);
    }

    /// <summary>
    /// Cria uma nova categoria após validar os dados fornecidos.
    /// Caso o DTO fornecido seja nulo, lança uma exceção ArgumentNullException.
    /// Em seguida, mapeia o DTO para a entidade e chama o repositório para persistir a nova categoria.
    /// </summary>
    /// <param name="categoriaDto"></param>
    /// <exception cref="ArgumentNullException"></exception>
    public async Task CreateCategoriaAsync(CategoriaDto categoriaDto)
    {
        if(categoriaDto is null) 
            throw new ArgumentNullException(nameof(categoriaDto));

        var categoriaEntity = _mapper.Map<Categoria>(categoriaDto);
        await _categoriaRepository.CreateCategoria(categoriaEntity);
        categoriaDto.CategoriaId = categoriaEntity.CategoriaId;
    }

    /// <summary>
    /// Retorna os totais de receitas e despesas agrupados por categoria.
    /// </summary>
    public async Task<TotalCategoriaResponseDto> GetTotalCategoriasAsync()
    {
        var categoriasEntities = await _categoriaRepository.GetAllCategorias();

        var totalCategoriaResponse = categoriasEntities.Select(c => new CategoriaTotalDto
        {
            CategoriaId = c.CategoriaId,
            Descricao = c.Descricao,
            TotalReceitas = c.Transacoes?
                .Where(t => t.Tipo == Models.Enums.TipoTransacao.Receita)
                .Sum(t => t.Valor) ?? 0,
            TotalDespesas = c.Transacoes?
                .Where(t => t.Tipo == Models.Enums.TipoTransacao.Despesa)
                .Sum(t => t.Valor) ?? 0
        }).ToList();

        return new TotalCategoriaResponseDto
        {
            TotaisPorCategoria = totalCategoriaResponse,
            TotalReceitasGeral = totalCategoriaResponse.Sum(tc => tc.TotalReceitas),
            TotalDespesasGeral = totalCategoriaResponse.Sum(tc => tc.TotalDespesas)
        };
    }
}
