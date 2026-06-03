import api from "../lib/axios";
import { dashboardFolderSchema,  patientFolderListSchema, type Folder, type FolderFormData } from "../types";
import { isAxiosError } from "axios";

export async function createFolder(formData : FolderFormData){
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

export async function getFolderById(id: Folder['id']){
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
    formData : FolderFormData,
    folderId : Folder['id']
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

export async function deleteFolder(id: Folder['id']) {
    try {
        const { data } = await api.delete<string>(`/lugares/${id}`)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getPatientByFolder(id: Folder['id']){
    try {
        const { data } = await api(`/lugares/${id}/pacientes`)
        const response = patientFolderListSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}