import { http } from "@/shared/http/http"
import { LoginResponse, User } from "../types"
import { ResponseWithData } from "@/shared/types/http"

export const authApi = {
    login: async (phone: string, password: string) => {
        const response = await http.post<ResponseWithData<LoginResponse>>('/admin/auth/login', {
            phone,
            password,
        })

        return response.data
    },
    getMe: async () => {
        const response = await http.get<ResponseWithData<User>>('/admin/auth/profile')
        return response.data
    }
}
