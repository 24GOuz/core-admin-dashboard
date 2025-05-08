export interface Region {
    id: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    name: Record<string, string>
    countryId: number
}

export interface RegionFormData {
    name: Record<string, string>
    countryId: string
}