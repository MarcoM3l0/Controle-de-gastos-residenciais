import { useEffect, useState } from 'react';
import { useLoading } from './useLoading';
import type { CategoriaTabela as Categoria } from '../types/categoriaDTO';

import { getAllCategorias, getTotaisPorCategoria } from '../Services/categoriaService';

export const useCategorias = () => {
    const { loading, setLoading } = useLoading(false);

    const [categorias, setCategorias] = useState<Categoria[]>([])

    const carregar = async () => {
        setLoading(true);

        try {

            const [responseCategoria, responseCategoriaTotais] = await Promise.all([
                getAllCategorias(),
                getTotaisPorCategoria()
            ])

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