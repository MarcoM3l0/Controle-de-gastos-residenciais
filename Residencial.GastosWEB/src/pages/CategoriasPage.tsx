import React from "react";

import { useCategorias } from "../hooks/useCategorias";
import { TabelaCategoria } from "../components/categorias/TabelaCategoria";

export const CategoriasPage: React.FC = () => {

    const { categorias } = useCategorias();

    return (
        <div>
            < TabelaCategoria categorias={categorias} />
        </ div>
    )
};