import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Patient, SessionCreate } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { Textarea } from "@headlessui/react";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../api/PatientAPI";
import { getStatus } from "../../api/EstadoAPI";

type SessionFormProps = {
  errors: FieldErrors<SessionCreate>;
  register: UseFormRegister<SessionCreate>;
};
export default function SessionForm({ register, errors }: SessionFormProps) {
  const [open, setOpen] = useState(false)

  const {data: patients} = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients
  })

  const {data: status} = useQuery({
    queryKey: ['status'],
    queryFn: getStatus
  })


  return (
    <>
      <div className="space-y-4 py-6">
        <h3 className="font-bold text-2xl">
          Información de la Sesión
        </h3>
          <div>
          <label className="text-lg" htmlFor="lugarId">
            Paciente *
            </label>
            
            <select 
            className="w-full mt-2 border border-gray-300 p-3 rounded-xl hover:border-emerald-600"  
            {...register("paciente_id", {
                required: "El paciente es obligatorio",
              })}
            >
              <option className="hover:bg-orange-500" value="">Seleccionar Paciente</option>
              {patients?.map((patient : Patient) => (
                <option  key={patient.id} value={patient.id}>
                  {patient.nombre} {patient.apellido}
                </option>
              ))}
              
            </select>          
              {errors.paciente_id && <ErrorMessage>{errors.paciente_id.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-lg" htmlFor="fecha">
              Fecha *
            </label>

            <div className="relative">
            <input
              id="fecha"
              type="date"
              placeholder="Seleccionar"
              onClick={() => setOpen(!open)}
              className="w-full mt-2 p-3 rounded-xl border-gray-300 border"
         
              {...register("fecha")}
            />
            </div>
          </div>

          <div>
            <label className="text-lg" htmlFor="hora">
              Hora *
            </label>

            <div className="relative">
            <input
              id="hora"
              type="time"
              placeholder="Seleccionar"
              onClick={() => setOpen(!open)}
              className="w-full mt-2 p-3 rounded-xl border-gray-300 border"
         
              {...register("hora")}
            />
            </div>
          </div>     
        </div>
      </div>

      <div className="space-y-4 border-t border-gray-300 py-6">
        <div>
          <label className="text-lg" htmlFor="lugarId">
            Estado de Pago *
            </label>
            
            <select 
            className="w-full mt-2 border border-gray-300 p-3 rounded-xl hover:border-emerald-600"  
            {...register("estado_pago_id", {
                required: "El estado de pago es obligatorio",
              })}
            >
              <option className="hover:bg-orange-500" value="">Seleccionar estado</option>
              {status?.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.nombre}
                </option>
              ))}
              
            </select>          
              {errors.estado_pago_id && <ErrorMessage>{errors.estado_pago_id.message}</ErrorMessage>}
        </div>
      </div>

      {/* Actividades Realizadas*/}
      <div className="space-y-4 border-t border-gray-300 py-6">
        <h3 className="font-bold text-2xl mt-4">
          Actividades Realizadas
        </h3>
  
          <div>
            <input
              id="nombreMadre"
              type="text"
              placeholder="Describe las actividades realizadas durante la sesión..."
              className="w-full p-3 rounded-xl border-gray-300 border"
              {...register("actividad" )}
            />
          </div>
      </div>

      {/* OBSERVACIONES Y PROGRESO */}
      <div className="space-y-4 border-t border-gray-300 py-6">
        <h3 className="font-bold text-2xl mt-4">
          Observaciones y Progreso
        </h3>
        <div>
          <label className="text-lg" htmlFor="diagnostico">
              Observaciones *
            </label>
            <input
              id="observaciones"
              type="text"
              placeholder="Describe lo observado durante la sesión..."
              className="w-full p-3 mt-2 rounded-xl border-gray-300 border"
              {...register("observaciones")}
            />
            {errors.observaciones && <ErrorMessage>{errors.observaciones.message}</ErrorMessage>}
        </div>

        <div>
          <label className="text-lg" htmlFor="evaluacion">
            Evaluación *
          </label>
        </div>
        <Textarea
          className="w-full rounded-xl px-4 py-2 border-gray-300 border"
          placeholder="Evaluación del progreso del paciente"
          {...register("evaluacion")}
        />

      </div>

    </>
  );
}
