import { isAxiosError } from "axios";
import type { ConfirmAccount, ForgotPasswordForm, LoginForm, NewPasswordForm, RegisterForm, RequestConfirmationCodeForm } from "../types";
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

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const { data } = await api.post(`/auth/request-code`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
                    throw new Error(error.response.data.error)
        }
    }
}

export async function login(formData: LoginForm) {
    try {
        const { data } = await api.post(`/auth/login`, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
                    throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const { data } = await api.post(`/auth/forgot-password`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
                    throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData: ConfirmAccount) {
    try {
        const { data } = await api.post(`/auth/validate-token`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
                    throw new Error(error.response.data.error)
        }
    }
}

export async function resetPassword({formData, token} : {formData: NewPasswordForm, token: ConfirmAccount['token']}) {
    try {
        const { data } = await api.post(`/auth/reset-password/${token}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
                    throw new Error(error.response.data.error)
        }
    }
}