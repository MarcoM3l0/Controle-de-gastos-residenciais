import React from "react";

import { useTransacoes } from "../hooks/useTransacoes";
import { usePessoas } from "../hooks/usePessoas";

import { TabelaTransacao } from "../components/transacoes/TabelaTransacao";
import { LoadingPage } from "../components/common/LoadingPage";

/*
    Página responsável pela exibição das transações.

    Responsabilidades:
    - Consumir o hook useTransacoes
    - Exibir tabela de transações

    Observação:
    - Os totais gerais vêm do contexto de pessoas
    - As transações dependem das pessoas para enriquecer os dados
*/
export const TransacoesPage: React.FC = () => {

    /*
        Hook centraliza toda a lógica de dados:
        - Busca transações
        - Cruza os dados 
    */
    const { transacoes, loading: loadingTransacaoes } = useTransacoes();

    // Hook de pessoas reutilizado apenas para obter os totais gerais
    const { totalGastos, loading: loadingPessoas } = usePessoas();

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