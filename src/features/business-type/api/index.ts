import { http } from "@/shared/http/http"
import { BusinessTypeFormBody } from "../types"
import { FilterParams } from "@/shared/types/filterParams"

export const businessTypeApi = {
    index: async (params: FilterParams) => {
        const response = await http.get('/admin/business-type', { params })
        return response.data
    },
    show: async (id: string) => {
        const response = await http.get(`/admin/business-type/${id}`)
        return response.data
    },
    create: async (data: BusinessTypeFormBody) => {
        const response = await http.post('/admin/business-type', data)
        return response.data
    },
    update: async (id: string, data: BusinessTypeFormBody) => {
        const response = await http.put(`/admin/business-type/${id}`, data)
        return response.data
    },
    delete: async (id: string) => {
        const response = await http.delete(`/admin/business-type/${id}`)
        return response.data
    }

}