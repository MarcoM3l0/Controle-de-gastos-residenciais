/*
    Integração com pessoas e totais
        O frontend consome dados agregados da API, exibindo receitas, despesas e saldo individual, além do total geral.
        A exclusão de uma pessoa aciona automaticamente a remoção de todas as transações vinculadas, conforme regra de negócio 
        definida no backend.
 */

import type { PessoaDTO, PessoaTotaisResponseDTO, createPessoaDTO } from "../types/pessoaDTO";
import { api } from "./api";

// Requisições HTTP com a API
// GET responsavel por retorna todas as pessoas
export const getAllPessoas = async () => {
    const response = await api.get<PessoaDTO[]>("Pessoas")
    return response
}

// GET responsavel por retorna o total de receita, despesa e o saldo por pessoa.
export const getPessoasTotais = async () => {
    const response = await api.get<PessoaTotaisResponseDTO>("Pessoas/totais")
    return response
}

//POST responsavel por criar uma nova pessoa
export const createPessoa = async (pessoaDTO: createPessoaDTO) => {
    const response = await api.post("Pessoas", pessoaDTO)
    return response
}

// Delete responsavel por excluir uma pessoa
export const deletePessoa = async (pessoaId: number) => {
    await api.delete(`Pessoas/${pessoaId}`)
}