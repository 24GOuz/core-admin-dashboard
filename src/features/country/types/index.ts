export interface Country {
    id: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    name: {
        en: string
        ru: string
        uz: string
    }
    code: string
}

export interface CountryFormData {
    name: Record<string, string>
    code: string
}