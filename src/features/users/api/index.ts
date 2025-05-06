import { http } from "@/shared/http/http"
import { ResponseWithMessage, ResponseWithPagination } from "@/shared/types/http"
import { User, UserFormData } from "../types"
import { FilterParams } from "@/shared/types/filterParams"
export const usersApi = {
    index: async (params: FilterParams) => {
        const { data } = await http.get<ResponseWithPagination<User[]>>('/admin/user', { params })
        return data
    },
    show: async (id: number) => {
        const { data } = await http.get<User>(`/admin/user/${id}`)
        return data
    },
    create: async (body: UserFormData) => {
        const { data } = await http.post<ResponseWithMessage>('/admin/user', body)
        return data
    },
    delete: async (id: number) => {
        const { data } = await http.delete<ResponseWithMessage>(`/admin/user/${id}`)
        return data
    }
}