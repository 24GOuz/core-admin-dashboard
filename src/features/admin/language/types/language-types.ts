export type Language = {
  id: number
  locale: string
  icon: string 
  name: string
}

export type LanguageBody = {
  locale: string
  icon: File | string
  name: string
}
