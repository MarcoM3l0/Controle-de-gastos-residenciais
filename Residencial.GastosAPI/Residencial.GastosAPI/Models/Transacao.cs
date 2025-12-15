using Residencial.GastosAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Residencial.GastosAPI.Models;

public class Transacao
{
    [Key]
    public int TransacaoId { get; set; }
    [Required]
    [StringLength(200)]
    public string? Descricao   { get; set; }
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Valor { get; set; }
    [Required]
    public TipoTransacao Tipo { get; set; }

    // Relacionamento N:1 com Pessoa
    public int PessoaId { get; set; }
    [JsonIgnore]
    public Pessoa? Pessoa { get; set; }

    // Relacionamento N:1 com Categoria
    public int CategoriaId { get; set; }

    [JsonIgnore]
    public Categoria? Categoria { get; set; }

}