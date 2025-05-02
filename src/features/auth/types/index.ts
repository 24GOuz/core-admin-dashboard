export interface LoginResponse {
    user: User
    tokens: Tokens
}

export interface User {
    id: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    telegramId: string
    name: string
    surname: string
    birthday: string
    gender: string
    avatar: string
    phone: string
    password: string
    email: string
    roles: string[]
    isVerified: boolean
}

export interface Tokens {
    accessToken: string
    refreshToken: string
}