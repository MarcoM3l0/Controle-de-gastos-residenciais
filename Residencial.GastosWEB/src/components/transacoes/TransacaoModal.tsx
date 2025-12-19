import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toastSucesso, toastErro } from "../../utils/toast";

import type { PessoaTabela as Pessoa } from "../../types/pessoaDTO";
import type { CategoriaTabela as Categoria } from "../../types/categoriaDTO";

import { CreateTransacao } from "../../Services/transacaoService";

/*
    Propiedades esperadas pelo modal
    - show: controla a visibilidade do modal
    - onClose: função para fechar o modal
    - onSave: executado após salvar com sucesso 
    - pessoas: lista de pessoas cadastradas
    - categorias: lista de categorias cadastradas
*/
interface TransacaoModalProps {
    show: boolean;
    onClose: () => void;
    onSave: () => void;
    pessoas: Pessoa[];
    categorias: Categoria[];
}

/*
    Modal responsável pelo cadastro de novas transações.

    Regras de negócios:
    - Campos obrigatórios (descrição, valor, pessoa e categoria)
    - Valor deve ser maior que zero

    As validações mais complexas ficam no backend.
*/
const TransacaoModal: React.FC<TransacaoModalProps> = ({ show, onClose, onSave, pessoas, categorias }) => {

    // Estados locais do formulário
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState<number | "">("");
    const [tipo, setTipo] = useState<"Despesa" | "Receita">("Despesa");
    const [pessoaId, setPessoaId] = useState<number | "">("");
    const [categoriaId, setCategoriaId] = useState<number | "">("");

    // Estado do botão Salvar
    const [botaoSalvar, isBotaoSalvar] = useState(false);

    /*
        Função responsável por salvar a Transação.
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
            if (valor === "" || valor <= 0) {
                toastErro("Valor deve ser maior que zero!");
                return;
            }
            if (pessoaId === "" || categoriaId === "") {
                toastErro("Pessoa e Categoria são obrigatórios!");
                return;
            }

            await CreateTransacao({
                descricao,
                valor,
                tipo,
                pessoaId,
                categoriaId
            })


            toastSucesso("Transação registrada com sucesso!")

            onSave();

            setDescricao("");
            setValor("");
            setTipo("Despesa");
            setPessoaId("");
            setCategoriaId("");

            onClose();

        } catch (error: any) {
            toastErro(
                error?.response?.data?.message ||
                "Erro ao cadastrar transação"
            )
        } finally {
            isBotaoSalvar(false);
        }
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
                        <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value as "Despesa" | "Receita")}>
                            <option value="Despesa">Despesa</option>
                            <option value="Receita">Receita</option>
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
                <Button variant="secondary" className="px-4" onClick={onClose} >
                    Cancelar
                </Button>
                <Button variant="primary" className="px-4" onClick={handleSave} disabled={botaoSalvar}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TransacaoModal;
