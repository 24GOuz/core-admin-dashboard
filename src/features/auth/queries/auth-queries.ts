import { useMutation, useQuery } from "@tanstack/react-query"
import { authApi } from "../api/auth-api"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { COOKIES } from "@/shared/constants"
import { LoginResponse } from "../types"
import { IResponse } from "@/shared/types"
import { notifications } from "@mantine/notifications"


export const useLoginMutation = () => {
    const navigate = useNavigate()
    return useMutation<IResponse<LoginResponse>, Error, { phone: string, password: string }>({
        mutationFn: ({ phone, password }: { phone: string, password: string }) => authApi.login(phone, password),
        onSuccess: (data) => {
            Cookies.set(COOKIES.TOKEN, data.data.tokens.accessToken)
            navigate('/dashboard')
            notifications.show({
                title: 'Success',
                message: data.message,
                color: 'green',
            })
        },
        onError: (error) => {
            console.log(error)
        },
    })
}

export const useGetMeQuery = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => authApi.getMe(),
    })
}
