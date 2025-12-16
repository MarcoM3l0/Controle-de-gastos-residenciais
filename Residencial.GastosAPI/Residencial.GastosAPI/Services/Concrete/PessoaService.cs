using AutoMapper;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Models.Enums;
using Residencial.GastosAPI.Repositories.Interfaces;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Services.Concrete;

/// <summary>
/// Serviço para gerenciar operações relacionadas a pessoas.
/// </summary>
public class PessoaService : IPessoaService
{
    private readonly IPessoaRepository _pessoaRepository;
    private readonly IMapper _mapper;

    public PessoaService(IPessoaRepository pessoaRepository, IMapper mapper)
    {
        _pessoaRepository = pessoaRepository;
        _mapper = mapper;
    }

    /// <summary>
    /// Retorna todas as pessoas cadastradas.
    /// Em seguida, mapeia as entidades para DTOs antes de retornar ao chamador.
    /// </summary>
    public async Task<IEnumerable<PessoaDto>> GetAllPessoasAsync()
    {
        var pessoasEntities = await _pessoaRepository.GetAllPessoas();
        return _mapper.Map<IEnumerable<PessoaDto>>(pessoasEntities);
    }

    /// <summary>
    /// Retorna os totais de receitas e despesas agrupados por pessoa.
    /// </summary>
    public async Task<TotalPessoaResponseDto> GetTotaisPorPessoaAsync()
    {
        var pessoasEntities = await _pessoaRepository.GetAllPessoas();

        var totalPessoaResponse = pessoasEntities.Select(p => new PessoaTotalDto
        {
            PessoaId = p.PessoaId,
            Nome = p.Nome,
            TotalReceitas = p.Transacoes?
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor) ?? 0,
            TotalDespesas = p.Transacoes?
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor) ?? 0
        }).ToList();

        return new TotalPessoaResponseDto
        {
            Pessoas = totalPessoaResponse,
            TotalReceitasGeral = totalPessoaResponse.Sum(tp => tp.TotalReceitas),
            TotalDespesasGeral = totalPessoaResponse.Sum(tp => tp.TotalDespesas)
        };
    }

    /// <summary>
    /// Cria uma nova pessoa após validar os dados fornecidos.
    /// - Não permite idade negativa.
    /// - Lança exceções apropriadas para dados inválidos.
    /// Ao final, mapeia o DTO para a entidade e chama o repositório para persistir a nova pessoa.
    /// </summary>
    /// <param name="pessoaDto"></param>
    /// <exception cref="ArgumentNullException"></exception>
    /// <exception cref="ArgumentException"></exception>
    public async Task CreatePessoaAsync(PessoaDto pessoaDto)
    {
        if(pessoaDto is null) 
            throw new ArgumentNullException(nameof(pessoaDto));
        if(pessoaDto.Idade < 0) 
            throw new ArgumentException("Idade não pode ser negativa.", nameof(pessoaDto.Idade));

        var pessoaEntity = _mapper.Map<Pessoa>(pessoaDto);
        await _pessoaRepository.CreatePessoa(pessoaEntity);
        pessoaDto.PessoaId = pessoaEntity.PessoaId;
    }

    /// <summary>
    /// Deleta uma pessoa pelo ID fornecido.
    /// Caso o ID seja inválido ou a pessoa não exista, lança exceções apropriadas.
    /// Ao final, chama o repositório para realizar a exclusão.
    /// </summary>
    /// <param name="pessoaId"></param>
    /// <exception cref="ArgumentException"></exception>
    /// <exception cref="KeyNotFoundException"></exception>
    public async Task DeletePessoaAsync(int pessoaId)
    {
        if(pessoaId <= 0) 
            throw new ArgumentException("ID da pessoa inválido.", nameof(pessoaId));

        bool deleted = await _pessoaRepository.DeletePessoa(pessoaId);

        if (!deleted) 
            throw new KeyNotFoundException($"Pessoa com ID {pessoaId} não encontrada.");
    }
}
