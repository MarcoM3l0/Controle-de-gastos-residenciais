/**
    Serviço responsável por todas as operações relacionadas
    à entidade Categoria (Busca as categorias, o total de gastos por categoria e criar uma categoria).
    Centraliza chamadas à API facilitando manutenção e testes.
 */


import { api } from "./api";
import type { CategoriaDto, TotalCategoriaResponseDto, CreateCategoriaDto} from '../types/categoriaDTO'

// Requisições HTTP com a API
// GET responsavel por retorna todas as categorias
export const getAllCategorias = async () => {
    const response = await api.get<CategoriaDto[]>('Categorias')
    return response
}

// GET responsavel por retorna o total de receita, despesa e o saldo por categoria.
export const getTotaisPorCategoria = async () => {
    const response = await api.get<TotalCategoriaResponseDto>('Categorias/totais')
    return response
}

//POST responavel por criar uma nova categoria
export const createCategoria = async (categoriaDto: CreateCategoriaDto) => {
    const response = await api.post('Categorias', categoriaDto)
    return response
}