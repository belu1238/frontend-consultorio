import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { FolderFormData } from "../../types";
import FolderForm from "./FolderForm";
import { createFolder } from "../../api/FolderAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateFolder() {
    const navigate = useNavigate()
    const location = useLocation() // obtengo la url
    const queryParams = new URLSearchParams(location.search) // obtengo el search que es donde aparece ?newFolder
    const modalFolder = queryParams.get('newFolder') // si existe newFolder en la url, modalFolder sera true
    const show = modalFolder ? true : false // para pasarle un booleano al modal

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: {nombre: ""}})

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createFolder,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['folders']})
            navigate('/')
            reset()
        }
    })

    const handleForm = (formData : FolderFormData) => mutate(formData) 

    return ( 
        <>
            <Transition appear show={show} as={Fragment}>
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
                                        Nueva Carpeta
                                    </Dialog.Title>

                                    <form className='mt-10 space-y-3'
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate // para evitar las validaciones de html5 y poder hacerla yo
                                    >
                                        <FolderForm
                                        register={register}
                                        errors={errors}
                                        />
                                        <input
                                        type="submit"
                                        value='Crear Carpeta'
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