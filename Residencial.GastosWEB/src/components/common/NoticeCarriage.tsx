import React from "react";
import { Modal, Button } from "react-bootstrap";

/*
    Propiedades esperadas NoticeCarriage.
    - show: controla a exibição do modal
    - onClose: função chamada ao fechar o modal
*/
interface NoticeCarriageProps {
    show: boolean,
    onClose: () => void
}

/*
    Modal de aviso de carregamento lento devido ao plano gratuito do Render.

    Este modal informa ao usuário que o carregamento pode demorar um pouco
    mais do que o esperado quando a API está em repouso.
*/
const NoticeCarriage: React.FC<NoticeCarriageProps> = ({ show, onClose }) => {
    return (
        <Modal show={show} onHide={onClose} centered >
            <Modal.Header closeButton>
                <Modal.Title>Aviso de Carregamento Lento</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>
                    🐢 O servidor está <strong>tirando uma soneca...</strong>
                    <br /><br />
                    Como usamos <strong>hospedagem gratuita na Render</strong>, pode demorar alguns segundinhos
                    para ele acordar e trazer os dados.
                    <br /><br />
                    A primeira requisição pode levar até <strong>20 segundos</strong>.<br />
                    Obrigado por esperar, prometo que ele já está passando café ☕.
                </p>
                <Modal.Footer>
                    <Button variant="primary" onClick={onClose}>
                        Entendi
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

export default NoticeCarriage;