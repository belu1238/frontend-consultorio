import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import type { ConfirmAccount } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { confirmAccount } from '../../api/AuthAPI';
import { toast } from 'react-toastify';
export default function ConfirmAccountView() {
  const navigate = useNavigate()
  const [token, setToken] = useState<ConfirmAccount['token']>('')

  const {mutate} = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      navigate('/login')
    }
  })

  const handleChange = (token : ConfirmAccount['token']) => {
    setToken(token)
  }

  const handleComplete = (token : ConfirmAccount['token']) => mutate({token})
  
    return ( 
        <>
    <div className="flex flex-1 justify-center items-center min-h-full py-12 px-4 ">
      <div className="bg-white p-10 w-full max-w-lg rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-black">Confirma tu cuenta</h1>
          <p className="text-2xl font-light text-gray-600 mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-emerald-600 font-bold"> por e-mail</span>
      </p>
        </div>
         <form
        className="space-y-8 p-10 bg-white"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border"/>

            </PinInput>
        </div>

      </form>

      <nav className="flex flex-col space-y-4">
        <Link
          to='/auth/request-code'
          className="text-center text-gray-600 font-normal"
        >
          <span className="hover:text-emerald-600">Solicitar un nuevo Código</span>
        </Link>
      </nav>
      </div>
      </div>

    </>
    );
}

