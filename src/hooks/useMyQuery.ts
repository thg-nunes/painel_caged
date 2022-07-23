import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { ContextGlobal } from "../contexts/context"
import { getDadosGraficos } from "../services/pinot"

export const useMyQyery = (filter: string) => {
    const context = useContext(ContextGlobal)

    const { data, isLoading, isError } = useQuery([filter, context], async () => {
        const response = await getDadosGraficos(filter, context)
        return response
    }, {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })

    return { data, isLoading, isError }
}