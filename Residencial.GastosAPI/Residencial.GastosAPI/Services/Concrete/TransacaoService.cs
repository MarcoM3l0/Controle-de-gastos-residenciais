using AutoMapper;
using Residencial.GastosAPI.DTOs;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Models.Enums;
using Residencial.GastosAPI.Repositories.Interfaces;
using Residencial.GastosAPI.Services.Interfaces;

namespace Residencial.GastosAPI.Services.Concrete;

/// <summary>
/// Serviço responsável por gerenciar as regras de negócio relacionadas a transações.
/// </summary>
public class TransacaoService : ITransacaoService
{
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ICategoriaRepository _categoriaRepository;
    private readonly IMapper _mapper;

    public TransacaoService(ITransacaoRepository transacaoRepository, 
                            IPessoaRepository pessoaRepository, 
                            ICategoriaRepository categoriaRepository, 
                            IMapper mapper)
    {
        _transacaoRepository = transacaoRepository;
        _pessoaRepository = pessoaRepository;
        _categoriaRepository = categoriaRepository;
        _mapper = mapper;
    }

    /// <summary>
    /// Retorna todas as transações cadastradas.
    /// </summary>
    public async Task<IEnumerable<TransacaoDto>> GetAllTransacoesAsync()
    {
        var transacoesEntities = await _transacaoRepository.GetAllTransacoes();
        return _mapper.Map<IEnumerable<TransacaoDto>>(transacoesEntities);
    }

    /// <summary>
    /// Cria uma nova transação aplicando as regras de negócio definidas:
    /// - O valor da transação deve ser positivo.
    /// - Menores de idade só podem adicionar despesas.
    /// - A categoria da transação deve ser compatível com o tipo da transação.
    /// - Verifica se a pessoa e a categoria associadas existem.
    /// Ao final, mapeia o DTO para a entidade e chama o repositório para persistir a nova transação.
    /// </summary>
    /// <param name="transacaoDto"></param>
    /// <exception cref="ArgumentException"></exception>
    public async Task CreateTransacaoAsync(TransacaoDto transacaoDto)
    {
        // Regra: o valor deve ser positivo.
        // Considrei o número 0 inválido por ser neutro, pois ele não possui sinal positivo ou negativo.
        // Apesar de ser maior que qualquer número negativo, 0 não é maior que 0,
        // portanto não se enquadra na definição de número positivo (que exige ser > 0).
        // Assim, o 0 não atende ao requisito de ser um valor positivo,
        // ainda que seja um número não negativo.
        if (transacaoDto.Valor <= 0) 
            throw new ArgumentException("O valor da transação deve ser positivo.", nameof(transacaoDto.Valor));

        // Verifica se a pessoa e a categoria associadas existem
        var pessoaExists = await _pessoaRepository.GetPessoaById(transacaoDto.PessoaId);
        if(pessoaExists is null)
            throw new ArgumentException("Pessoa associada à transação não encontrada.", nameof(transacaoDto.PessoaId));

        var categoriaExists = await _categoriaRepository.GetCategoriaById(transacaoDto.CategoriaId);
        if(categoriaExists is null)
            throw new ArgumentException("Categoria associada à transação não encontrada.", nameof(transacaoDto.CategoriaId));


        // Regra de negócio: menor de idade só podem adicionar despesas
        if (pessoaExists.Idade < 18 && transacaoDto.Tipo == TipoTransacao.Receita)
            throw new ArgumentException("Menores de idade só podem adicionar despesas.", nameof(transacaoDto.Tipo));

        // Regra de negócio: Só é permitido adicionar com a categoria compatível
        if (categoriaExists.Finalidade != FinalidadeCategoria.Ambas &&
            categoriaExists.Finalidade != (FinalidadeCategoria)transacaoDto.Tipo) 
            throw new ArgumentException("Categoria incompatível com o tipo da transação.", nameof(transacaoDto.CategoriaId));

        var transacaoEntity = _mapper.Map<Transacao>(transacaoDto);
        await _transacaoRepository.CreateTransacao(transacaoEntity);
    }

}
