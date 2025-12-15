namespace Residencial.GastosAPI.Models;

public class Pessoa
{
    public int PessoaId { get; set; }
    public string? Descricao { get; set; }
    public int Idade { get; set; }

    // Relacionamento 1:N com Transacao
    public ICollection<Transacao>? Transacao { get; set; }
}
