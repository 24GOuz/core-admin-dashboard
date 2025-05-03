import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { Language } from './../types/language-types'
import { http } from '@/shared/http'
import { FilterParams } from '@/shared/types/filterParams'

export const languagesApi = {
  getAll: async (params: FilterParams) => {
    const { data } = await http<ResponseWithPagination<Language[]>>(
      '/languages',
      {
        params,
      }
    )

    return data
  },

  getOne: async (languageId: number) => {
    const { data } = await http<ResponseWithData<Language>>(
      `languages/${languageId}`
    )

    return data
  },

  create: async (body: FormData) => {
    const { data } = await http.post<ResponseWithMessage>(`languages`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    })

    return data
  },

  update: async ({
    languageId,
    body,
  }: {
    languageId: number
    body: FormData
  }) => {
    const { data } = await http.post<ResponseWithMessage>(
      `languages/${languageId}`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      }
    )

    return data
  },

  delete: async (languageId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `${'languages'}/${languageId}`
    )

    return data
  },

  list: async () => {
    const { data } = await http<ResponseWithData<Language[]>>('languages/list')

    return data
  },
}
