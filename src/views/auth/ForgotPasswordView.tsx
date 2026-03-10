import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function ForgotPasswordView() {
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {}})

    return ( 
        <>
        <div className="flex flex-1 justify-center items-center min-h-full py-12 px-4 ">
      <div className="bg-white p-12 w-full max-w-lg rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-black">Recuperar contraseña</h1>
          <p className="text-xl text-gray-600 mt-4">Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña</p>
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

          <input
            type="submit"
            className="bg-emerald-600 hover:-translate-y-0.5 p-3 mt-6 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer hover:bg-emerald-700 transition"
            value="Enviar enlace de recuperación"
          />

      <nav className="flex justify-center items-center mt-4 gap-2">
        <p className="text-gray-600 text-lg">Volver al </p>
        <Link
          className="text-center text-emerald-600 text-lg block cursor-pointer hover:underline"
          to={"/auth/login"}
        >
           inicio de sesión
        </Link>
      </nav>
        </form>
      </div>
      </div>
        </>
     );
}

