import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Plus } from "lucide-react"

interface HeaderProps {
    onCadastrarPessoa: () => void;
    onCadastrarCategoria: () => void;
    onCadastrarTransacao: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCadastrarPessoa, onCadastrarCategoria, onCadastrarTransacao }) => {
    return (
        <header className="bg-light p-3 mb-4 shadow-sm">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Nome do sistema */}
                <h1 className="h5 mb-0">Controle de Gastos Residenciais</h1>

                {/* Botões */}
                <div className="btn-toolbar m-3" role="group" aria-label="Cadastro Buttons">
                    <button className="btn btn-primary me-1 fs-10" onClick={onCadastrarPessoa}><Plus className="me-1" />Cadastrar Pessoa</button>
                    <button className="btn btn-primary me-1 fs-10" onClick={onCadastrarCategoria}><Plus className="me-1" />Cadastrar Categoria</button>
                    <button className="btn btn-primary fs-10" onClick={onCadastrarTransacao}><Plus className="me-1" />Cadastrar Transação</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
