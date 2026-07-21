import api from '../lib/axios'
import { isAxiosError } from "axios";

export async function getEspecialidades() {
    try {
        const { data } = await api(`/tipo-especialidad`)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}