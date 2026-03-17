import { useState } from "react";
import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswordForm from "../../components/auth/NewPasswordForm";
import type { ConfirmAccount } from "../../types";

export default function NewPasswordView() {
  const[token, setToken] = useState<ConfirmAccount['token']>('')  // se coloca aqui por que se requiere en ambos componentes
  const[isValidToken, setIsValidToken] = useState(false)

    return ( 
            <>
    <div className="flex flex-1 justify-center items-center min-h-full py-12 px-4 ">
      <div className="bg-white p-10 w-full max-w-lg rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-black">Restablecer contraseña</h1>
          <p className="text-2xl font-light text-gray-600 mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-emerald-600 font-bold"> por e-mail</span>
      </p>
        </div>

        {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>
        : <NewPasswordForm token={token}/>} 
      
      </div>
      </div>

    </>
    );
}

 