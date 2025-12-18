import type React from 'react';
import { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { toastSucesso, toastErro } from './utils/toast';

import Header from './components/Header'
import { Navigation } from './components/Navigation';

import PessoaModal from './models/PessoaModal';
import CategoriaModal from './models/CategoriaModal';
import TransacaoModal from './models/TransacaoModal';

import { TabelaPessoa } from './tables/TabelaPessoa';
import { TabelaTransacao } from './tables/TabelaTransacao';
import { TabelaCategoria } from './tables/TabelaCategoria'

import type { CategoriaTabela as Categoria } from './types/categoriaDTO';
import type { PessoaTabela as Pessoa, TotalGastosDTO as TotalGastos } from './types/pessoaDTO';
import type { TransacaoTabela as Transacao } from './types/transacaoDTO';

import { getAllCategorias, getTotaisPorCategoria } from './Services/categoriaService';
import { deletePessoa, getAllPessoas, getPessoasTotais } from './Services/pessoaService';
import { getAllTransacoes } from './Services/transacaoService';

const App: React.FC = () => {
  const [showPessoaModal, setShowPessoaModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showTransacaoModal, setShowTransacaoModal] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [transacaes, setTransacoes] = useState<Transacao[]>([])

  const [totalgastos, setTotalGastos] = useState<TotalGastos | null>(null)

  const [activeTab, setActiveTab] = useState("transacoes");

  useEffect(() => {
    carregarDadosIniciais()
  }, [])


  const carregarDadosIniciais = async () => {
    const listarPessoaCarregada = await carregarPessoas()
    await carregarCategorias()
    carregarTransacoes(listarPessoaCarregada)
  }

  const carregarCategorias = async () => {
    try {

      const [responseCategoria, responseCategoriaTotais] = await Promise.all([
        getAllCategorias(),
        getTotaisPorCategoria()
      ])

      const listaCategoria: Categoria[] = responseCategoria.data.map((c) => {
        const receitaDespesa = responseCategoriaTotais.data.totaisPorCategoria.find(
          (rd) => rd.categoriaId === c.categoriaId)

        return {
          categoriaId: c.categoriaId,
          descricao: c.descricao,
          finalidade: c.finalidade,
          totalReceitas: receitaDespesa?.totalReceitas || 0,
          totalDespesas: receitaDespesa?.totalDespesas || 0,
          saldo: receitaDespesa?.saldo || 0
        }
      })

      setCategorias(listaCategoria)

    } catch (error) {
      console.error("Erro ao cruzar dados de categorias:", error);
    }
  }

  const carregarPessoas = async () => {
    try {

      const [responsePessoa, responsePessoaTotais] = await Promise.all([
        getAllPessoas(),
        getPessoasTotais()
      ])

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

  const carregarTransacoes = async (listaPessoa: Pessoa[]) => {
    try {

      const responseTransacao = await getAllTransacoes()

      const listaTransacao: Transacao[] = responseTransacao.data.map((t) => {
        const pessoaRelacionada = listaPessoa.find(
          (pr) => pr.pessoaId === t.pessoaId)
        console.log("pessao")
        console.log(pessoaRelacionada?.idade)
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

      console.log("Apos")
      console.log(listaTransacao)

      setTransacoes(listaTransacao)

    } catch (error) {

    }
  }


  const handleCadastrarPessoa = () => {
    carregarDadosIniciais()
    setShowPessoaModal(false);
  };

  const handleDeletarPessoa = async (pessoaId: number) => {
    try {

      await deletePessoa(pessoaId);
      toastSucesso("Pessoas e transações associadas foram removidas com sucesso!");
      carregarDadosIniciais();

    } catch (error: any) {
      toastErro(
        error?.response?.data?.message ||
        "Erro ao excluir pessoa"
      )
    }
  }

  const handleCadastrarCategoria = () => {
    carregarDadosIniciais()
    setShowCategoriaModal(false);
  };

  const handleCadastrarTransacao = () => {
    carregarDadosIniciais()
    setShowTransacaoModal(false);
  };

  return (
    <div>
      <Header
        onCadastrarPessoa={() => setShowPessoaModal(true)}
        onCadastrarCategoria={() => setShowCategoriaModal(true)}
        onCadastrarTransacao={() => setShowTransacaoModal(true)}
      />

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="container mt-4">
        {activeTab === "transacoes" &&
          <TabelaTransacao transacaoes={transacaes} totalGastos={totalgastos} />
        }

        {activeTab === "pessoas" &&
          <TabelaPessoa pessoas={pessoas} onDelete={(pessoaId) => {
            if (window.confirm("Tem certeza que deseja excluir esta pessoa?")) {
              handleDeletarPessoa(pessoaId)
              carregarDadosIniciais();
            }
          }
          }
          />
        }

        {activeTab === "categorias" &&
          < TabelaCategoria categorias={categorias} />
        }
      </div>

      <PessoaModal
        show={showPessoaModal}
        onClose={() => setShowPessoaModal(false)}
        onSave={handleCadastrarPessoa}
      />
      <CategoriaModal
        show={showCategoriaModal}
        onClose={() => setShowCategoriaModal(false)}
        onSave={handleCadastrarCategoria}
      />
      <TransacaoModal
        show={showTransacaoModal}
        onClose={() => setShowTransacaoModal(false)}
        onSave={handleCadastrarTransacao}
        pessoas={pessoas}
        categorias={categorias}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  )
}

export default App
