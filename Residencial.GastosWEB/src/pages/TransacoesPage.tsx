import React from "react";

import { useTransacoes } from "../hooks/useTransacoes";
import { usePessoas } from "../hooks/usePessoas";

import { TabelaTransacao } from "../components/transacoes/TabelaTransacao";
import { LoadingPage } from "./LoadingPage";

export const TransacoesPage: React.FC = () => {

    const { transacoes, loading: loadingTransacaoes } = useTransacoes();
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