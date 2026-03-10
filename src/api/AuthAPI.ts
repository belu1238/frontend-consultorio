import { isAxiosError } from "axios";
import type { ConfirmAccount, RegisterForm } from "../types";
import api from "../lib/axios";


export async function createAccount(formData: RegisterForm) {
    try {
        const { data } = await api.post(`/auth/register`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
                    throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData: ConfirmAccount) {
    try {
        const { data } = await api.post(`/auth/confirm-account`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
                    throw new Error(error.response.data.error)
        }
    }
}