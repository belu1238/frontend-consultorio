import { isAxiosError } from "axios"
import api from "../lib/axios"
import { statusListSchema } from "../types"

export async function getStatus() {
    try{
        const { data } = await api(`/estado-pago`)
        const response = statusListSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}