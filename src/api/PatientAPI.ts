import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardSchema, sessionDetailSchema, sessionListSchema, type Folder, type Patient, type PatientCreate, type SessionCreate } from "../types";
import type { Session } from "react-router-dom";

export async function getPatients() {
    try {
        const { data } = await api(`/pacientes`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getPatientById(pacienteId: Patient['id']) {
    try {
        const { data } = await api(`/pacientes/${pacienteId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type PatientType = {
    formData: PatientCreate
    folderId: Folder['id']
}

type EditPatientType = {
    formData: PatientCreate
    pacienteId: Patient['id']
}

export async function createPatient({formData, folderId} : PatientType) {
    try {
        const { data } = await api.post<string>(`lugares/${folderId}/pacientes`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePatient({formData, pacienteId} : EditPatientType) {
    try{
        const { data } = await api.put<string>(`pacientes/${pacienteId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

/* SESIONES */
export async function createSession(formData : SessionCreate) {
    try{
        const { data } = await api.post<string>(`pacientes/sesiones`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getSessionsByDate(fecha: string) {
    try{
        const { data } = await api(`pacientes/sesiones/fecha?fecha=${fecha}`)
        const response = sessionListSchema.safeParse(data)
        if(response.success){
            return response.data
        } else {
            console.error(response.error)
            return[]
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getSessionsByPatient(pacienteId: Patient['id']) {
    try{
        const { data } = await api(`pacientes/${pacienteId}/sesiones`)
        const response = sessionDetailSchema.safeParse(data)
        if(response.success){
            return response.data
        } else {
            console.error(response.error)
            return[]
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getSessionsByOrder() {
    try{
        const { data } = await api(`pacientes/dashboard`)
        const response = dashboardSchema.safeParse(data)
        if(response.success){
            return response.data
        } else {
            console.error(response.error)
            return{ recientes: [], proximas: []}
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
type editSession = {
    formData: SessionCreate
    sesionId: Session['id']
    pacienteId: Patient['id']
}

export async function updateSession({formData, sesionId, pacienteId} : editSession) {
    try{
        const { data } = await api.put<string>(`pacientes/${pacienteId}/sesiones/${sesionId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


