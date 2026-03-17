import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from 'react-router-dom';
import type { ConfirmAccount } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { validateToken } from "../../api/AuthAPI";

type NewPasswordTokenProps =  {
    token: ConfirmAccount['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}
export default function NewPasswordToken({token, setToken, setIsValidToken} : NewPasswordTokenProps) {
    const {mutate} = useMutation({
        mutationFn: validateToken,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)
        }
    })

    const handleChange = (token: ConfirmAccount['token']) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmAccount['token']) => mutate({token})
  return (
    <>
      <form className="space-y-8 p-10 bg-white">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border" />
          </PinInput>
        </div>
      </form>

      <nav className="flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-600 font-normal"
        >
          <span className="hover:text-emerald-600">
            Solicitar un nuevo Código
          </span>
        </Link>
      </nav>
    </>
  );
}
