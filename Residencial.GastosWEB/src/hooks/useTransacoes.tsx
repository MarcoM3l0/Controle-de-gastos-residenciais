import { useEffect, useState } from 'react';

import { getAllTransacoes } from '../Services/transacaoService';
import type { PessoaTabela as Pessoa } from '../types/pessoaDTO';
import type { TransacaoTabela as Transacao } from '../types/transacaoDTO';

import { usePessoas } from './usePessoas';

export const useTransacoes = () => {

    const {pessoas} = usePessoas()

    const [transacoes, setTransacoes] = useState<Transacao[]>([])

    const carregar = async (listaPessoa: Pessoa[]) => {
        try {

            const responseTransacao = await getAllTransacoes()

            const listaTransacao: Transacao[] = responseTransacao.data.map((t) => {
                const pessoaRelacionada = listaPessoa.find(
                    (pr) => pr.pessoaId === t.pessoaId)

                return {
                    transacaoId: t.transacaoId,
                    pessoaNome: t.pessoaNome,
                    idade: pessoaRelacionada?.idade || 0,
                    categoriaDescricao: t.categoriaDescricao,
                    descricao: t.descricao,
                    valor: t.valor,
                    tipo: t.tipo
                }
            })

            setTransacoes(listaTransacao)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        carregar(pessoas)
    }, [])

    return {
        transacoes,
        carregar
    }
}