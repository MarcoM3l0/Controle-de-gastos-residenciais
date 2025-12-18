/*
    Formata um valor numérico para o padrão monetário brasileiro (Real).

    Centralizar essa lógica em um utilitário evita:
    - repetição de código nos componentes
    - formatações inconsistentes ao longo da aplicação
*/
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
};