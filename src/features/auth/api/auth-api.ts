import { http } from "@/shared/http/http"
import { IResponse } from "@/shared/types/http"
import { LoginResponse, User } from "../types"

export const authApi = {
    login: async (phone: string, password: string) => {
        const response = await http.post<IResponse<LoginResponse>>('/admin/auth/login', {
            phone,
            password,
        })

        return response.data
    },
    getMe: async () => {
        const response = await http.get<IResponse<User>>('/admin/auth/profile')
        return response.data
    }
}
