using System.ComponentModel.DataAnnotations;

namespace Residencial.GastosAPI.Models;

public class Pessoa
{
    [Key]
    public int PessoaId { get; set; }
    [Required]
    [MaxLength(100)]
    public string? Nome { get; set; }
    [Required]
    public int Idade { get; set; }

    // Relacionamento 1:N com Transacao
    public ICollection<Transacao>? Transacoes { get; set; }
}
