import React from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

import type { TotalGastosDTO as totalGastos } from "../../types/pessoaDTO";

import { formatCurrency } from "../../utils/formatCurrency";

interface SummaryCardsProps {
    totalGastos: totalGastos | null;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ totalGastos }) => {

    const Receitas = totalGastos?.totalReceitasGeral || 0;
    const Despesas = totalGastos?.totalDespesasGeral || 0;
    const Saldo = totalGastos?.saldoGeral || 0;

    return (
        <div className="row g-4 mb-4">

            {/* Total de Receitas */}
            <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <p className="text-muted mb-1">Total de Receitas</p>
                            <h5 className="text-success mb-0">
                                {formatCurrency(Receitas)}
                            </h5>
                        </div>
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center bg-success bg-opacity-10"
                            style={{ width: "48px", height: "48px" }}
                        >
                            <TrendingUp className="text-success" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Total de Despesas */}
            <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <p className="text-muted mb-1">Total de Despesas</p>
                            <h5 className="text-danger mb-0">
                                {formatCurrency(Despesas)}
                            </h5>
                        </div>
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center bg-danger bg-opacity-10"
                            style={{ width: "48px", height: "48px" }}
                        >
                            <TrendingDown className="text-danger" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Saldo */}
            <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex justify-content-between align-items-center ">
                        <div>
                            <p className="text-bold text-muted text mb-1">Saldo</p>
                            <h5 className={Saldo >= 0 ? "text-primary mb-0" : "text-danger mb-0"}>
                                {formatCurrency(Saldo)}
                            </h5>
                        </div>
                        <div
                            className={`rounded-circle d-flex align-items-center justify-content-center ${Saldo >= 0 ? "bg-primary bg-opacity-10" : "bg-danger bg-opacity-10"
                                }`}
                            style={{ width: "48px", height: "48px" }}
                        >
                            <Wallet
                                className={Saldo >= 0 ? "text-primary" : "text-danger"}
                                size={24}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
