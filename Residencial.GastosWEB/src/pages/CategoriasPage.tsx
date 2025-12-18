import React from "react";

import { useCategorias } from "../hooks/useCategorias";
import { TabelaCategoria } from "../components/categorias/TabelaCategoria";
import { LoadingPage } from "../components/common/LoadingPage";

/*
    Página responsável pela exibição das categorias.

    Responsabilidades:
    - Consumir o hook useCategorias
    - Controlar o estado de carregamento
    - Renderizar a tabela de categorias
*/
export const CategoriasPage: React.FC = () => {

    /*
        Hook centraliza toda a lógica de dados:
        - Busca categorias
        - Busca totais
        - Cruza os dados
    */
    const { categorias, loading } = useCategorias();

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