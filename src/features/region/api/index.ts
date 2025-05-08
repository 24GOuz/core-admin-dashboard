import { http } from "@/shared/http/http";
import { FilterParams } from "@/shared/types/filterParams";
import { ResponseWithPagination } from "@/shared/types/http";
import { Region, RegionFormData } from "../types";

export const regionApi = {
    index: async (params: FilterParams) => {
        const response = await http.get<ResponseWithPagination<Region[]>>('/admin/region', { params })
        return response.data
    },
    show: async (id: number) => {
        const response = await http.get<Region>(`/admin/region/${id}`)
        return response.data
    },
    create: async (data: RegionFormData) => {
        const response = await http.post<Region>('/admin/region', data)
        return response.data
    },
    update: async (id: number, data: RegionFormData) => {
        const response = await http.put<Region>(`/admin/region/${id}`, data)
        return response.data
    },
    delete: async (id: number) => {
        const response = await http.delete<Region>(`/admin/region/${id}`)
        return response.data
    }
}