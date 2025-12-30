import type React from "react";

/*
    Componente Footer (Rodapé da aplicação).

    Responsabilidades:
    - Exibir informações institucionais da aplicação
    - Informar autoria do projeto
    - Disponibilizar link para o LinkedIn do autor
    - Disponibilizar link para o GitHub do autor
    - Disponibilizar link direto para o repositório do projeto

    Observações:
    - O ano é calculado dinamicamente para evitar manutenção manual
    - Links são abertos em nova aba por questões de usabilidade
*/
const Footer: React.FC = () => {

     /*
        Obtém o ano atual do sistema.
        Usado para manter o copyright
        sempre atualizado automaticamente.
    */
    const anoAtual = new Date().getFullYear();

    return (
        <footer className="bg-light text-center text-muted py-2 border-top fixed-bottom">
            <div className="container">
                <small>
                    © {anoAtual} • Desenvolvido por{" "}
                    <a
                        href="https://www.linkedin.com/in/marcom3l0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none fw-semibold"
                    >
                        Marco Melo
                    </a>{" "}
                    |{" "}
                    <a
                        href="https://github.com/MarcoM3l0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                    >
                        GitHub
                    </a> {" "}
                    | {" "}
                    <a
                        href="https://github.com/MarcoM3l0/Controle-de-gastos-residenciais"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                    >
                        Repositório no GitHub
                    </a>
                </small>
            </div>
        </footer>
    );
};

export default Footer;
