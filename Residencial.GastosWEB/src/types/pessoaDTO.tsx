export interface PessoaDTO {
    pessoaId: number
    nome: string
    idade: number
}

export interface createPessoaDTO {
    nome: string
    idade: number
}

export interface PessoaTotalDTO {
    pessoaId: number
    nome: string
    totalReceitas: number
    totalDespesas: number
    saldo: number
}

export interface PessoaTotaisResponseDTO {
    pessoas: PessoaTotalDTO[]
    totalReceitasGeral: number
    totalDespesasGeral: number
    saldoGeral: number
}

export interface TotalGastosDTO {
    totalReceitasGeral: number
    totalDespesasGeral: number
    saldoGeral: number
}

export interface PessoaTabela {
    pessoaId: number;
    nome: string;
    idade: number;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number
}