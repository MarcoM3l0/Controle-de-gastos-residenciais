import { useState } from "react"

// Hook genérico para controle de estado de carregamento.
export const useLoading = (isLoading: boolean) => {
    const [loading, setLoading] = useState(isLoading);

    return { loading, setLoading }
}