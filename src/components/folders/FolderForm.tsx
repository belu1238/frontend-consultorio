import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { FolderFormData } from "../../types";

type FolderFormProps = {
    errors:  FieldErrors<FolderFormData>
    register: UseFormRegister<FolderFormData>
}

export default function FolderForm({register, errors} : FolderFormProps) {
    return ( 
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Nombre de la Carpeta</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la carpeta"
                    className="w-full p-3  border-gray-300 border"
                    {...register("nombre", {
                        required: "El nombre de la carpeta es obligatorio",
                    })}
                />
                {errors.nombre && (
                    <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                )}
            </div>
        </>
     );
}

