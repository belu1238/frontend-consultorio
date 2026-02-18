import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import type { Patient, PatientCreate } from "../../types";
import PatientForm from "./PatientForm";
import { useMutation } from "@tanstack/react-query";
import { updatePatient } from "../../api/PatientAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type EditModalPatientProps = {
  data: PatientCreate;
  pacienteId: Patient["id"];
  onClose: () => void;
};
export default function EditModalPatient({data, pacienteId, onClose }: EditModalPatientProps) {
  const navigate = useNavigate()

  const initialValues: PatientCreate = {
    nombre: data.nombre,
    apellido: data.apellido,
    dni: data.dni,
    fecha_nacimiento: data.fecha_nacimiento,
    edad: data.edad,
    nombre_madre: data.nombre_madre,
    nombre_padre: data.nombre_padre,
    obra_social: data.obra_social,
    numero_beneficiario: data.numero_beneficiario,
    cuit_obra_social: data.cuit_obra_social,
    situacion_frente_iva: data.situacion_frente_iva,
    diagnostico: data.diagnostico,
    medicacion: data.medicacion,
    colegio: data.colegio,
    horario_presupuesto: data.horario_presupuesto,
    profesionales: data.profesionales,
    historia_clinica: data.historia_clinica,
    lugar_id: data.lugar_id,
  };

  const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues: initialValues });
  
  const {mutate} = useMutation({
    mutationFn: updatePatient,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      navigate('/pacientes')
    }
  })

  const handleEditPatient = (formData : PatientCreate) => {
    const data = {
      formData,
      pacienteId
    }
    mutate(data)
  }
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={onClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16 overflow-y-auto">
                  <Dialog.Title
                    as="h3"
                    className="font-black text-4xl text-center  my-5"
                  >
                    Editar Paciente
                  </Dialog.Title>

                  <form
                    className="mt-10 space-y-3"
                    onSubmit={handleSubmit(handleEditPatient)}
                    noValidate // para evitar las validaciones de html5 y poder hacerla yo
                  >
                    <PatientForm register={register} errors={errors} />
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        className="border border-gray-300 p-4 rounded-lg hover:bg-amber-600 cursor-pointer text-lg"
                        onClick={onClose}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-600 p-4 text-white rounded-lg cursor-pointer text-lg"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
