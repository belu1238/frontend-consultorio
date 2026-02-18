import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import FolderForm from "./FolderForm";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { Folder, FolderFormData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editFolder } from "../../api/FolderAPI";
import { toast } from "react-toastify";

type EditModalDataProps = {
    data: FolderFormData
    folderId: Folder['id']
}
export default function EditModalData({data, folderId}: EditModalDataProps) {
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}} = useForm<FolderFormData>({defaultValues: {
        nombre: data.nombre
    }})

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: editFolder,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['folders']})
            navigate('/')
        }
    })

    const handleEditForm = (formData: FolderFormData) => {
        const data = {
            formData,
            folderId
        }
        mutate(data)
    }
  return (
     <>
                <Transition appear show={true} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname,{replace: true})}> 
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
                                    <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                        <Dialog.Title
                                            as="h3"
                                            className="font-black text-4xl  my-5"
                                        >
                                            Editar Carpeta
                                        </Dialog.Title>
    
                                        <form className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleEditForm)}
                                        noValidate // para evitar las validaciones de html5 y poder hacerla yo
                                        >
                                            <FolderForm
                                            register={register}
                                            errors={errors}
                                            />
                                            <input
                                            type="submit"
                                            value='Guardar Cambios'
                                            className="bg-emerald-700 hover:bg-emerald-800 p-3 w-full text-white
                                            uppercase font-bold cursor-pointer transition-colors" 
                                            />
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
