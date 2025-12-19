import type React from "react";

import { TabelaPessoa } from "../components/pessoas/TabelaPessoa";
import { LoadingPage } from "../components/common/LoadingPage";
import { ConfirmModal } from "../components/common/ConfirmModal";

import type { PessoaTabela as Pessoa } from "../types/pessoaDTO";
import { useState } from "react";

/*
    Propriedades da tabela de pessoas.
    - pessoas: Recebe uma lista de pessoas já processadas (tipo PessoaTabela[])
    - onDelete: função para excluir uma pessoa (recebe o pessoaId: number)
    - loading: indica se a lista está em carregamento
*/
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

    // Controla a exibição do modal de confirmação
    const [showConfirm, setShowConfirm] = useState(false);

    // Guarda a pessoa selecionada para exclusão
    const [pessoaSelecionada, setPesoaSelecionada] = useState<Pessoa | null>(null)

    /*
        Disparado ao clicar no botão "Excluir" da tabela.
        Apenas abre o modal e guarda a pessoa selecionada.
    */
    const onDeleteClick = async (pessoa: Pessoa) => {
        setShowConfirm(true);
        setPesoaSelecionada(pessoa);
    }

    /*
        Confirma a exlusão
        Executa o callback recebido do App e fecha o modal.
    */
    const handleConfirmDelete = () => {
        if (pessoaSelecionada) {
            onDelete(pessoaSelecionada.pessoaId)
        }

        setShowConfirm(false);
        setPesoaSelecionada(null);
    }

    return (
        <div>
            {loading ?
                <LoadingPage />
                :
                <TabelaPessoa pessoas={pessoas} onDelete={onDeleteClick}
                />
            }

            <ConfirmModal
                show={showConfirm}
                nomePessoa={pessoaSelecionada?.nome || ""}
                onConfirm={handleConfirmDelete}
                onClose={() => {
                    setShowConfirm(false);
                    setPesoaSelecionada(null);
                }}
            />
        </ div>
    )
};