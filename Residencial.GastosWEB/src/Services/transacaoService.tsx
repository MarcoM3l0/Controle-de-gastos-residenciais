/**
    Integração com a entidade Transação.
    O frontend consome a listagem de transações já enriquecida
    com nome da pessoa e descrição da categoria.

    As regras de negócio (menor de idade, compatibilidade de categoria
    e tipo da transação) são validadas no backend, garantindo
    consistência e integridade dos dados.
 */


import { api } from "./api";
import type { TransacaoDTO, CreateTransacaoDTO } from "../types/transacaoDTO";

export const getAllTransacoes = async () => {
    const response = await api.get<TransacaoDTO[]>("Transacoes")
    return response
}

export const CreateTransacao = async (transacaoDTO: CreateTransacaoDTO) => {
    const response = await api.post("Transacoes", transacaoDTO)
    return response
}
