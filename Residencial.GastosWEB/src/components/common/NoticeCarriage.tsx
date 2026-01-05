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
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Aviso de Carregamento Lento</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>
                    Os dados podem demorar um pouco para aparecer devido à hospedagem
                    gratuita do backend na plataforma Render. Em alguns casos, especialmente
                    após um período sem acessos, a API pode levar mais de <strong>20
                        segundos</strong> para responder na primeira requisição.
                </p>
                <p>
                    Agradecemos a sua paciência — isso faz parte das limitações do plano gratuito.
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