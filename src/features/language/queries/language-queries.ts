import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { languagesApi } from '../api/language-api'
import { Language, LanguageBody, LanguageImageUploadResponse } from '../types/language-types'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { notifications } from '@mantine/notifications'
import { FilterParams } from '@/shared/types/filterParams'
import { modals } from '@mantine/modals'

export const useFetchLanguages = (params: FilterParams) => {
  return useQuery<ResponseWithPagination<Language[]>, HTTPError>({
    queryKey: ['languages', params],
    queryFn: () => languagesApi.index(params),
    placeholderData: keepPreviousData,
  })
}

export const useFetchLanguage = (languageId: number) => {
  return useQuery({
    queryKey: ['language', languageId],
    queryFn: () => languagesApi.show(languageId),
    staleTime: 0,
  })
}

export const useCreateLanguage = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseWithMessage, HTTPError, LanguageBody>({
    mutationFn: languagesApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['languages'],
      })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, number>({
    mutationFn: languagesApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['languages'],
      })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
      modals.closeAll()
    },
    onError: (data) => {
      notifications.show({
        title: 'Ошибка',
        message: data.message,
        color: 'red',
      })
    },
  })
}

export const useUploadLanguage = () => {
  return useMutation<ResponseWithData<LanguageImageUploadResponse>, HTTPError, FormData>({
    mutationFn: languagesApi.upload,
  })
}
