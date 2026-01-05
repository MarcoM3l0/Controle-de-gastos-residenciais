import type React from 'react';
import { useState } from 'react';

// Componente Vercel Speed Insights
import { SpeedInsights } from "@vercel/speed-insights/react"

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { usePessoas } from './hooks/usePessoas';
import { useCategorias } from './hooks/useCategorias';
import { useTransacoes } from './hooks/useTransacoes';
import { useNoticeCarriage } from './hooks/useNoticeCarrige';

import Header from './components/common/Header'
import { Navigation } from './components/common/Navigation';
import Footer from './components/common/Footer';

import PessoaModal from './components/pessoas/PessoaModal';
import CategoriaModal from './components/categorias/CategoriaModal';
import TransacaoModal from './components/transacoes/TransacaoModal';
import NoticeCarriage from './components/common/NoticeCarriage';

import { PessoasPage } from './pages/PessoasPage';
import { CategoriasPage } from './pages/CategoriasPage';
import { TransacoesPage } from './pages/TransacoesPage';

const App: React.FC = () => {
  const [showPessoaModal, setShowPessoaModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showTransacaoModal, setShowTransacaoModal] = useState(false);
  const [activeTab, setActiveTab] = useState("transacoes");

  /*
    Hook centraliza toda a lógica de dados:
    - Busca pessoas
    - Busca totais
    - Cruza os dados
    - Exclusão de pessoas
  */
  const { pessoas, handleDeletarPessoa, loading: loadingPessoas, totalGastos, carregar: carregarPessoas } = usePessoas(() => carregar());

  /*
    Hook centraliza toda a lógica de dados:
    - Busca categorias
    - Busca totais
    - Cruza os dados
  */
  const { categorias, loading: loadingCategorias, carregar: carregarCategorias } = useCategorias();

  /*
    Hook centraliza toda a lógica de dados:
    - Busca transações
    - Cruza os dados 
  */
  const { transacoes, loading: loadingTransacaoes, carregar: carregarTransacoes } = useTransacoes();

  /*
    Hook responsável por controlar a exibição do aviso
    sobre o possível atraso no carregamento da API hospedada
    no Render (plano gratuito).
  */
  const { showNoticeCarriage, handleCloseNoticeCarriage } = useNoticeCarriage();

  const handleCadastrarPessoa = () => {
    carregar();
    setShowPessoaModal(false);
  };

  const handleCadastrarCategoria = () => {
    carregar();
    setShowCategoriaModal(false);
  };

  const handleCadastrarTransacao = () => {
    carregar();
    setShowTransacaoModal(false);
  };

  /*
    Função responsável por sincronizar todos os dados da aplicação.
    - Garante que todas as telas estejam sempre consistentes
    - Evita estados desatualizados após operações de escrita (POST/DELETE)
  */
  const carregar = async () => {
    const pessoasAtualizadas = await carregarPessoas();

    await Promise.all([
      carregarCategorias(),
      carregarTransacoes(pessoasAtualizadas)
    ]);
  }

  return (
    <div>

      <SpeedInsights />
      {showNoticeCarriage &&
        <NoticeCarriage show={showNoticeCarriage}
          onClose={() => handleCloseNoticeCarriage()}
        />
      }

      <Header
        onCadastrarPessoa={() => setShowPessoaModal(true)}
        onCadastrarCategoria={() => setShowCategoriaModal(true)}
        onCadastrarTransacao={() => setShowTransacaoModal(true)}
      />

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="container mt-4">
        {activeTab === "transacoes" &&
          <TransacoesPage
            transacoes={transacoes}
            totalGastos={totalGastos}
            loadingTransacaoes={loadingTransacaoes}
            loadingPessoas={loadingPessoas}
          />
        }

        {activeTab === "pessoas" &&
          <PessoasPage
            pessoas={pessoas}
            onDelete={handleDeletarPessoa}
            loading={loadingPessoas} />
        }

        {activeTab === "categorias" &&
          <CategoriasPage
            categorias={categorias}
            loading={loadingCategorias} />
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

      <Footer />
    </div>
  )
}

export default App
