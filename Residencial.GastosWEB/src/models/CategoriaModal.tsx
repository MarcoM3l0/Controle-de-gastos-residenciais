import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FinalidadeCategoria } from "../types/FinalidadeCategoria";

// Extraímos os nomes das chaves ("Despesa" | "Receita" | "Ambas") para facilitar o uso no estado
type FinalidadeKeys = keyof typeof FinalidadeCategoria;

interface CategoriaModalProps {
    show: boolean;
    onClose: () => void;
    // O onSave deve enviar o valor numérico (1, 2 ou 3) que o backend espera
    onSave: (descricao: string, finalidade: number) => void;
}

const CategoriaModal: React.FC<CategoriaModalProps> = ({ show, onClose, onSave }) => {
    const [descricao, setDescricao] = useState("");
    
    // Inicializamos o estado com a chave "Despesa"
    const [finalidadeKey, setFinalidadeKey] = useState<FinalidadeKeys>("Despesa");

    const handleSave = () => {
        if (descricao.trim() === "") {
            alert("A descrição é obrigatória");
            return;
        }

        // Buscamos o valor numérico correspondente à chave selecionada
        const valorNumerico = FinalidadeCategoria[finalidadeKey];
        
        onSave(descricao, valorNumerico);
        
        // Limpa o estado após salvar
        setDescricao("");
        setFinalidadeKey("Despesa");
        onClose();
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
                            value={finalidadeKey}
                            onChange={(e) => setFinalidadeKey(e.target.value as FinalidadeKeys)}
                        >
                            {/* Mapeamos as chaves do objeto para gerar as opções dinamicamente */}
                            {Object.keys(FinalidadeCategoria).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
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