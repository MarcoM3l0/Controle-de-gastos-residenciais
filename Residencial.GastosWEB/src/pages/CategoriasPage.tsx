import React from "react";

import { TabelaCategoria } from "../components/categorias/TabelaCategoria";
import { LoadingPage } from "../components/common/LoadingPage";
import type { CategoriaTabela as Categoria } from "../types/categoriaDTO";

/*
    Propriedades da página de categorias.
    - categorias: Recebe uma lista de categorias já processadas (tipo CategoriaTabela[])
    - loading: Indica se os dados estão em carregamento (boolean)
*/
interface CategoriasPageProps {
    categorias: Categoria[],
    loading: boolean
}

/*
    Página responsável pela exibição das categorias.

    Responsabilidades:
    - Consumir o hook useCategorias
    - Controlar o estado de carregamento
    - Renderizar a tabela de categorias
*/
export const CategoriasPage: React.FC<CategoriasPageProps> = ({ categorias, loading }) => {
    return (
        <div>
            {loading ?
                <LoadingPage />
                :
                < TabelaCategoria categorias={categorias} />
            }
        </ div>
    )
};