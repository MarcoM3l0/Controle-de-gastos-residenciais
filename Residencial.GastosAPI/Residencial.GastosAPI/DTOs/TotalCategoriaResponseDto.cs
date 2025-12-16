using System.Numerics;

namespace Residencial.GastosAPI.DTOs;

public class TotalCategoriaResponseDto
{
    public IEnumerable<CategoriaTotalDto>? TotaisPorCategoria { get; set; }

    public decimal TotalReceitasGeral { get; set; }
    public decimal TotalDespesasGeral { get; set; }

    public decimal SaldoGeral => TotalReceitasGeral - TotalDespesasGeral;
}
