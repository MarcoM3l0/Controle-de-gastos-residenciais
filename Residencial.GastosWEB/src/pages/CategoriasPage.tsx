import React from "react";

import { useCategorias } from "../hooks/useCategorias";
import { TabelaCategoria } from "../components/categorias/TabelaCategoria";

import { LoadingPage } from "./LoadingPage";

export const CategoriasPage: React.FC = () => {

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