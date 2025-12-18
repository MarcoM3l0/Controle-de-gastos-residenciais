import type React from "react";

import { usePessoas } from "../hooks/usePessoas";
import { TabelaPessoa } from "../components/pessoas/TabelaPessoa";
import { LoadingPage } from "./LoadingPage";

export const PessoasPage: React.FC = () => {

    const { pessoas, handleDeletarPessoa, loading } = usePessoas();

    return (
        <div>
            {loading ?
                <LoadingPage />
                :
                <TabelaPessoa pessoas={pessoas} onDelete={(pessoaId) => {
                    if (window.confirm("Tem certeza que deseja excluir esta pessoa?")) {
                        handleDeletarPessoa(pessoaId)
                    }
                }}
                />
            }
        </ div>
    )
};