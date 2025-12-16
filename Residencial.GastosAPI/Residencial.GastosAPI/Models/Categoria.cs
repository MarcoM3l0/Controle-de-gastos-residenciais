using Residencial.GastosAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Residencial.GastosAPI.Models;

/// <summary>
/// Representa uma categoria de transação no sistema.
/// Cada categoria pode estar associada a múltiplas transações.
/// </summary>
public class Categoria
{
    [Key]
    public int CategoriaId { get; set; }
    [Required]
    [MaxLength(150)]
    public string? Descricao { get; set; }
    [Required]
    public FinalidadeCategoria Finalidade { get; set; }

    // Relacionamento 1:N com Transacao
    public ICollection<Transacao>? Transacoes { get; set; }
}
