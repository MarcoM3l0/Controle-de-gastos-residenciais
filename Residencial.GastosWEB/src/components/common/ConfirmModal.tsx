import type React from "react";
import { Trash2, Check, X } from "lucide-react";
import { Button, Modal, ModalHeader } from "react-bootstrap";

/*
    Propriedades do modal de confirmação.
    - show: controla se o modal está visível
    - nomePessoa: nome da pessoa exibido para reforçar a ação ao usuário
    - onConfirm: callback executado quando o usuário confirma a ação
    - onClose: callback executado ao cancelar ou fechar o modal
*/
interface ConfirmModalProps {
    show: boolean,
    nomePessoa: string
    onConfirm: () => void,
    onClose: () => void
}

/*
    Modal genérico de confirmação.

    Responsabilidades:
    - Exibir uma mensagem de confirmação ao usuário
    - Não conter regras de negócio
    - Apenas disparar callbacks de confirmação ou cancelamento

    Observação:
    As validações mais complexas ficam no backend.
*/
export const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, nomePessoa, onConfirm, onClose }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <ModalHeader closeButton>
                <Modal.Title>
                    Tem certeza que deseja excluir esta pessoa?
                </Modal.Title>
            </ModalHeader>
            <Modal.Body>
                <Trash2 /> {nomePessoa}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="px-4" onClick={onClose}>
                    <X /> Cancelar
                </Button>
                <Button variant="primary" className="px-4" onClick={onConfirm}>
                    <Check /> Sim
                </Button>
            </Modal.Footer>
        </Modal>
    )
}