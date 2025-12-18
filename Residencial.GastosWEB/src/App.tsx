import type React from 'react';
import Header from './components/Header'
import PessoaModal from './models/PessoaModal';
import CategoriaModal from './models/CategoriaModal';
import Transacao from './models/TransacaoModal';
import { Navigation } from './components/Navigation';
import { TabelaPessoa } from './tables/TabelaPessoa';
import { TabelaTransacao } from './tables/TabelaTransacao';
import { TabelaCategoria } from './tables/TabelaCategoria'
import type { CategoriaTabela as Categoria } from './types/categoriaDTO';
import type { PessoaTabela as Pessoa } from './types/pessoaDTO';
import { useEffect, useState } from 'react';
import { TipoTransacao } from './types/TipoTransacao';
import { getAllCategorias, getTotaisPorCategoria } from './Services/categoriaService';
import { deletePessoa, getAllPessoas, getPessoasTotais } from './Services/pessoaService';

const App: React.FC = () => {
  const [showPessoaModal, setShowPessoaModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showTransacaoModal, setShowTransacaoModal] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [pessoas, setPessoas] = useState<Pessoa[]>([])

  const [activeTab, setActiveTab] = useState("transacoes");

  useEffect(() => {
    carregarPessoas()
    carregarCategorias()
  }, [])


  //  Simulando dados de pessoas e categorias que viriam do backend
  const transacao = [
    { transacaoId: 1, nomePessoa: "João da silva", idade: 30, categoria: "Alimentação", descricao: "Supermercado", valor: 258, tipo: TipoTransacao.Despesa }
  ]

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
      setPessoas(listaPessoa)
    } catch (error) {
      console.log("Erro ao cruzar dados de pessoas:", error)
    }
  }
  

  const handleCadastrarPessoa = (nome: string, idade: number) => {
    alert(`Pessoa salva: ${nome}, ${idade} anos`);
    carregarPessoas()
    setShowPessoaModal(false);
  };

  const handleDeletarPessoa = async (pessoaId: number) => {
    deletePessoa(pessoaId);
    carregarPessoas();
  }

  const handleCadastrarCategoria = (descricao: string, finalidade: string) => {
    alert(`Categoria salva: ${descricao} (${finalidade})`);
    carregarCategorias()
    setShowCategoriaModal(false);
  };

  const handleCadastrarTransacao = (transacao: any) => {
    alert(`Transação salva: ${transacao.descricao}, Valor: ${transacao.valor}, Tipo: ${transacao.tipo}, Pessoa ID: ${transacao.pessoaId}, Categoria ID: ${transacao.categoriaId}`);
    carregarPessoas()
    carregarCategorias()
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
          <TabelaTransacao transacaoes={transacao} />
        }

        {activeTab === "pessoas" &&
          <TabelaPessoa pessoas={pessoas} onDelete={(pessoaId) => {
            if (window.confirm("Tem certeza que deseja excluir esta pessoa?"))
              handleDeletarPessoa(pessoaId)
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
      <Transacao
        show={showTransacaoModal}
        onClose={() => setShowTransacaoModal(false)}
        onSave={handleCadastrarTransacao}
        pessoas={pessoas}
        categorias={categorias}
      />
    </div>
  )
}

export default App
