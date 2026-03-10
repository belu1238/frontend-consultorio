import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import type { LoginForm } from "../../types";

export default function LoginView() {
  const initialValues : LoginForm = {
    email: '',
    password: ''
  }

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})
  return (
    <>
    <div className="flex flex-1 justify-center items-center min-h-full py-12 px-4 ">
      <div className="bg-white p-12 w-full max-w-lg rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-black">Bienvenido</h1>
        </div>
        <form
          onSubmit={handleSubmit(() => {})}
          className=""
          noValidate
        >
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
            <label htmlFor="password" className="text-2xl ">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="*********"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          

          <div className="mt-6 flex items-center justify-end">
            <Link to="/auth/forgot-password" className="text-lg text-emerald-600 hover:text-emerald-500">¿Olvidaste tu contraseña?</Link>
          </div>

          <input
            type="submit"
            className="bg-emerald-600 hover:-translate-y-0.5 p-3 mt-6 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer hover:bg-emerald-700 transition"
            value="Iniciar Sesión"
          />

          <div className="relative my-8 text-center">
            <hr className="border-gray-300"/>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-gray-500 text-xl bg-white">o</span>
          </div>

      <nav className="flex justify-center items-center mt-4 gap-2">
        <p className="text-gray-600 text-lg">¿No tienes cuenta?</p>
        <Link
          className="text-center text-emerald-600 text-lg block cursor-pointer hover:underline"
          to={"/auth/register"}
        >
           Registrate aquí
        </Link>
      </nav>
        </form>
      </div>
      </div>

    </>
  );
}
