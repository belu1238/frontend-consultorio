import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { type PatientCreate } from "../../types";
import PatientForm from "./PatientForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "../../api/PatientAPI";
import { toast } from "react-toastify";
import { useLocation, useNavigate} from "react-router-dom";

export default function CreatePatient() {
  const navigate = useNavigate();
  const queryCLient = useQueryClient();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalPatient = queryParams.get("newPatient");
  const show = modalPatient ? true : false;

  const activeFolderId = localStorage.getItem("folderId"); // Obtener el valor del lugar de atención activo desde el localStorage

  const initialValues: PatientCreate = {
    nombre: "",
    apellido: "",
    dni: 0,
    fecha_nacimiento: "",
    IdTipoLugarAtencion: activeFolderId ? parseInt(activeFolderId) : 0, 
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });


  const { mutate } = useMutation({
    mutationFn: createPatient,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      queryCLient.invalidateQueries({ queryKey: ["patients", activeFolderId] });
      navigate(location.pathname, {replace: true}) // Cerrar el modal después de guardar el paciente
      reset();
    },
  });

  const handleForm = (formData: PatientCreate) => {
    const data = {
      ...formData,
      IdTipoLugarAtencion: activeFolderId ? parseInt(activeFolderId) : 0, // Asegurarse de que el valor sea un número
    }
    mutate(data);
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
                    Nuevo Paciente
                  </Dialog.Title>

                  <form
                    className="mt-10 space-y-3"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate // para evitar las validaciones de html5 y poder hacerla yo
                  >
                    <PatientForm register={register} errors={errors} />
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
                        Guardar Paciente
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
