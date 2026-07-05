import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/AuthAPI";
export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1 ,// reintentar una vez si falla, por ejemplo, si el token ha expirado
        refetchOnWindowFocus: false, // no refetch al enfocar la ventana
    })
    return { user: data, isError, isLoading }
}