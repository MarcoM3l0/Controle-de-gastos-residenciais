import type React from 'react';
import  Header  from './components/Header'
import PessoaModal from './Services/PessoaModal';
import CategoriaModal from './Services/CategoriaModal';
import Transacao from './Services/TransacaoModal';
import { FinalidadeCategoria } from './enum/FinalidadeCategoria';
import { Navigation } from './components/Navigation';
import { useState } from 'react';

const App: React.FC = () => {

  const [showPessoaModal, setShowPessoaModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showTransacaoModal, setShowTransacaoModal] = useState(false);

  const [activeTab, setActiveTab] = useState("transacoes");

  //  Simulando dados de pessoas e categorias que viriam do backend
    const pessoas = [
        { pessoaId: 2, nome: "João Silva" },
        { pessoaId: 3, nome: "Ana Souza" }
    ];

    const categorias = [
        { categoriaId: 1, descricao: "Alimentação" },
        { categoriaId: 2, descricao: "Transporte" },
        { categoriaId: 4, descricao: "Salário" }
    ];

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
           

            {/* Aqui vai o restante da aplicação */}
            <div className="container">
                <p>Conteúdo principal aqui</p>
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
