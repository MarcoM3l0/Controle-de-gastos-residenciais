import React from "react";
import { ArrowUpCircle, ArrowDownCircle, SquareX } from "lucide-react";
import type { TransacaoTabela as Transacao } from "../../types/transacaoDTO";
import type { TotalGastosDTO as totalGastos } from "../../types/pessoaDTO";

import { formatCurrency } from "../../utils/formatCurrency";
import { SummaryCards } from '../common/SummaryCards'

/*
    Propriedades da tabela de transações.
    - transacoes: lista de transações retornadas pela API
    - totalGastos: objeto com totais gerais (receitas, despesas e saldo)
*/
interface TabelaTransacaoProps {
    transacoes: Transacao[];
    totalGastos: totalGastos | null;
}

/*
    Componente responsável por exibir a listagem de transações 
    e o resumo financeiro geral (cards de totais).
    Não contém regras de negócio, apenas apresentação dos dados.
*/
export const TabelaTransacao: React.FC<TabelaTransacaoProps> = ({ transacoes: transacoes, totalGastos }) => {

    return (
        <div >
            <div className="card shadow-sm">

                {/* Tabela */}
                <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light  sticky-top">
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
                            {transacoes.map((transacao) => (
                                <tr key={transacao.transacaoId}>
                                    <td>{transacao.pessoaNome}</td>
                                    <td>{transacao.idade}</td>
                                    <td>{transacao.categoriaDescricao}</td>
                                    <td>{transacao.descricao}</td>
                                    <td className="text-end fw-semibold">
                                        {formatCurrency(transacao.valor)}
                                    </td>
                                    <td className="text-center">
                                        {transacao.tipo === "Receita" ? (
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

                            {transacoes.length === 0 && (
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
                    totalGastos={totalGastos}
                />
            </div>
        </div>
    );
};
