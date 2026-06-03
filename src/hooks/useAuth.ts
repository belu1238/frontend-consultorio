import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: 
    })
}