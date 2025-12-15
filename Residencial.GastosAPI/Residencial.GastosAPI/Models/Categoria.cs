namespace Residencial.GastosAPI.Models;

public class Categoria
{
    public int CategoriaId { get; set; }
    public string? Descricao { get; set; }

    // Relacionamento 1:N com Transacao
    public ICollection<Transacao>? Transacao { get; set; }
}
