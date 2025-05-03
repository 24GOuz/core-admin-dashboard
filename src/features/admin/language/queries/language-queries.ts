import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { languagesApi } from '../api/language-api'
import { Language } from '../types/language-types'
import {
  HTTPError,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { notifications } from '@mantine/notifications'
import { FilterParams } from '@/shared/types/filterParams'

export const useFetchLanguages = (params: FilterParams) => {
  return useQuery<ResponseWithPagination<Language[]>, HTTPError>({
    queryKey: ['languages', params],
    queryFn: () => languagesApi.getAll(params),
    placeholderData: keepPreviousData,
  })
}

export const useFetchLanguage = (languageId: number) => {
  return useQuery({
    queryKey: ['language', languageId],
    queryFn: () => languagesApi.getOne(languageId),
    staleTime: 0,
  })
}
export const useCreateLanguage = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseWithMessage, HTTPError, FormData>({
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

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { languageId: number; body: FormData }
  >({
    mutationFn: ({
      languageId,
      body,
    }: {
      languageId: number
      body: FormData
    }) => languagesApi.update({ languageId, body }),
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

export const useDeleteLanguange = () => {
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

export const useFetchListLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: languagesApi.list,
  })
}
