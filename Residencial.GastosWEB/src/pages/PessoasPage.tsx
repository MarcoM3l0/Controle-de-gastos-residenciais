import type React from "react";

import { TabelaPessoa } from "../components/pessoas/TabelaPessoa";
import { LoadingPage } from "../components/common/LoadingPage";

import type { PessoaTabela as Pessoa } from "../types/pessoaDTO";

interface PessoasPageProps {
    pessoas: Pessoa[],
    onDelete: (pessoaId: number) => void,
    loading: boolean
}

/*
    Página responsável pela exibição e exclusão de pessoas.

    Responsabilidades:
    - Consumir o hook usePessoas
    - Exibir tabela de pessoas
    - Solicitar confirmação antes da exclusão
*/
export const PessoasPage: React.FC<PessoasPageProps> = ({ pessoas, onDelete, loading }) => {

    /*
        Responsavel por confirmar ao usuário antes de excluir uma pessoa.
        Se confirmado, chama o callback onDelete passando o pessoaId
    */
    const onDeleteClick = async (pessoaId: number) => {
        if (window.confirm("Tem certeza que deseja excluir esta pessoa?")) {
            onDelete(pessoaId)
        }
    }

    return (
        <div>
            {loading ?
                <LoadingPage />
                :
                <TabelaPessoa pessoas={pessoas} onDelete={onDeleteClick}
                />
            }
        </ div>
    )
};