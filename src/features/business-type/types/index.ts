import { ILanguage } from "@/shared/types/http"

export interface BusinessType {
    id: number
    isActive: boolean
    createdAt: string
    updatedAt?: string
    name: ILanguage
    description: ILanguage
}

export interface BusinessTypeFormBody {
    name: ILanguage
    description: ILanguage
}