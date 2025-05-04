import { useMutation, useQuery } from "@tanstack/react-query"
import { usersApi } from "../api"
import { ResponseWithMessage, ResponseWithPagination } from "@/shared/types/http"
import { User } from "../types"
import { HTTPError } from "@/shared/types/http"
import { FilterParams } from "@/shared/types/filterParams"

export const useFetchUsers = (params: FilterParams) => {
    return useQuery<ResponseWithPagination<User[]>, HTTPError>({
        queryKey: ['users', params],
        queryFn: () => usersApi.index(params)
    })
}

export const useFetchUser = (id: string) => {
    return useQuery<User, HTTPError>({
        queryKey: ['users', id],
        queryFn: () => usersApi.show(id)
    })
}

export const useCreateUser = () => {
    return useMutation<ResponseWithMessage, HTTPError, FormData>({
        mutationFn: usersApi.create
    })
}

export const useDeleteUser = () => {
    return useMutation<ResponseWithMessage, HTTPError, string>({
        mutationFn: usersApi.delete
    })
}