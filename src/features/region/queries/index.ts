import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FilterParams } from "@/shared/types/filterParams";
import { regionApi } from "../api";
import { RegionFormData } from "../types";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

export const useFetchRegions = (params: FilterParams) => {
    return useQuery({
        queryKey: ['regions', params],
        queryFn: () => regionApi.index(params)
    })
}

export const useFetchRegion = (id: number) => {
    return useQuery({
        queryKey: ['region', id],
        queryFn: () => regionApi.show(id)
    })
}

export const useCreateRegion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: RegionFormData) => regionApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['regions'] })
            notifications.show({
                title: 'Region created successfully',
                message: 'Region created successfully',
                color: 'green',
            })
            modals.closeAll()
        },
        onError: (error) => {
            notifications.show({
                title: 'Region creation failed',
                message: error.message,
                color: 'red',
            })
        }
    })
}

export const useUpdateRegion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: RegionFormData }) => regionApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['regions'] })
            notifications.show({
                title: 'Region updated successfully',
                message: 'Region updated successfully',
                color: 'green',
            })
            modals.closeAll()
        },
        onError: (error) => {
            notifications.show({
                title: 'Region update failed',
                message: error.message,
                color: 'red',
            })
        }
    })
}

export const useDeleteRegion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => regionApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['regions'] })
            notifications.show({
                title: 'Region deleted successfully',
                message: 'Region deleted successfully',
                color: 'green',
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Region deletion failed',
                message: error.message,
                color: 'red',
            })
        }
    })
}