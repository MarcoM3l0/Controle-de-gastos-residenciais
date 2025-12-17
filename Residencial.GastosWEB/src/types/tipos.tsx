import { TipoTransacao } from "./TipoTransacao";

type TipoTransacaoValues = typeof TipoTransacao[keyof typeof TipoTransacao]

export interface Pessoa {
    pessoaId: number;
    nome: string;
    idade: number;
    totalReceitas: number;
    totalDespesas: number;
}

export interface Categoria {
    categoriaId: number;
    descricao: string;
}

export interface Transacao {
    transacaoId: number;
    nomePessoa: string;
    idade: number;
    categoria: string;
    descricao: string;
    valor: number;
    tipo: TipoTransacaoValues;
}
