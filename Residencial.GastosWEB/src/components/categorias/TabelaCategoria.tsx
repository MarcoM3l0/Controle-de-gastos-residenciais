import React from "react";
import { Tag } from "lucide-react";
import type { CategoriaTabela as Categoria } from "../../types/categoriaDTO";

import { formatCurrency } from "../../utils/formatCurrency";

interface TabelaCategoriaProps {
    categorias: Categoria[];
}

export const TabelaCategoria: React.FC<TabelaCategoriaProps> = ({ categorias }) => {



    return (
        <div className="card shadow-sm">
            <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light sticky-top">
                        <tr>
                            <th>Descrição da Categoria</th>
                            <th>Finalidade</th>
                            <th className="text-end">Total de Receitas</th>
                            <th className="text-end">Total de Despesas</th>
                            <th className="text-end">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.categoriaId}>
                                <td>
                                    <div className="d-flex align-items-center gap-2">
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center bg-primary bg-opacity-10"
                                            style={{ width: "32px", height: "32px" }}
                                        >
                                            <Tag size={16} className="text-primary" />
                                        </div>
                                        <span>{categoria.descricao}</span>
                                    </div>
                                </td>

                                <td className="text-muted">
                                    {categoria.finalidade}
                                </td>

                                <td className="text-end text-success fw-medium">
                                    {formatCurrency(categoria.totalReceitas)}
                                </td>

                                <td className="text-end text-danger fw-medium">
                                    {formatCurrency(categoria.totalDespesas)}
                                </td>

                                <td className={categoria.saldo >= 0 ? "text-end text-success fw-medium" : "text-end text-danger fw-medium"}>
                                    {formatCurrency(categoria.saldo)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
