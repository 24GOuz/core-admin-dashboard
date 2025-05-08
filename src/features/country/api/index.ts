import { http } from "@/shared/http/http"
import { Country, CountryFormData } from "../types"
import { ResponseWithData, ResponseWithMessage, ResponseWithPagination } from "@/shared/types/http"
import { FilterParams } from "@/shared/types/filterParams"

export const countryApi = {
    index: async (params?: FilterParams) => {
        const { data } = await http.get<ResponseWithPagination<Country[]>>('/admin/country', { params })
        return data
    },
    show: async (id: number) => {
        const { data } = await http.get<ResponseWithData<Country>>(`/admin/country/${id}`)
        return data
    },
    create: async (body: CountryFormData) => {
        const { data } = await http.post<ResponseWithMessage>('/admin/country', body)
        return data
    },
    update: async (id: number, body: CountryFormData) => {
        const { data } = await http.patch<ResponseWithMessage>(`/admin/country/${id}`, body)
        return data
    },
    delete: async (id: number) => {
        const { data } = await http.delete<ResponseWithMessage>(`/admin/country/${id}`)
        return data
    }
}
