import api from '../lib/axios'
import { isAxiosError } from "axios";

export async function getObrasSociales() {
    try {
        const { data } = await api(`/obra-social`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
