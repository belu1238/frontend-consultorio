import api from "../lib/axios";
import { dashboardFolderSchema, tipoLugarAtencionSchema, type TipoLugarAtencion} from "../types";
import { isAxiosError } from "axios";

export async function createFolder(formData : TipoLugarAtencion){
    try {
        const { data } = await api.post('/lugares', formData)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFolders(){
    
    try {
        const { data } = await api(`/lugares`)
        const response = dashboardFolderSchema.safeParse(data)
        if(response.success){
            return response.data // Retorna los datos validados
        }
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFolderById(id: TipoLugarAtencion['id']){
    try {
        const { data } = await api(`/lugares/${id}`)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type FolderAPIType = {
    formData : TipoLugarAtencion,
    folderId : TipoLugarAtencion['id']
}

export async function editFolder({ formData, folderId } : FolderAPIType){
    try {
        const { data } = await api.put<string>(`/lugares/${folderId}`, formData)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteFolder(id: TipoLugarAtencion['id']) {
    try {
        const { data } = await api.delete<string>(`/lugares/${id}`)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getPatientByFolder(id: TipoLugarAtencion['id']){
    try {
        const { data } = await api(`/lugares/${id}/pacientes`)
        const response = tipoLugarAtencionSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}