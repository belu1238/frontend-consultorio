import { z } from "zod";

/** Folders */
export const folderSchema = z.object({
    id: z.number(),
    nombre: z.string()
})

export const dashboardFolderSchema = z.array(
    folderSchema.pick({ id: true, nombre: true })
)
export type Folder = z.infer<typeof folderSchema>
export type FolderFormData = Pick<Folder, 'nombre'>


/** Pacientes */
export const patientSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    dni: z.coerce.string(),
    fecha_nacimiento: z.string(),
    edad: z.number(),
    nombre_madre: z.string(),
    nombre_padre: z.string(),
    obra_social: z.string(),
    numero_beneficiario: z.string(),
    cuit_obra_social: z.number(),
    situacion_frente_iva: z.string(),
    diagnostico: z.string(),
    medicacion: z.string(),
    colegio: z.string(),
    horario_presupuesto: z.string(),
    profesionales: z.string(),
    historia_clinica: z.string(),
    lugar_id: z.number() // Para LECTURA
})

export const patientFolderSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    dni: z.coerce.string(),
    fecha_nacimiento: z.string(),
    edad: z.number(),
    nombre_madre: z.string(),
    nombre_padre: z.string(),
    obra_social: z.string(),
    numero_beneficiario: z.string(),
    cuit_obra_social: z.number(),
    situacion_frente_iva: z.string(),
    diagnostico: z.string(),
    medicacion: z.string(),
    colegio: z.string(),
    horario_presupuesto: z.string(),
    profesionales: z.string(),
    historia_clinica: z.string(),
    lugar_id: z.number()
})

//Schema para listar
export const patientCardSchema = patientSchema.pick({ 
        id: true, 
        nombre: true, 
        apellido: true, 
        edad: true, 
        dni: true, 
        colegio: true,
        obra_social: true,
        diagnostico: true,
        lugar_id: true
})


export const patientCreateSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  dni: z.string(),
  fecha_nacimiento: z.string(),
  edad: z.number(),
  nombre_madre: z.string(),
  nombre_padre: z.string(),
  obra_social: z.string(),
  numero_beneficiario: z.string(),
  cuit_obra_social: z.number(),
  situacion_frente_iva: z.string(),
  diagnostico: z.string(),
  medicacion: z.string(),
  colegio: z.string(),
  horario_presupuesto: z.string(),
  profesionales: z.string(),
  historia_clinica: z.string(),
  lugar_id: z.number().min(1, "Debe seleccionar un lugar"), 
});

export const patientListSchema = z.array(patientCardSchema)
export const patientFolderListSchema = z.array(patientFolderSchema)
export type Patient = z.infer<typeof patientSchema>
export type PatientCreate = z.infer<typeof patientCreateSchema>
export type PatientCardList = z.infer<typeof patientCardSchema>
export type PatientList = z.infer<typeof patientListSchema>

/** ESTADOS */
export const statusSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    color: z.string()
})

export const statusListSchema = z.array(
    statusSchema.pick({ id: true, nombre: true })
)

export type Status = z.infer<typeof statusSchema>

// SESIONES
export const sessionSchema = z.object({
    id: z.number(),
    paciente_id: z.number(),
    estado_pago_id: z.number(),
    fecha: z.string(),
    hora: z.string().nullish(),
    observaciones: z.string(),
    actividad: z.string(),
    evaluacion: z.string().nullish(),
    estado_pago: statusSchema,
    paciente: patientSchema.pick({ nombre: true, apellido: true})
})

export const sessionListSchema = z.array( 
sessionSchema.pick({
    id: true,
    fecha: true,
    hora: true,
    estado_pago: true,
    paciente: true
})
)

export const sessionDetailSchema = z.array(
sessionSchema.pick({
    id: true,
    fecha: true,
    hora: true,
    actividad: true,
    observaciones: true,
    evaluacion: true,
    estado_pago: true,
})
)

export const sessionDashboardSchema = 
sessionSchema.pick({
    id: true,
    fecha: true,
    hora: true,
    actividad: true,
    observaciones: true,
    evaluacion: true,
    estado_pago: true,
    paciente: true
})

export const dashboardSchema = z.object({
    recientes: z.array(sessionDashboardSchema),
    proximas: z.array(sessionDashboardSchema)
})

export const sessionCreateSchema = z.object({
    paciente_id: z.number().min(1, "Debe seleccionar un paciente"),
    estado_pago_id: z.number().min(1, "Debe seleccionar un estado de pago"),
    fecha: z.string(),
    hora: z.string(),
    observaciones: z.string(),
    actividad: z.string(),
    evaluacion: z.string()
})

export const sessionEditSchema = z.object({
    paciente_id: z.number().min(1, "Debe seleccionar un paciente"),
    estado_pago_id: z.number().min(1, "Debe seleccionar un estado de pago"),
    fecha: z.string(),
    hora: z.string(),
    observaciones: z.string(),
    actividad: z.string(),
    evaluacion: z.string()
})

export type Session = z.infer<typeof sessionSchema>
export type SessionCreate = z.infer<typeof sessionCreateSchema>
export type SessionDetail = z.infer<typeof sessionDetailSchema>
export type SessionEdit = z.infer<typeof sessionEditSchema>

// User schemas
export const authSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string() 
})

type Auth = z.infer<typeof authSchema> 
export type LoginForm = Pick<Auth, 'email' | 'password'>
export type RegisterForm = Pick<Auth, 'nombre' | 'apellido' | 'email' | 'password' | 'password_confirmation'>
export type ConfirmAccount = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>



