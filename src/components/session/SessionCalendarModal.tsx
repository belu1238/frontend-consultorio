import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { type SessionCreate } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSession } from "../../api/PatientAPI";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import SessionForm from "./SessionForm";

export default function SessionCalendarModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalPatient = queryParams.get("newSession");
  const show = modalPatient ? true : false;

  const initialValues: SessionCreate = {
    paciente_id: 0,
    fecha: "",
    hora: "",
    observaciones: "",
    actividad: "",
    evaluacion: "",
    estado_pago_id: 0    
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryCLient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createSession,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      queryCLient.invalidateQueries({ queryKey: ["sessionsByDate"] });
      navigate("/calendario");
      reset();
    },
  });

  const handleForm = (formData: SessionCreate) => {
    // 1. Extraemos el pacienteId que el usuario seleccionó en el <select> del formulario
    const idSeleccionado = formData.paciente_id;
   

    // 2. Verificamos que no sea 0 o vacío antes de enviar
    if (!idSeleccionado || idSeleccionado === 0) {
      toast.error("Por favor, selecciona un paciente");
      return;
    }
    mutate(formData);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
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
                    Nueva Sesión
                  </Dialog.Title>

                  <form
                    className="mt-10 space-y-3"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate // para evitar las validaciones de html5 y poder hacerla yo
                  >
                    <SessionForm register={register} errors={errors} />
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        className="border border-gray-300 p-4 rounded-lg hover:bg-amber-600 cursor-pointer text-lg"
                        onClick={() => navigate(location.pathname, { replace: true })}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-600 p-4 text-white rounded-lg cursor-pointer text-lg"
                      >
                        Guardar Sesión
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
