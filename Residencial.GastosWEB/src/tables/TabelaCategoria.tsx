import React from "react";
import { Tag } from "lucide-react";

export interface Categoria {
    categoriaId: number;
    descricao: string;
    finalidade: string;
    totalReceitas: number;
    totalDespesas: number;
}

interface TabelaCategoriaProps {
    categorias: Categoria[];
}

export const TabelaCategoria: React.FC<TabelaCategoriaProps> = ({ categorias }) => {

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (
        <div className="card shadow-sm">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Descrição da Categoria</th>
                            <th>Finalidade</th>
                            <th className="text-end">Total de Receitas</th>
                            <th className="text-end">Total de Despesas</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
