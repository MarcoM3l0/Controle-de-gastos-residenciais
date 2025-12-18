import axios from "axios"

/*
    Instância centralizada do Axios para comunicação com a API backend.

    Objetivo:
    - Centralizar a configuração da URL base da API
    - Padronizar headers das requisições HTTP

    Arquitetura:
    - Este código NÃO contém regra de negócio
    - Apenas configura a comunicação HTTP
    - É utilizado pelos services
*/
export const api = axios.create({
    baseURL: "https://localhost:7091/api/",
    headers: {
        "Content-Type": "application/json"
    }
});