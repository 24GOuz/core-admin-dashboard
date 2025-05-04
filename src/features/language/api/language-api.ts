import { http } from '@/shared/http/http'
import { Language, LanguageBody, LanguageImageUploadResponse } from '../types/language-types'
import { ResponseWithMessage } from '@/shared/types/http'
import { ResponseWithData } from '@/shared/types/http'
import { ResponseWithPagination } from '@/shared/types/http'
import { FilterParams } from '@/shared/types/filterParams'

export const languagesApi = {
  index: async (params: FilterParams) => {
    const { data } = await http<ResponseWithPagination<Language[]>>(
      '/admin/locale',
      {
        params,
      }
    )

    return data
  },

  show: async (languageId: number) => {
    const { data } = await http<ResponseWithData<Language>>(
      `/admin/locale/${languageId}`
    )

    return data
  },

  create: async (body: LanguageBody) => {
    const { data } = await http.post<ResponseWithMessage>('/admin/locale', body)

    return data
  },

  delete: async (languageId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `/admin/locale/${languageId}`
    )

    return data
  },

  upload: async (body: FormData) => {
    const { data } = await http.post<ResponseWithData<LanguageImageUploadResponse>>(
      '/admin/locale/upload',
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return data
  },
}
