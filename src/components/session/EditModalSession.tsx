import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import SessionForm from "./SessionForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { Patient, SessionEdit } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { updateSession } from "../../api/PatientAPI";
import { toast } from "react-toastify";

type EditModalSessionProps = {
    data: SessionEdit,
    pacienteId: Patient["id"],
}

export default function EditModalSession({data, pacienteId} : EditModalSessionProps) {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const sesionId = queryParams.get('editSession')

    const initialValues : SessionEdit = {
        paciente_id: data.paciente_id,
        fecha: data.fecha,
        hora: data.hora,
        estado_pago_id: data.estado_pago_id,
        actividad: data.actividad,
        observaciones: data.observaciones,
        evaluacion: data.evaluacion
    }

    const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
      mutationFn: updateSession,
      onError: (error) => toast.error(error.message),
      onSuccess: (data) => {
        toast.success(data)
        navigate(`/pacientes/${pacienteId}`)
      }
    })

    const handleEditSession = (formData : SessionEdit) => {
      const data = {
        formData,
        sesionId: sesionId ?? '',
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
                  onClose={() => navigate(location.pathname,{replace: true})}
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
                            Editar Sesión
                          </Dialog.Title>
        
                          <form
                            className="mt-10 space-y-3"
                            onSubmit={handleSubmit(handleEditSession)}
                            noValidate // para evitar las validaciones de html5 y poder hacerla yo
                          >
                            <SessionForm  register={register} errors={errors}/>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                              <button
                                type="button"
                                className="border border-gray-300 p-4 rounded-lg hover:bg-amber-600 cursor-pointer text-lg"
                                onClick={() => {}}
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

