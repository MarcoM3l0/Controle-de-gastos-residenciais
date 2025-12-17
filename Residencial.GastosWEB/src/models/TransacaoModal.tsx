import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {TipoTransacao} from "../enum/TipoTransacao";
import type { Pessoa, Categoria } from "../types/tipos";

interface TransacaoModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (transacao: {
        descricao: string;
        valor: number;
        tipo: number;
        pessoaId: number;
        categoriaId: number;
    }) => void;
    pessoas: Pessoa[];
    categorias: Categoria[];
}

const TransacaoModal: React.FC<TransacaoModalProps> = ({ show, onClose, onSave, pessoas, categorias }) => {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState<number | "">("");
    const [tipo, setTipo] = useState<number>(TipoTransacao.Despesa);
    const [pessoaId, setPessoaId] = useState<number | "">("");
    const [categoriaId, setCategoriaId] = useState<number | "">("");

    const handleSave = () => {
        if (!descricao.trim()) {
            alert("Descrição é obrigatória!");
            return;
        }
        if (valor === "" || valor <= 0) {
            alert("Valor deve ser maior que zero!");
            return;
        }
        if (pessoaId === "" || categoriaId === "") {
            alert("Pessoa e Categoria são obrigatórios!");
            return;
        }

        onSave({
            descricao,
            valor: Number(valor),
            tipo,
            pessoaId: Number(pessoaId),
            categoriaId: Number(categoriaId)
        });

        // Resetar campos
        setDescricao("");
        setValor("");
        setTipo(TipoTransacao.Despesa);
        setPessoaId("");
        setCategoriaId("");
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Transação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            value={descricao}
                            placeholder="Ex: Alimentação, Aluguel..."
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                            type="number"
                            min={0.01}
                            step={0.01}
                            value={valor}
                            onChange={(e) => setValor(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select value={tipo} onChange={(e) => setTipo(Number(e.target.value))}>
                            <option value={TipoTransacao.Despesa}>Despesa</option>
                            <option value={TipoTransacao.Receita}>Receita</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pessoa</Form.Label>
                        <Form.Select value={pessoaId} onChange={(e) => setPessoaId(Number(e.target.value))}>
                            <option value="">Selecione...</option>

                            {/* Mapeia as pessoas para gerar as opções dinamicamente */}
                            {pessoas.map((p) => (
                                <option key={p.pessoaId} value={p.pessoaId}>{p.nome}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))}>
                            <option value="">Selecione...</option>

                            {/* Mapeia as categorias para gerar as opções dinamicamente */}
                            {categorias.map((c) => (
                                <option key={c.categoriaId} value={c.categoriaId}>{c.descricao}</option>
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

export default TransacaoModal;
