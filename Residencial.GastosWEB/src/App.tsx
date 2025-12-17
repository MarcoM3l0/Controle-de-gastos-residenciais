import type React from 'react';
import Header from './components/Header'
import PessoaModal from './models/PessoaModal';
import CategoriaModal from './models/CategoriaModal';
import Transacao from './models/TransacaoModal';
import { FinalidadeCategoria } from './types/FinalidadeCategoria';
import { Navigation } from './components/Navigation';
import { TabelaPessoa } from './tables/TabelaPessoa';
import { TabelaTransacao } from './tables/TabelaTransacao';
import { TabelaCategoria } from './tables/TabelaCategoria'
import { useState } from 'react';
import { TipoTransacao } from './types/TipoTransacao';

const App: React.FC = () => {

  const [showPessoaModal, setShowPessoaModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showTransacaoModal, setShowTransacaoModal] = useState(false);

  const [activeTab, setActiveTab] = useState("transacoes");

  //  Simulando dados de pessoas e categorias que viriam do backend
  const pessoas = [
    { pessoaId: 2, nome: "João Silva", idade: 30, totalReceitas: 5000, totalDespesas: 3000 },
    { pessoaId: 3, nome: "Ana Souza", idade: 25, totalReceitas: 4000, totalDespesas: 2500 }
  ];

  const categorias = [
    { categoriaId: 1, descricao: "Alimentação", totalReceitas: 0, totalDespesa: 1800 },
    { categoriaId: 2, descricao: "Transporte", totalReceitas: 0, totalDespesa: 1800 },
    { categoriaId: 4, descricao: "Salário", totalReceitas: 0, totalDespesa: 1800 }
  ];

  const transacao = [
    { transacaoId: 1, nomePessoa: "João da silva", idade: 30, categoria: "Alimentação", descricao: "Supermercado", valor: 258, tipo: TipoTransacao.Despesa }
  ]

  const handleCadastrarPessoa = (nome: string, idade: number) => {
    alert(`Pessoa salva: ${nome}, ${idade} anos`);
    setShowPessoaModal(false);
  };

  const handleCadastrarCategoria = (descricao: string, finalidade: number) => {
    const nomeFinalidade = Object.keys(FinalidadeCategoria).find(
      key => FinalidadeCategoria[key as keyof typeof FinalidadeCategoria] === finalidade
    );
    alert(`Categoria salva: ${descricao} (${nomeFinalidade})`);
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
          < TabelaCategoria categorias={[
            {
              categoriaId: 1,
              descricao: "Alimentação",
              finalidade: "Despesa",
              totalReceitas: 0,
              totalDespesas: 1800,
            },
            {
              categoriaId: 2,
              descricao: "Salário",
              finalidade: "Receita",
              totalReceitas: 5000,
              totalDespesas: 0,
            },
            {
              categoriaId: 3,
              descricao: "Transporte",
              finalidade: "Despesa",
              totalReceitas: 0,
              totalDespesas: 600,
            },
          ]} />
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
