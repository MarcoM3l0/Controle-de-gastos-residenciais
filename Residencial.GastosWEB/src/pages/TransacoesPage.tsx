import React from "react";

import { useTransacoes } from "../hooks/useTransacoes";
import { usePessoas } from "../hooks/usePessoas";
import { TabelaTransacao } from "../components/transacoes/TabelaTransacao";

export const TransacoesPage: React.FC = () => {

    const { transacoes } = useTransacoes();
    const { totalGastos } = usePessoas();

    return (
        <div>
            <TabelaTransacao transacoes={transacoes} totalGastos={totalGastos} />
        </ div>
    )
};