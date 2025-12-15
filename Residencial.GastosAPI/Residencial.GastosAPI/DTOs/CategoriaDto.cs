using Residencial.GastosAPI.Models.Enums;

namespace Residencial.GastosAPI.DTOs;

public class CategoriaDto
{
    public int CategoriaId { get; set; }
    public string? Descricao { get; set; }
    public FinalidadeCategoria Finalidade { get; set; }
}
