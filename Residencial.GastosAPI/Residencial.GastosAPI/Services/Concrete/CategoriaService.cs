using AutoMapper;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Repositories.Interfaces;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Services.Concrete;

public class CategoriaService : ICategoriaService
{
    private readonly ICategoriaRepository _categoriaRepository;
    private readonly IMapper _mapper;

    public CategoriaService(ICategoriaRepository categoriaRepository, IMapper mapper)
    {
        _categoriaRepository = categoriaRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoriaDto>> GetAllCategoriasAsync()
    {
        var categoriasEntities = await _categoriaRepository.GetAllCategorias();
        return _mapper.Map<IEnumerable<CategoriaDto>>(categoriasEntities);
    }

    public async Task CreateCategoriaAsync(CategoriaDto categoriaDto)
    {
        if(categoriaDto is null) 
            throw new ArgumentNullException(nameof(categoriaDto));

        var categoriaEntity = _mapper.Map<Categoria>(categoriaDto);
        await _categoriaRepository.CreateCategoria(categoriaEntity);
        categoriaDto.CategoriaId = categoriaEntity.CategoriaId;
    }

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
