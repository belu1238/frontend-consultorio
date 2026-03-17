import { useForm } from "react-hook-form";
import type { ConfirmAccount, NewPasswordForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type NewPasswordFormProps = {
    token: ConfirmAccount['token']
}
export default function NewPasswordForm({token} : NewPasswordFormProps) {
    const navigate = useNavigate()
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: "",
  };

  const {register, handleSubmit, watch, reset, formState: { errors }} = useForm({ defaultValues: initialValues });

  const password = watch("password");

  const {mutate} = useMutation({
    mutationFn: resetPassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
        toast.success(data)
        reset()
        navigate('/auth/login')
    }
  })

  const newHandlePassword = (formData: NewPasswordForm) => {
    const data = {
        formData,
        token} 
        mutate(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(newHandlePassword)} noValidate>
        <div className="grid grid-cols-1 space-y-3 mb-6">
          <label htmlFor="email" className="text-2xl">
            Contraseña
          </label>
          <input
            id="email"
            type="password"
            placeholder="tu@email.com"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3 mb-6">
          <label htmlFor="email" className="text-2xl">
            Repetir contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="tu@email.com"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: "La contraseña es obligatoria",
              validate: value => value === password || "Las contraseñas no coinciden"
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Establecer Contraseña"
          className="bg-emerald-600 hover:bg-emerald-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
