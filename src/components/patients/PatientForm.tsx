import { type FieldErrors, type UseFormRegister, type Control, Controller, useWatch } from "react-hook-form";
import type { PatientCreate } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { Textarea } from "@headlessui/react";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

import "react-day-picker/dist/style.css";

import { useQuery } from "@tanstack/react-query";
import { getEspecialidades } from "../../api/TipoEspecialidadAPI";
import { getObrasSociales } from "../../api/ObraSocialAPI";
import { getEspecialistas } from "../../api/EspecialistaAPI";

type PatientFormProps = {
  errors: FieldErrors<PatientCreate>;
  register: UseFormRegister<PatientCreate>;
  control: Control<PatientCreate> // para usar useWatch 
};
export default function PatientForm({ register, errors, control }: PatientFormProps) {

  const [open, setOpen] = useState(false)

  const {data : especialidades} = useQuery({
    queryKey: ['especialidades'],
    queryFn: getEspecialidades
  })

  const {data : obrasSociales} = useQuery({
    queryKey: ['obrasSociales'],
    queryFn: getObrasSociales
  })

  const especialidadSeleccionada = useWatch({
    control,
    name: "IdtipoEspecialidad",
  })

  const {data: especialistas, isLoading: loadingEspecialistas} = useQuery({
    queryKey: ['especialistas', especialidadSeleccionada],
    queryFn: () => getEspecialistas(especialidadSeleccionada),
    enabled: !!especialidadSeleccionada,
  })

  const especialistaOptions = especialistas?.map((esp) => ({
    value: esp.id,
    label: `${esp.apellido}, ${esp.nombre}`,
  })) || [];

  const [mostrarSegundoTutor, setMostrarSegundoTutor] = useState(false);

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
        </div>
      </div>

      {/* Tutores */}
      <div className="space-y-4 border-t border-gray-300 py-6">
        <h3 className="font-bold text-2xl mt-4">
          Tutores
        </h3>
         <div>
            <label className="text-lg" htmlFor="tutor1_nombre">
              Nombre *
            </label>
            <input
              id="tutor1_nombre"
              type="text"
              placeholder="Nombre del tutor"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("tutor1.nombre", {
                required: "El nombre del tutor es obligatorio",
              })}
            />
            {errors.tutor1?.nombre && (
              <ErrorMessage>{errors.tutor1.nombre.message}</ErrorMessage>
            )}
          </div>

           <div>
            <label className="text-lg" htmlFor="tutor1_apellido">
              Apellido *
            </label>
            <input
              id="tutor1_apellido"
              type="text"
              placeholder="Apellido del tutor"
              className="w-full p-3 rounded-lg border-gray-300 border"
              {...register("tutor1.apellido", {
                required: "El apellido del tutor es obligatorio",
              })}
            />
            {errors.tutor1?.apellido && (
              <ErrorMessage>{errors.tutor1.apellido.message}</ErrorMessage>
            )}
          </div>

          {mostrarSegundoTutor ? (
            <div className="space-y-2 pt-2 border-t border-dashed border-stone-200 animate-fade-in">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Segundo Tutor</span>
              <button
                type="button"
                onClick={() => setMostrarSegundoTutor(false)}
                className="text-xs text-red-500 hover:underline"
              >
                Quitar segundo tutor
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">   
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full p-3 rounded-xl border border-stone-200 bg-white"
                  {...register("tutor2.nombre")}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Apellido"
                  className="w-full p-3 rounded-xl border border-stone-200 bg-white"
                  {...register("tutor2.apellido")}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Botón dinámico al estilo de tu diseño si no se llegó al límite */
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setMostrarSegundoTutor(true)}
              className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200"
            >
              + Agregar un segundo tutor (Máx. 2)
            </button>
          </div>
          )}
      </div>

      {/* Obra Social */}
       <div className="space-y-4 border-t border-gray-300">
        <h3 className="font-bold text-2xl mt-8">
          Cobertura Medica / Obra Social
        </h3>

        <div>
          <label htmlFor="lugarId">
            Obra Social
            </label>
            
            <select 
            className="w-full mt-4 border border-gray-300 p-3 rounded-lg"  
            {...register("IdObraSocial")}
            >
              <option value="">Ninguna / Particular</option>
              {obrasSociales?.map((obraSocial) => (
                <option key={obraSocial.id} value={obraSocial.id}>
                  {obraSocial.nombre}
                </option>
              ))}
              
            </select>          
        </div>

        <div>
          <label>Numero Afiliado:</label>
          <input
            type="text"
            placeholder="Numero de Afiliado"
            className="w-full p-3 rounded-lg border-gray-300 border"
            {...register("numeroAfiliado")}
          />
        </div>

        <div>
          <input
            type="date"
            className="w-full p-3 rounded-lg border-gray-300 border"
            {...register("fechaAlta")}
          />
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
          <input
            type="date"
            className="w-full p-3 rounded-lg border-gray-300 border"
            {...register("fecha")}
          />
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
          {...register("detalle_paciente")}
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
          <select
            id='IdTipoEspecialidad'
            className="w-full p-3 rounded-lg border-gray-300 border"
            {...register('IdtipoEspecialidad', {
              required: "La especialidad es obligatoria",
            })}
          >
            <option value="">Seleccionar Especialidad</option>
            {especialidades?.map((esp) => (
              <option key={esp.id} value={esp.id}>{esp.nombre}</option>
            ))}
          </select>
          {errors.IdtipoEspecialidad && <ErrorMessage>{errors.IdtipoEspecialidad.message}</ErrorMessage>}
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-700 block mb-1">Profesional Asignado *</label>
          <Controller
            name="especialista"
            control={control}
            rules={{ required: "El profesional es obligatorio" }}
            render={({ field: { onChange, value, ref } }) => {
              
              // Resolvemos el valor visual actual del select
              let currentSelection = null;
              if (value && 'id' in value && value.id) {
                currentSelection = especialistaOptions.find(opt => opt.value === value.id) || null;
              } else if (value && 'nombre' in value && value.nombre) {
                const nombreCompleto = `${value.apellido}, ${value.nombre}`;
                currentSelection = { value: nombreCompleto, label: nombreCompleto };
              }

              return (
                <CreatableSelect
                  ref={ref}
                  isClearable
                  isDisabled={!especialidadSeleccionada}
                  isLoading={loadingEspecialistas}
                  placeholder={especialidadSeleccionada ? "Busque un profesional o escriba uno nuevo..." : "Seleccione primero una especialidad"}
                  formatCreateLabel={(inputValue) => `+ Agregar nuevo profesional: "${inputValue}"`}
                  options={especialistaOptions}
                  value={currentSelection}
                  onChange={(newValue) => {
                    if (!newValue) {
                      onChange(null);
                    } else if (typeof newValue.value === 'number') {
                      // Caso Existe: pasamos el objeto con el ID
                      onChange({ id: newValue.value });
                    } else {
                      // Caso Nuevo: desestructuramos el string escrito "Apellido, Nombre" o "Nombre Apellido"
                      const partes = String(newValue.value).split(" ");
                      const nombre = partes[0] || "Nuevo";
                      const apellido = partes.slice(1).join(" ") || "Profesional";
                      onChange({ id: null, nombre, apellido });
                    }
                  }}
                  classNames={{
                    control: () => "border border-stone-300 rounded-lg p-0.5 bg-white text-base",
                  }}
                />
              );
            }}
          />
          {errors.especialista && <ErrorMessage>{errors.especialista.message}</ErrorMessage>}
        </div>
        </div>
    </>
  );
}
