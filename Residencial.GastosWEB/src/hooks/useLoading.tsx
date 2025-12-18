import { useState } from "react"

export const useLoading = (isLoading: boolean) => {
    const [loading, setLoading] = useState(isLoading);

    return { loading, setLoading }
}