import React from "react";

import { TabelaTransacao } from "../components/transacoes/TabelaTransacao";
import { LoadingPage } from "../components/common/LoadingPage";

import type { TransacaoTabela as Transacoes } from "../types/transacaoDTO";
import type { TotalGastosDTO } from "../types/pessoaDTO";

/*
    Propriedades da página de transações.
    - transacoes: Recebe uma lista de transações já processadas (tipo TransacaoTabela[])
    - totalGastos: Totais gerais por pessoa (tipo TotalGastosDTO | null)
    - loadingTransacaoes: Indica se as transações estão sendo carregadas (boolean)
    - loadingPessoas: Indica se os dados de pessoas estão sendo carregados (boolean)
*/
interface TransacoesPageProps {
    transacoes: Transacoes[],
    totalGastos: TotalGastosDTO | null,
    loadingTransacaoes: boolean,
    loadingPessoas: boolean
}

/*
    Página responsável pela exibição das transações.

    Responsabilidades:
    - Consumir o hook useTransacoes
    - Exibir tabela de transações

    Observação:
    - Os totais gerais vêm do contexto de pessoas
    - As transações dependem das pessoas para enriquecer os dados
*/
export const TransacoesPage: React.FC<TransacoesPageProps> = ({ transacoes, totalGastos, loadingTransacaoes, loadingPessoas }) => {
    return (
        <div>
            {loadingTransacaoes || loadingPessoas ?
                <LoadingPage />
                :
                <TabelaTransacao transacoes={transacoes} totalGastos={totalGastos} />
            }
        </ div>
    )
};