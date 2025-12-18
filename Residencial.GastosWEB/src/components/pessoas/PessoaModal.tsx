import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createPessoa } from "../../Services/pessoaService";
import { toastSucesso, toastErro } from "../../utils/toast";

/*
    Propiedades esperadas pelo modal
    - show: controla a visibilidade do modal
    - onClose: função para fechar o modal
    - onSave: executado após salvar com sucesso 
*/
interface PessoaModalProps {
    show: boolean;
    onClose: () => void;
    onSave: () => void;
}

/*
    Modal responsável pelo cadastro de novas pessoas.

    Regras de negócios:
    - Nome é obrigatório
    - Idade é obrigatória

    As validações mais complexas ficam no backend.
*/
const PessoaModal: React.FC<PessoaModalProps> = ({ show, onClose, onSave }) => {

    // Estado para armazenar o nome da pessoa
    const [nome, setNome] = useState("");

    // Estado para armazenar a idade
    const [idade, setIdade] = useState<number | "">("");

     /*
        Função responsável por salvar a pessoa.
        - Valida campos obrigatórios
        - Chama o service que se comunica com a API
        - Exibe feedback visual (toast)
    */
    const handleSave = async () => {
        try {
            if (idade !== "" && nome.trim()) {
                
                await createPessoa({
                    nome,
                    idade
                })

                toastSucesso("Pessoa cadastrada com sucesso!")

                onSave();

                setNome("");
                setIdade("");

                onClose();
            } else if (!nome.trim()) {
                toastErro("Nome é obrigatória!");
            }else {
                toastErro("Idade é obrigatória!")
            }


        } catch (error: any) {
            toastErro(
                error?.response?.data?.message ||
                "Erro ao cadastrar pessoa"
            )
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Pessoa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={nome}
                            placeholder="Ex: José da Silva"
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Idade</Form.Label>
                        <Form.Control
                            type="number"
                            value={idade}
                            onChange={(e) => setIdade(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="secondary" className="px-4" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" className="px-4" onClick={handleSave}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PessoaModal;
