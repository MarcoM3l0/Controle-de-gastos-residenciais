import React from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface SummaryCardsProps {
    totalReceitas: number;
    totalDespesas: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
    totalReceitas,
    totalDespesas,
}) => {

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (
        <div className="row g-4 mb-4">

            {/* Total de Receitas */}
            <div className="col-12 col-md-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <p className="text-muted mb-1">Total de Receitas</p>
                            <h5 className="text-success mb-0">
                                {formatCurrency(totalReceitas)}
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
                                {formatCurrency(totalDespesas)}
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
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <p className="text-muted mb-1">Saldo</p>
                            <h5 className={(totalReceitas - totalDespesas) >= 0 ? "text-primary mb-0" : "text-danger mb-0"}>
                                {formatCurrency((totalReceitas - totalDespesas))}
                            </h5>
                        </div>
                        <div
                            className={`rounded-circle d-flex align-items-center justify-content-center ${(totalReceitas - totalDespesas) >= 0 ? "bg-primary bg-opacity-10" : "bg-danger bg-opacity-10"
                                }`}
                            style={{ width: "48px", height: "48px" }}
                        >
                            <Wallet
                                className={(totalReceitas - totalDespesas) >= 0 ? "text-primary" : "text-danger"}
                                size={24}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
