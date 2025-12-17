import React from "react";
import { ArrowUpCircle, ArrowDownCircle, SquareX } from "lucide-react";
import type { Transacao } from "../types/tipos"
import { TipoTransacao } from "../types/TipoTransacao";

import { SummaryCards } from './SummaryCards'



interface TabelaTransacaoProps {
    transacaoes: Transacao[];
}

export const TabelaTransacao: React.FC<TabelaTransacaoProps> = ({ transacaoes }) => {

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (
        <div >
            <div className="card shadow-sm">
                {/* Tabela */}
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Nome da Pessoa</th>
                                <th>Idade</th>
                                <th >Categoria</th>
                                <th >Descrição da Transação</th>
                                <th className="text-end">Valor</th>
                                <th className="text-center">Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacaoes.map((transacao) => (
                                <tr key={transacao.transacaoId}>
                                    <td>{transacao.nomePessoa}</td>
                                    <td>{transacao.idade}</td>
                                    <td>{transacao.categoria}</td>
                                    <td>{transacao.descricao}</td>
                                    <td className="text-end fw-semibold">
                                        {formatCurrency(transacao.valor)}
                                    </td>
                                    <td className="text-center">
                                        {transacao.tipo === TipoTransacao.Receita ? (
                                            <span className="badge bg-success d-inline-flex align-items-center gap-1">
                                                <ArrowUpCircle size={20} />
                                                Receita
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger d-inline-flex align-items-center gap-1">
                                                <ArrowDownCircle size={20} />
                                                Despesa
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {transacaoes.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-4">
                                        <SquareX /> Nenhuma transação cadastrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4">
                <SummaryCards
                    totalReceitas={9000}
                    totalDespesas={5500}
                />
            </div>
        </div>
    );
};
