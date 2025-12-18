import { useEffect, useState } from 'react';
import { useLoading } from './useLoading';

import type { CategoriaTabela as Categoria } from '../types/categoriaDTO';
import { getAllCategorias, getTotaisPorCategoria } from '../Services/categoriaService';

/*
    Hook responsável por gerenciar os dados de categorias.

    Responsabilidades:
    - Buscar categorias cadastradas
    - Buscar totais financeiros por categoria
    - Cruzar os dados retornados pela API
    - Expor lista pronta para exibição na tabela
*/
export const useCategorias = () => {
    const { loading, setLoading } = useLoading(false);

    // Lista final de categorias com totais agregados
    const [categorias, setCategorias] = useState<Categoria[]>([])

    // Carrega os dados de categoria e seus totais financeiros
    const carregar = async () => {
        setLoading(true);

        try {

            /*
                Busca paralela para melhorar performance:
                - Lista de categorias
                - Totais financeiros por categoria
            */
            const [responseCategoria, responseCategoriaTotais] = await Promise.all([
                getAllCategorias(),
                getTotaisPorCategoria()
            ])

            /*
                Cruzamento dos dados:
                Para cada categoria, busca seus totais correspondentes
            */
            const listaCategoria: Categoria[] = responseCategoria.data.map((c) => {
                const receitaDespesa = responseCategoriaTotais.data.totaisPorCategoria.find(
                    (rd) => rd.categoriaId === c.categoriaId)

                return {
                    categoriaId: c.categoriaId,
                    descricao: c.descricao,
                    finalidade: c.finalidade,
                    totalReceitas: receitaDespesa?.totalReceitas || 0,
                    totalDespesas: receitaDespesa?.totalDespesas || 0,
                    saldo: receitaDespesa?.saldo || 0
                }
            })

            setCategorias(listaCategoria)

        } catch (error) {
            console.error("Erro ao cruzar dados de categorias:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregar()
    }, [])

    return {
        categorias,
        carregar,
        loading
    }
}