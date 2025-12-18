import type React from "react";

import { usePessoas } from "../hooks/usePessoas";
import { TabelaPessoa } from "../components/pessoas/TabelaPessoa";

export const PessoasPage: React.FC = () => {

    const { pessoas, handleDeletarPessoa, carregar } = usePessoas();

    return (
        <div>
        <TabelaPessoa pessoas={pessoas} onDelete={(pessoaId) => {
            if (window.confirm("Tem certeza que deseja excluir esta pessoa?")) {
                handleDeletarPessoa(pessoaId)
                carregar();
            }
        }
        }
        />
    </ div>
    )
};