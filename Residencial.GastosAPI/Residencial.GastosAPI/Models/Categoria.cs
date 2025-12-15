using Residencial.GastosAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Residencial.GastosAPI.Models;

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
