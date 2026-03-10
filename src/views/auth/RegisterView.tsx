import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import type { RegisterForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues : RegisterForm = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password") // revisar si los password son iguales

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const handleRegister = (formData : RegisterForm) => {
    mutate(formData)
  }
  return (
    <>
      <div className="flex flex-1 justify-center items-center min-h-full py-12 px-4 ">
        <div className="bg-white p-12 w-full max-w-lg rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-black">Crear cuenta</h1>
          </div>
          <p className="text-center text-gray-500 text-lg mb-6">
            Ingresa tus datos para registrarte
          </p>
          <form onSubmit={handleSubmit(handleRegister)} className="" noValidate>
            <div className="grid grid-cols-1 space-y-3 mb-6">
              <label htmlFor="nombre" className="text-2xl">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="tu nombre"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register("nombre", {
                  required: "El Nombre es obligatorio",
                })}
              />
              {errors.nombre && (
                <ErrorMessage>{errors.nombre.message}</ErrorMessage>
              )}
            </div>

            <div className="grid grid-cols-1 space-y-3 mb-6">
              <label htmlFor="apellido" className="text-2xl">
                Apellido
              </label>
              <input
                id="apellido"
                type="text"
                placeholder="tu apellido"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register("apellido", {
                  required: "El Apellido es obligatorio",
                })}
              />
              {errors.apellido && (
                <ErrorMessage>{errors.apellido.message}</ErrorMessage>
              )}
            </div>

            <div className="grid grid-cols-1 space-y-3 mb-6">
              <label htmlFor="email" className="text-2xl">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register("email", {
                  required: "El Email es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
            <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="contraseña" className="text-2xl ">
                Contraseña
              </label>
              <input
                id="contraseña"
                type="password"
                placeholder="*********"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres"
                  }
                })}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            <div className="grid grid-cols-1 space-y-3 mb-6">
              <label htmlFor="password_confirmation" className="text-2xl">
                Repetir contraseña
              </label>
              <input
                id="password_confirmation"
                type="password"
                placeholder="Repetir contraseña"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register("password_confirmation", {
                  required: "La contraseña de confirmación es obligatoria",
                  validate: (value) => value === password || "Las contraseñas no coinciden"
                })}
              />
              {errors.password_confirmation && (
                <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
              )}
            </div>

            <input
              type="submit"
              className="bg-emerald-600 hover:-translate-y-0.5 p-3 mt-6 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer hover:bg-emerald-700 transition"
              value="Crear cuenta"
            />

            <div className="relative my-8 text-center">
              <hr className="border-gray-300" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-gray-500 text-xl bg-white">
                o
              </span>
            </div>

            <nav className="flex justify-center items-center mt-4 gap-2">
              <p className="text-gray-600 text-lg">¿Ya tienes una cuenta?</p>
              <Link
                className="text-center text-emerald-600 text-lg block cursor-pointer hover:underline"
                to={"/auth/login"}
              >
                Inicia sesión
              </Link>
            </nav>
          </form>
        </div>
      </div>
    </>
  );
}
