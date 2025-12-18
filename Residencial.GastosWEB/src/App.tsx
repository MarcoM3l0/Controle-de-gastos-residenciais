import type React from 'react';
import { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import Header from './components/common/Header'
import { Navigation } from './components/common/Navigation';

import PessoaModal from './components/pessoas/PessoaModal';
import CategoriaModal from './components/categorias/CategoriaModal';
import TransacaoModal from './components/transacoes/TransacaoModal';

import { TabelaPessoa } from './components/pessoas/TabelaPessoa';
import { TabelaTransacao } from './components/transacoes/TabelaTransacao';
import { TabelaCategoria } from './components/categorias/TabelaCategoria'



const App: React.FC = () => {
  const [showPessoaModal, setShowPessoaModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showTransacaoModal, setShowTransacaoModal] = useState(false);
  const [activeTab, setActiveTab] = useState("transacoes");



  const handleCadastrarPessoa = () => {
    setShowPessoaModal(false);
  };

  const handleCadastrarCategoria = () => {
    setShowCategoriaModal(false);
  };

  const handleCadastrarTransacao = () => {
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
