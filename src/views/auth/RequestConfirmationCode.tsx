import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import type { RequestConfirmationCodeForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function RequestConfirmationCode() {
    const navigate = useNavigate()
     const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            navigate('/auth/login')
            reset()
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData)
    }

    return ( 
        <>
         <div className="flex flex-1 justify-center items-center min-h-full py-12 px-4 ">
      <div className="bg-white p-10 w-full max-w-lg rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-black">Solicitar código de confirmación</h1>
          <p className="text-2xl font-light text-gray-600 mt-5">
        Coloca tu email para recibir {''}
        <span className=" text-emerald-600 font-bold">un nuevo código</span>
      </p>
        </div>
         <form
         onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-4 p-4 bg-white"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Email</label>
        <input
        type="email"
        placeholder="Tu email"
        className="flex items-center w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        {...register("email", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
        })}
        />
         {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        <input
            type="submit"
            className="bg-emerald-600 hover:-translate-y-0.5 p-3 mt-6 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer hover:bg-emerald-700 transition"
            value="Enviar codigó"
        />

        <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/login'
                    className="text-center text-gray-600 font-normal hover:text-gray-800"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-gray-600 font-normal hover:text-gray-800"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
        </nav>

      </form>
      </div>
      </div>
        </>
     );
}

