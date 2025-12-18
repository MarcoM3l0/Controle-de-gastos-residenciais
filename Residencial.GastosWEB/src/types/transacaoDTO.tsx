export interface TransacaoDTO {
    transacaoId: number
    descricao: string
    valor: number
    tipo: string
    pessoaId: number
    categoriaId: number
    pessoaNome: string
    categoriaDescricao: string
}

export interface CreateTransacaoDTO {
    descricao: string
    valor: number
    tipo: string
    pessoaId: number
    categoriaId: number
}

export interface TransacaoTabela {
    transacaoId: number;
    pessoaNome: string;
    idade: number;
    categoriaDescricao: string;
    descricao: string;
    valor: number;
    tipo: string;
}