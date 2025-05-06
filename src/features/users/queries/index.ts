import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usersApi } from "../api"
import { ResponseWithMessage, ResponseWithPagination } from "@/shared/types/http"
import { User, UserFormData } from "../types"
import { HTTPError } from "@/shared/types/http"
import { FilterParams } from "@/shared/types/filterParams"
import { notifications } from "@mantine/notifications"
import { modals } from "@mantine/modals"

export const useFetchUsers = (params: FilterParams) => {
    return useQuery<ResponseWithPagination<User[]>, HTTPError>({
        queryKey: ['users', params],
        queryFn: () => usersApi.index(params)
    })
}

export const useFetchUser = (id: number) => {
    return useQuery<User, HTTPError>({
        queryKey: ['users', id],
        queryFn: () => usersApi.show(id)
    })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation<ResponseWithMessage, HTTPError, UserFormData>({
        mutationFn: usersApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            notifications.show({
                title: 'User created',
                message: 'User created successfully',
                color: 'green'
            })
            modals.closeAll()
        }
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation<ResponseWithMessage, HTTPError, number>({
        mutationFn: usersApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            notifications.show({
                title: 'User deleted',
                message: 'User deleted successfully',
                color: 'green'
            })
            modals.closeAll()
        },
        onError: (error) => {
            notifications.show({
                title: 'Error',
                message: error.message,
                color: 'red'
            })
        }
    })
}