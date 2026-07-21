import api from "../lib/axios";
import { isAxiosError } from "axios";

export async function getEspecialistas() {
    try {
        const { data } = await api(`/especialistas`)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}