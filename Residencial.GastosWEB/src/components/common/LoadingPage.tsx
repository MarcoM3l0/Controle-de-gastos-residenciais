import React from "react";

/*
    Componente de loading padrão da aplicação.

    Objetivo:
    - Centralizar o feedback visual de carregamento

    Observação:
    - Apenas representação visual de estado "loading"
*/
export const LoadingPage: React.FC = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
};