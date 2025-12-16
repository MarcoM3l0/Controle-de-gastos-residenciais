import type React from 'react';
import  Header  from './components/Header'

const App: React.FC = () => {

  const handleCadastrarPessoa = () => alert("Cadastrar Pessoa");
  const handleCadastrarCategoria = () => alert("Cadastrar Categoria");
  const handleCadastrarTransacao = () => alert("Cadastrar Transação");

  return (
    <div>
            <Header
                onCadastrarPessoa={handleCadastrarPessoa}
                onCadastrarCategoria={handleCadastrarCategoria}
                onCadastrarTransacao={handleCadastrarTransacao}
            />
            
            {/* Aqui vai o restante da aplicação */}
            <div className="container">
                <p>Conteúdo principal aqui</p>
            </div>
        </div>
  )
}

export default App
