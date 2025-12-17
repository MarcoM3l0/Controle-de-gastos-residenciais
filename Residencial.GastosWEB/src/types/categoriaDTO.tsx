export interface CategoriaDto {
    categoriaId: number
    descricao: string
    finalidade: "Despesa" | "Receita" | "Ambas"
}

export interface CreateCategoriaDto {
    descricao: string
    finalidade: "Despesa" | "Receita" | "Ambas"
}

export interface CategoriaTotalDto {
    categoriaId: number
    descricao: string
    totalReceitas: number
    totalDespesas: number
    saldo: number
}

export interface TotalCategoriaResponseDto {
    totaisPorCategoria: CategoriaTotalDto[]
    totalReceitasGeral: number
    totalDespesasGeral: number
    saldoGeral: number
}

export interface CategoriaTabela {
    categoriaId: number;
    descricao: string;
    finalidade: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number
}