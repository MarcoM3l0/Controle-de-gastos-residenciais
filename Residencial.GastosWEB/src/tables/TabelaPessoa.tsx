import React from "react";
import { Trash2, AlertTriangle, SquareX } from "lucide-react";
import type { Pessoa } from "../types/tipos";

interface TabelaPessoaProps {
    pessoas: Pessoa[];
    onDelete: (id: number) => void;
}

export const TabelaPessoa: React.FC<TabelaPessoaProps> = ({ pessoas: pessoa, onDelete }) => {

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (
        <div className="card shadow-sm">
            {/* Alerta */}
            <div className="alert alert-warning d-flex align-items-center mb-0 rounded-0 rounded-top py-1 ">
                <AlertTriangle size={18} className="me-3" />
                <span>
                    Ao excluir uma pessoa, todas as transações associadas também serão removidas.
                </span>
            </div>

            {/* Tabela */}
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th className="text-end">Total de Receitas</th>
                            <th className="text-end">Total de Despesas</th>
                            <th className="text-center">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoa.map((pessoa) => (
                            <tr key={pessoa.pessoaId}>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.idade}</td>
                                <td className="text-end text-success fw-semibold">
                                    {formatCurrency(pessoa.totalReceitas)}
                                </td>
                                <td className="text-end text-danger fw-semibold">
                                    {formatCurrency(pessoa.totalDespesas)}
                                </td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        title="Excluir pessoa e suas transações"
                                        onClick={() => onDelete(pessoa.pessoaId)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {pessoa.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center text-muted py-4">
                                    <SquareX /> Nenhuma pessoa cadastrada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
