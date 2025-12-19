import { useEffect, useState } from "react"
import { useLoading } from "./useLoading";

import { toastSucesso, toastErro } from '../utils/toast';
import { deletePessoa, getAllPessoas, getPessoasTotais } from '../Services/pessoaService';
import type { PessoaTabela as Pessoa, TotalGastosDTO as TotalGastos } from '../types/pessoaDTO';

/*
    Hook responsável pelo gerenciamento de pessoas.

    Responsabilidades:
    - Buscar pessoas cadastradas
    - Buscar totais financeiros por pessoa 
    - Busca totais gerais
    - Excluir pessoas
*/
export const usePessoas = () => {
    const [pessoas, setPessoas] = useState<Pessoa[]>([])
    const [totalGastos, setTotalGastos] = useState<TotalGastos | null>(null)

    const { loading, setLoading } = useLoading(false);

    /*
        Remove uma pessoa e todas as suas transações associadas.
        Essa regra é garantida pelo backend.
    */
    const handleDeletarPessoa = async (pessoaId: number) => {

        setLoading(true);
        try {

            await deletePessoa(pessoaId);
            toastSucesso("Pessoa e transações associadas foram removidas com sucesso!");
            carregar();

        } catch (error: any) {
            toastErro(
                error?.response?.data?.message ||
                "Erro ao excluir pessoa"
            )
        } finally {
            setLoading(false);
        }
    }

    // Carrega os dados de pessoas e seus totais financeiros
    const carregar = async () => {
        try {

             /*
                Busca paralela para melhorar performance:
                - Lista de pessoas
                - Totais financeiros por pessoa
            */
            const [responsePessoa, responsePessoaTotais] = await Promise.all([
                getAllPessoas(),
                getPessoasTotais()
            ])

            /*
                Cruzamento dos dados:
                Para cada pessoa, busca seus totais correspondentes
            */
            const listaPessoa: Pessoa[] = responsePessoa.data.map((p) => {
                const receitaDespesa = responsePessoaTotais.data.pessoas.find(
                    (rd) => rd.pessoaId === p.pessoaId)

                return {
                    pessoaId: p.pessoaId,
                    nome: p.nome,
                    idade: p.idade,
                    totalReceitas: receitaDespesa?.totalReceitas || 0,
                    totalDespesas: receitaDespesa?.totalDespesas || 0,
                    saldo: receitaDespesa?.saldo || 0
                }
            })

            // Totais gerais para exibição nos cards de resumo
            const dadosValoresGerais = responsePessoaTotais.data

            const listaTotalGasto: TotalGastos = {
                totalReceitasGeral: dadosValoresGerais.totalReceitasGeral,
                totalDespesasGeral: dadosValoresGerais.totalDespesasGeral,
                saldoGeral: dadosValoresGerais.saldoGeral
            }

            setPessoas(listaPessoa)
            setTotalGastos(listaTotalGasto)
            return listaPessoa

        } catch (error) {
            console.log("Erro ao cruzar dados de pessoas:", error)
            return []
        }
    }

    useEffect(() => {
        carregar()
    }, [])

    return {
        pessoas,
        totalGastos,
        handleDeletarPessoa,
        carregar,
        loading
    }
}