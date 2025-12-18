import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toastSucesso, toastErro } from "../utils/toast";
import { createCategoria } from "../Services/categoriaService";

interface CategoriaModalProps {
    show: boolean;
    onClose: () => void;
    onSave: () => void;
}

const CategoriaModal: React.FC<CategoriaModalProps> = ({ show, onClose, onSave }) => {
    const [descricao, setDescricao] = useState("");
    const [finalidade, setFinalidade] = useState<"Despesa" | "Receita" | "Ambas">("Despesa");

    const handleSave = async () => {
        try {

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
                <Button variant="primary" className="px-4" onClick={handleSave}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoriaModal;