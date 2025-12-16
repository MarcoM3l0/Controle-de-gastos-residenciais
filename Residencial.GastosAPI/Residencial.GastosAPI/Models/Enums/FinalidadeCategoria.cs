namespace Residencial.GastosAPI.Models.Enums;

/// <summary>
/// Define a finalidade de uma categoria como despesa, receita ou ambas.
/// Despesa: Categoria destinada a despesas.
/// Receita: Categoria destinada a receitas.
/// Ambas: Categoria que pode ser usada para despesas e receitas.
/// Controla a natureza financeira das categorias no sistema de gastos.
/// </summary>
public enum FinalidadeCategoria
{
    Despesa = 1,
    Receita = 2,
    Ambas = 3
}
