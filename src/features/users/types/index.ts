import { Role } from "@/shared/types/global"

export interface User {
    id: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    telegramId: number
    name: string
    surname: string
    birthday: string
    gender: string
    avatar?: string
    phone: string
    password: string
    email: string
    roles: Role[]
    isVerified: boolean
}

export type UserFormData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>