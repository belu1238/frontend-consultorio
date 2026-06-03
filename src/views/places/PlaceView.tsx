import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFolders } from "../../api/FolderAPI";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineEdit} from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { createFolder } from "../../api/FolderAPI";
import type { FolderFormData } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import EditModalData from "../../components/folders/EditModalData";
import { useState } from "react";

export default function PlaceView() {
    const [editingFolder, setEditingFolder] = useState<number | string | null>(null);
    const { data, isLoading } = useQuery({
        queryKey: ['places'],
        queryFn: () => getFolders(),
        retry: false
    })

    const{register, handleSubmit, reset, formState: {errors}}  = useForm({defaultValues: {nombre: ""}})

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createFolder,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['places']})
            reset()
        }
    })

    const handleForm = (formData : FolderFormData) => mutate(formData)

    if(isLoading) return <p>Cargando...</p>

    return ( 
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-4xl">
                <div className="text-center space-y-6">
                
                <h1 className="text-5xl font-serif">Selecciona el lugar de atención</h1>
                <p className="text-zinc-500 text-lg font-medium p-2">Elegí dónde vas a trabajar hoy para ver los pacientes correspondientes.</p>
                </div>

                <div className="grid gap-4 mt-6">
                    {data?.map((folder) => (
                        <div
                            key={folder.id}
                            className="group flex items-center gap-4 p-6 bg-white rounded-md shadow cursor-pointer hover:bg-stone-100 hover:border-emerald-600 transition-colors"
                        >
                            <div className="w-14 h-14 rounded-lg bg-stone-200 flex items-center justify-center">
                                <FiMapPin className="w-8 h-8 text-emerald-700"/>
                            </div>
                            <h2 className="text-xl font-serif">{folder.nombre}</h2>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 ml-auto">
                                <button
                                onClick={(e) =>{
                                    e.stopPropagation() // para que no se active el onClick del padre
                                    setEditingFolder(folder.id)}}
                                className="bg-orange-500 hover:bg-orange-600 p-2 rounded-md text-white transition-colors">
                                    <MdOutlineEdit className="h-6 w-6 " />

                                </button>
                                    {editingFolder === folder.id && (
                                        <EditModalData 
                                        data={folder}
                                        folderId={folder.id}
                                        onClose={() => setEditingFolder(null)}
                                        />
                                    )}
                            </div>
                        </div>
                    ))}
                </div>

                <form
                className="flex items-center justify-center gap-4 mt-6"
                onSubmit={handleSubmit(handleForm)}>
                    <input 
                    id="nombre"
                    type="text"
                    className="text-lg font-medium border border-gray-300 rounded-lg px-24 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Nuevo lugar de atención"
                    {...register("nombre", {
                        required: "El nombre del lugar de atención es obligatorio"
                    })}
                    />
                    {errors.nombre && (
                        <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                    )}
                    <button 
                    type="submit"
                    className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 flex items-center p-4
                    rounded-lg text-white font-bold text-lg transition-colors gap-2">
                        <FaPlus className="h-5 w-5"/> Crear
                    </button>
                </form>
            </div>
        </div> 
    );
}

