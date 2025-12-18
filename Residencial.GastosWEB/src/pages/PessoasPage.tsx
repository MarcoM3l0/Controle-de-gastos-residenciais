import type React from "react";

import { usePessoas } from "../hooks/usePessoas";
import { TabelaPessoa } from "../components/pessoas/TabelaPessoa";
import { LoadingPage } from "../components/common/LoadingPage";

/*
    Página responsável pela exibição e exclusão de pessoas.

    Responsabilidades:
    - Consumir o hook usePessoas
    - Exibir tabela de pessoas
    - Solicitar confirmação antes da exclusão
*/
export const PessoasPage: React.FC = () => {

     /*
        Hook centraliza toda a lógica de dados:
        - Busca pessoas
        - Busca totais
        - Cruza os dados
        - Exclusão de pessoas
    */
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