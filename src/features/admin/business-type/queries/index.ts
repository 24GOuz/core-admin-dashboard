import { useMutation, useQuery } from "@tanstack/react-query"
import { businessTypeApi } from "../api"
import { BusinessTypeFormBody } from "../types"

export const useGetBusinessTypesQuery = () => {
    return useQuery({
        queryKey: ['business-types'],
        queryFn: businessTypeApi.index
    })
}

export const useGetBusinessTypeQuery = (id: string) => {
    return useQuery({
        queryKey: ['business-type', id],
        queryFn: () => businessTypeApi.show(id)
    })
}

export const useCreateBusinessTypeMutation = () => {
    return useMutation({
        mutationFn: (data: BusinessTypeFormBody) => businessTypeApi.create(data)
    })
}

export const useUpdateBusinessTypeMutation = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: BusinessTypeFormBody }) => businessTypeApi.update(id, data)
    })
}

export const useDeleteBusinessTypeMutation = () => {
    return useMutation({
        mutationFn: businessTypeApi.delete
    })
}