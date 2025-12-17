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
import { useEffect, useState } from 'react';
import { TipoTransacao } from './types/TipoTransacao';
import { getAllCategorias, getTotaisPorCategoria } from './Services/categoriaService';

const App: React.FC = () => {
  const [showPessoaModal, setShowPessoaModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showTransacaoModal, setShowTransacaoModal] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [activeTab, setActiveTab] = useState("transacoes");

  useEffect(() => {
    carregarCategorias()
  }, [])


  //  Simulando dados de pessoas e categorias que viriam do backend
  const pessoas = [
    { pessoaId: 2, nome: "João Silva", idade: 30, totalReceitas: 5000, totalDespesas: 3000 },
    { pessoaId: 3, nome: "Ana Souza", idade: 25, totalReceitas: 4000, totalDespesas: 2500 }
  ];

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
          (ed) => ed.categoriaId === c.categoriaId)

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

  const handleCadastrarPessoa = (nome: string, idade: number) => {
    alert(`Pessoa salva: ${nome}, ${idade} anos`);
    setShowPessoaModal(false);
  };

  const handleCadastrarCategoria = (descricao: string, finalidade: string) => {
    alert(`Categoria salva: ${descricao} (${finalidade})`);
    setShowCategoriaModal(false);
  };

  const handleCadastrarTransacao = (transacao: any) => {
    alert(`Transação salva: ${transacao.descricao}, Valor: ${transacao.valor}, Tipo: ${transacao.tipo}, Pessoa ID: ${transacao.pessoaId}, Categoria ID: ${transacao.categoriaId}`);
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
              console.log("Excluir pessoa:", pessoaId);
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
