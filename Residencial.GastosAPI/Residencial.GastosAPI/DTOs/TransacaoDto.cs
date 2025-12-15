using Residencial.GastosAPI.Models.Enums;

namespace Residencial.GastosAPI.DTOs;

public class TransacaoDto
{
    public int TransacaoId { get; set; }
    public string? Descricao { get; set; }
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }

    public int PessoaId { get; set; }
    public int CategoriaId { get; set; }

    public string? PessoaNome { get; set; }
    public string? CategoriaDescricao { get; set; }
}
