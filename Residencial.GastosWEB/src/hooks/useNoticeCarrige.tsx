import { useEffect, useState } from "react";

// Constantes para controle do aviso de carregamento lento
const NOTICE_CARRIAGE_STORAGE_KEY = "lastNoticeCarriageShown";
const NOTICE_CARRIAGE_EXPIRATION_TIME = 20 * 60 * 1000; // 20 minutos

/*
    Hook responsável por controlar a exibição do aviso
    sobre o possível atraso no carregamento da API hospedada
    no Render (plano gratuito).

    Observação:
    - O Render pode hibernar serviços após ~15 minutos de inatividade
    - Foi adotado um tempo de segurança de 20 minutos
*/
export const useNoticeCarriage = () => {

    // Estado que controla a exibição do modal
    const [showNoticeCarriage, setShowNoticeCarriage] = useState(false);

    /*
       Executado apenas uma vez na inicialização da aplicação.
       Decide se o aviso deve ser exibido com base no tempo
       desde a última exibição armazenada no localStorage.
   */
    useEffect(() => {

        // Verifica o último horário em que o aviso foi exibido
        const lastNoticeCarriage = localStorage.getItem(NOTICE_CARRIAGE_STORAGE_KEY);

        // Se nunca foi exibido, mostra o aviso
        if (!lastNoticeCarriage) {
            setShowNoticeCarriage(true);
            return
        }

        /* 
            Calcula o tempo decorrido desde a última exibição do aviso
            para decidir se deve ser mostrado novamente.
            Se passou do tempo de expiração, mostra o aviso novamente.
            Caso contrário, mantém oculto.
        */
        const elapsedTime = Date.now() - (lastNoticeCarriage ? parseInt(lastNoticeCarriage) : 0);

        // Se já passou o tempo de expiração, mostra o aviso novamente
        if (elapsedTime > NOTICE_CARRIAGE_EXPIRATION_TIME) {
            setShowNoticeCarriage(true);
        }

    }, []);

    /*
        Função chamada ao fechar o modal de aviso.
        Armazena o horário atual no localStorage para controle futuro.
    */
    const handleCloseNoticeCarriage = () => {
        localStorage.setItem(NOTICE_CARRIAGE_STORAGE_KEY, Date.now().toString());
        setShowNoticeCarriage(false);
    };

    return { showNoticeCarriage, handleCloseNoticeCarriage };
}