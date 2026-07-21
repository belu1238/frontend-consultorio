import { z } from "zod";

/** Lugar atencion */
export const tipoLugarAtencionSchema = z.object({
    id: z.number(),
    nombre: z.string()
})

export const dashboardFolderSchema = z.array(
    tipoLugarAtencionSchema.pick({ id: true, nombre: true })
)
export type TipoLugarAtencion = z.infer<typeof tipoLugarAtencionSchema>

// Obra social
export const obraSocialSchema = z.object({
    id: z.number(),
    nombre: z.string(),   
})

export type ObraSocial = z.infer<typeof obraSocialSchema>

// Especialidades y profesionales
export const tipoEspecialidadSchema = z.object({
    id: z.number(),
    nombre: z.string()
})

export const especialistaSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    IdTipoEspecialidad: z.number()
})

export type TipoEspecialidad = z.infer<typeof tipoEspecialidadSchema>
export type Especialista = z.infer<typeof especialistaSchema>

// Tutores
export const tutorSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    IdPaciente: z.number()
})
export type Tutor = z.infer<typeof tutorSchema>

/** Pacientes */
export const patientSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    dni: z.coerce.string(),
    fecha_nacimiento: z.string(),
    edad: z.number(),
    horario_presupuesto: z.string(),
    detalle_paciente: z.string(),
    IdTipoLugarAtencion: z.number(),
})


//Schema para listar
export const patientCardSchema = patientSchema.pick({ 
        id: true, 
        nombre: true, 
        apellido: true, 
        edad: true, 
        dni: true, 
        IdTipoLugarAtencion: true
}).extend({
    colegio: z.string().optional(),
    obra_social: z.string().optional(),
    diagnostico: z.string().optional(),
})


export const patientCreateSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    dni: z.number().or(z.string().transform((val) => Number(val))),
    fecha_nacimiento: z.string(),
    horario_presupuesto: z.string().optional(),
    edad: z.number().optional(),
    
    // Información Clinica
    diagnostico: z.string().optional(),
    medicacion: z.string().optional(),
    detalle_paciente: z.string().optional(),

    // Tutores
    tutor1: z.object({
        nombre: z.string().min(1, "El nombre del tutor es obligatorio"),
        apellido: z.string().min(1, "El apellido del tutor es obligatorio"),
    }),

    tutor2: z.object({
        nombre: z.string().optional(),
        apellido: z.string().optional(),
    }),
    
    // Obra Social
    IdObraSocial: z.number().optional(),
    numeroAfiliado: z.string().optional(),
    fechaAlta: z.string().optional(),

    // diagnostico
    IdDiagnostico: z.number().optional(),
    fecha: z.string().optional(),

    // Información escolar y profesionales
    colegio: z.string(),
    IdtipoEspecialidad: z.number(),
    especialista: z.union([
        z.object({
            id: z.number(),
        }),
        z.object({
            id: z.literal(null).optional(), // No tiene ID todavía
            nombre: z.string(),
            apellido: z.string(),
        })
    ]),
    IdTipoLugarAtencion: z.number(),
});

export const patientListSchema = z.array(patientCardSchema)
export type Patient = z.infer<typeof patientSchema>
export type PatientCreate = z.infer<typeof patientCreateSchema>
export type PatientCardList = z.infer<typeof patientCardSchema>
export type PatientList = z.infer<typeof patientListSchema>

export const pacienteObraSocialSchema = z.object({
    id: z.number(),
    IdPaciente: z.number(),
    IdObraSocial: z.number(),
    numeroAfiliado: z.string(),
    fechaAlta: z.string(),
    fechaBaja: z.string()
})
export type PacienteObraSocial = z.infer<typeof pacienteObraSocialSchema>

export const pacienteEspecialistaSchema = z.object({
    id: z.number(),
    IdPaciente: z.number(),
    IdEspecialista: z.number(),
})
export type PacienteEspecialistaSchema = z.infer<typeof pacienteEspecialistaSchema>

/** MEDICACION */
export const medicacionSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    IdPaciente: z.number(),
    fechaRegistro: z.string()
})
export type Medicacion = z.infer<typeof medicacionSchema>

/** DIAGNOSTICO */
export const diagnosticoSchema = z.object({
    id: z.number(),
    IdPaciente: z.number(),
    fecha: z.string(),
    descripcion: z.string()
})
export type Diagnostico = z.infer<typeof diagnosticoSchema>

/** ARCHIVO DIAGNOSTICO */
export const archivoDiagnosticoSchema = z.object({
    id: z.number(),
    diagnosticoId: z.number(),
    nombre: z.string(),
    url: z.string(),
    fechaSubida: z.string()
})
export type ArchivoDiagnostico = z.infer<typeof archivoDiagnosticoSchema>

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



