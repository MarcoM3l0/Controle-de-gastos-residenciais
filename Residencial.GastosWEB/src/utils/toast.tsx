/*
    Utiliza notificações do tipo toast para informar
    o usuário sobre operações bem-sucedidas ou erros.
 */


import { toast } from "react-toastify";

export const toastSucesso = (mensagem: string) => {
    toast.success(mensagem)
}

export const toastErro = (mensagem: string) => {
    toast.error(mensagem)
}