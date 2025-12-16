namespace Residencial.GastosAPI.DTOs;

public class TotalPessoaResponseDto
{
    public IEnumerable<PessoaTotalDto>? Pessoas { get; set; }
    
    public decimal TotalReceitasGeral { get; set; }
    public decimal TotalDespesasGeral { get; set; }

    public decimal SaldoGeral => TotalReceitasGeral - TotalDespesasGeral;
}
