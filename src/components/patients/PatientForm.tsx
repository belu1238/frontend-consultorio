import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PatientCreate } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { Textarea } from "@headlessui/react";
import { useState } from "react";


import "react-day-picker/dist/style.css";

import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../../api/FolderAPI";

type PatientFormProps = {
  errors: FieldErrors<PatientCreate>;
  register: UseFormRegister<PatientCreate>;
};
export default function PatientForm({ register, errors }: PatientFormProps) {

  const [open, setOpen] = useState(false)

  const {data} = useQuery({
    queryKey: ['folders'],
    queryFn: getFolders
  })

  return (
    <>
      <div className="space-y-4 py-6">
        <h3 className="font-bold text-2xl">
          Datos Personales
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-lg" htmlFor="nombre">
              Nombre *
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre del paciente"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("nombre", {
                required: "El nombre del paciente es obligatorio",
              })}
            />
            {errors.nombre && (
              <ErrorMessage>{errors.nombre.message}</ErrorMessage>
            )}
          </div>

          <div>
            <label className="text-lg" htmlFor="apellido">
              Apellido *
            </label>
            <input
              id="apellido"
              type="text"
              placeholder="Apellido del paciente"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("apellido", {
                required: "El apellido del paciente es obligatorio",
              })}
            />
            {errors.apellido && (
              <ErrorMessage>{errors.apellido.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-lg" htmlFor="dni">
              DNI
            </label>
            <input
              id="dni"
              type="text"
              placeholder="123456789"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("dni", {
                required: "El dni del paciente es obligatorio",
              })}
            />
            {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
          </div>

          <div>
            <label className="text-lg" htmlFor="fechaNacimiento">
              Fecha de Nacimiento *
            </label>

            <div className="relative">
            <input
              id="fechaNacimiento"
              type="date"
              placeholder="Seleccionar"
              onClick={() => setOpen(!open)}
              className="w-full p-3 rounded-lg border-gray-300 border"
         
              {...register("fecha_nacimiento")}
            />
            </div>
          </div>

          <div>
            <label className="text-lg" htmlFor="edad">
              Edad
            </label>
            <input
              id="edad"
              type="number"
              placeholder="8"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("edad", {
                required: "La edad del paciente es obligatoria",
              })}
            />
            {errors.edad && <ErrorMessage>{errors.edad.message}</ErrorMessage>}
          </div>
        </div>
      </div>

      {/* Datos de los Padres */}
      <div className="space-y-4 border-t border-gray-300 py-6">
        <h3 className="font-bold text-2xl mt-4">
          Datos de los Padres
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-lg" htmlFor="nombreMadre">
              Nombre de la Madre
            </label>
            <input
              id="nombreMadre"
              type="text"
              placeholder="Nombre de la madre"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("nombre_madre" )}
            />
          </div>

          <div>
            <label className="text-lg" htmlFor="nombrePadre">
              Nombre del Padre
            </label>
            <input
              id="nombrePadre"
              type="text"
              placeholder="Nombre del padre"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("nombre_padre")}
            />
          </div>
        </div>
      </div>

      {/* Obra Social */}
      <div className="space-y-4 border-t border-gray-300 py-6">
        <h3 className="font-bold text-2xl mt-4">
          Obra Social
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-lg" htmlFor="obraSocial">
              Obra Social
            </label>
            <input
              id="obraSocial"
              type="text"
              placeholder="OSDE, Swiss Medical, etc."
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("obra_social")}
            />
          </div>

          <div>
            <label className="text-lg" htmlFor="numeroBeneficiario">
              Numero de Beneficiario
            </label>
            <input
              id="numeroBeneficiario"
              type="text"
              placeholder="123456789"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("numero_beneficiario")}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-lg" htmlFor="cuitObraSocial">
              CUIT Obra Social
            </label>
            <input
              id="cuitObraSocial"
              type="number"
              placeholder="30123456789"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("cuit_obra_social")}
            />
          </div>

          <div>
            <label className="text-lg" htmlFor="situacionIVA">
              Situacion frente al IVA
            </label>
            <input
              id="situacionIVA"
              type="text"
              placeholder="Consumidor Final"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("situacion_frente_iva")}
            />
          </div>
        </div>
      </div>

      {/* Informacion Clinica */}
      <div className="space-y-4 border-t border-gray-300 py-6">
        <h3 className="font-bold text-2xl mt-4">
          Información Clínica
        </h3>
        <div>
          <label className="text-lg" htmlFor="diagnostico">
              Diagnostico
            </label>
            <input
              id="diagnostico"
              type="text"
              placeholder="Consumidor Final"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("diagnostico")}
            />
            {errors.diagnostico && <ErrorMessage>{errors.diagnostico.message}</ErrorMessage>}
        </div>

        <div>
          <label className="text-lg" htmlFor="medicacion">
            Medicación
          </label>
        </div>
        <Textarea
          className="w-full rounded-lg px-4 py-2 border-gray-300 border"
          placeholder="Medicación Actual"
          {...register("medicacion")}
        />

        <div>
          <label className="text-lg" htmlFor="historia_clinica">
            Historia Clinica
          </label>
        </div>
        <Textarea
          className="w-full rounded-lg p-6 border-gray-300 border"
          placeholder="Historial Clinico"
          {...register("historia_clinica")}
        />
      </div>

      {/* Informacion escolar */}
      <div className="space-y-4 border-t border-gray-300 py-6">
        <h3 className="font-bold text-2xl mt-4">
          Información Escolar y Profesional
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-lg" htmlFor="colegio">
              Colegio
            </label>
            <input
              id="colegio"
              type="text"
              placeholder="Nombre del Colegio"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("colegio")}
            />
          </div>

          <div>
            <label className="text-lg" htmlFor="horarioPresupuesto">
              Horario Presupuesto
            </label>
            <input
              id="horarioPresupuesto"
              type="text"
              placeholder="Lunes y Miercoles 15:00hs a 18:00hs"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("horario_presupuesto")}
            />
          </div>
        </div>

        <div>
          <label className="text-lg" htmlFor="profesionales">
            Profesionales
          </label>
          <input
            id="profesionales"
            type="text"
            placeholder="Profesionales a cargo"
            className="w-full p-3 rounded-lg border-gray-300 border"
            {...register("profesionales")}
          />
        </div>
      </div>

      {/* Organizacion */}
      <div className="space-y-4 border-t border-gray-300">
        <h3 className="font-bold text-2xl mt-8">
          Organización
        </h3>

        <div>
          <label htmlFor="lugarId">
            Lugar de Atención
            </label>
            
            <select 
            className="w-full mt-4 border border-gray-300 p-3 rounded-lg"  
            {...register("lugar_id", {
                required: "El lugar de atención es obligatorio",
              })}
            >
              <option value="">Seleccionar Lugar</option>
              {data?.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.nombre}
                </option>
              ))}
              
            </select>          
              {errors.lugar_id && <ErrorMessage>{errors.lugar_id.message}</ErrorMessage>}
        </div>
      </div>
    </>
  );
}
