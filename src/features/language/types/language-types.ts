export type Language = {
  id: number
  locale: string
  imageId: number
  image: {
    id: number
    filename: string
    path: string
    mimetype: string
    size: string
  }
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type LanguageBody = {
  locale: string
  imageId: number | null
  name: string
}

export type LanguageImageUploadResponse = {
  createdAt: string
  extension: string
  filename: string
  hashId: string
  id: number
  isActive: boolean
  key: string
  mimetype: string
  originalName: string
  path: string
  size: string
  updatedAt: string
}
