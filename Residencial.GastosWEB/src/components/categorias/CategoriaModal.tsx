import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toastSucesso, toastErro } from "../../utils/toast";
import { createCategoria } from "../../Services/categoriaService";

/*
    Propiedades esperadas pelo modal
    - show: controla a visibilidade do modal
    - onClose: função para fechar o modal
    - onSave: executado após salvar com sucesso 
*/
interface CategoriaModalProps {
    show: boolean;
    onClose: () => void;
    onSave: () => void;
}


/*
    Modal responsável pelo cadastro de novas categorias.

    Regras de negócios:
    - A descrição é obrigatória
    - A finalidade deve ser (Despesa, Receita ou Ambas)

    As validações mais complexas ficam no backend.
*/
const CategoriaModal: React.FC<CategoriaModalProps> = ({ show, onClose, onSave }) => {

    // Estado local para armazenar a descrição da categoria
    const [descricao, setDescricao] = useState("");

    // Estado local para armazenar a finalidade da categoria
    const [finalidade, setFinalidade] = useState<"Despesa" | "Receita" | "Ambas">("Despesa");

    // Estado do botão Salvar
    const [botaoSalvar, isBotaoSalvar] = useState(false);

    /*
        Função responsável por salvar a categoria.
        - Valida campos obrigatórios
        - Chama o service que se comunica com a API
        - Exibe feedback visual (toast)
    */
    const handleSave = async () => {

        isBotaoSalvar(true);

        try {

            if (!descricao.trim()) {
                toastErro("Descrição é obrigatória!");
                return;
            }

            await createCategoria({
                descricao,
                finalidade
            })

            toastSucesso("Categoria cadastrada com sucesso!")

            onSave();

            setDescricao("");
            setFinalidade("Despesa");

            onClose();

        } catch (error: any) {
            toastErro(
                error?.response?.data?.message || "Erro ao cadastrar Categoria"
            )
        } finally {
            isBotaoSalvar(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="h5 fw-bold">Cadastrar Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Alimentação, Aluguel..."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Finalidade</Form.Label>
                        <Form.Select
                            value={finalidade}
                            onChange={(e) => setFinalidade(e.target.value as "Despesa" | "Receita" | "Ambas")}
                        >
                            <option value="Despesa">Despesa</option>
                            <option value="Receita">Receita</option>
                            <option value="Ambas">Ambas</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="secondary" className="px-4" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" className="px-4" onClick={handleSave} disabled={botaoSalvar}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoriaModal;