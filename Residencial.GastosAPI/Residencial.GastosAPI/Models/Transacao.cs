using System.Text.Json.Serialization;

namespace Residencial.GastosAPI.Models;

public class Transacao
{
    public int TransacaoId { get; set; }
    public string? descricao { get; set; }
    public decimal valor { get; set; }
    public string? tipo { get; set; }

    // Relacionamento N:1 com Pessoa
    [JsonIgnore]
    public int PessoaId { get; set; }
    public Pessoa? Pessoa { get; set; }

    // Relacionamento N:1 com Categoria
    [JsonIgnore]
    public int CategoriaId { get; set; }
    public Categoria? Categoria { get; set; }

}