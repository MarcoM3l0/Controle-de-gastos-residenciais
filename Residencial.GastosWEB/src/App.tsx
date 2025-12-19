import type React from 'react';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { usePessoas } from './hooks/usePessoas';
import { useCategorias } from './hooks/useCategorias';

import Header from './components/common/Header'
import { Navigation } from './components/common/Navigation';

import PessoaModal from './components/pessoas/PessoaModal';
import CategoriaModal from './components/categorias/CategoriaModal';
import TransacaoModal from './components/transacoes/TransacaoModal';

import { PessoasPage } from './pages/PessoasPage';
import { CategoriasPage } from './pages/CategoriasPage';
import { TransacoesPage } from './pages/TransacoesPage';



const App: React.FC = () => {
  const [showPessoaModal, setShowPessoaModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showTransacaoModal, setShowTransacaoModal] = useState(false);
  const [activeTab, setActiveTab] = useState("transacoes");
  const [refresh, setRefresh] = useState(0);

  /*
    Hook centraliza toda a lógica de dados:
    - Busca pessoas
    - Busca totais
    - Cruza os dados
    - Exclusão de pessoas
  */
  const { pessoas, handleDeletarPessoa, loading } = usePessoas();
  const { categorias } = useCategorias();

  const handleCadastrarPessoa = () => {
    refreshPages();
    setShowPessoaModal(false);
  };

  const handleCadastrarCategoria = () => {
    refreshPages();
    setShowCategoriaModal(false);
  };

  const handleCadastrarTransacao = () => {
    refreshPages();
    setShowTransacaoModal(false);
  };

  const refreshPages = () => setRefresh(r => (r === 0 ? 1 : 0))

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
          <TransacoesPage key={refresh} />
        }

        {activeTab === "pessoas" &&
          <PessoasPage key={refresh} pessoas={pessoas} onDelete={handleDeletarPessoa} loading={loading} />
        }

        {activeTab === "categorias" &&
          <CategoriasPage key={refresh} />
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
