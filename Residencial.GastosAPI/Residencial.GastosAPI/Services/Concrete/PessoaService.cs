using AutoMapper;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Models.Enums;
using Residencial.GastosAPI.Repositories.Interfaces;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Services.Concrete;

public class PessoaService : IPessoaService
{
    private readonly IPessoaRepository _pessoaRepository;
    private readonly IMapper _mapper;

    public PessoaService(IPessoaRepository pessoaRepository, IMapper mapper)
    {
        _pessoaRepository = pessoaRepository;
        _mapper = mapper;
    }
    public async Task<IEnumerable<PessoaDto>> GetAllPessoasAsync()
    {
        var pessoasEntities = await _pessoaRepository.GetAllPessoas();
        return _mapper.Map<IEnumerable<PessoaDto>>(pessoasEntities);
    }

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

    public async Task DeletePessoaAsync(int pessoaId)
    {
        if(pessoaId <= 0) 
            throw new ArgumentException("ID da pessoa inválido.", nameof(pessoaId));

        bool deleted = await _pessoaRepository.DeletePessoa(pessoaId);

        if (!deleted) 
            throw new KeyNotFoundException($"Pessoa com ID {pessoaId} não encontrada.");
    }
}
