import { Center, Loader, Stack } from '@mantine/core'
import {
  useFetchLanguage,
  useUpdateLanguage,
} from '../queries/language-queries'
import { LanguageBody } from '../types/language-types'
import { LanguageForm } from './language-form'
import { FormEvent } from 'react'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useMainTranslation } from '@/shared/hooks/use-main-translation.tsx'

interface EditProps {
  id: number
}

export const Edit: React.FC<EditProps> = ({ id = 0 }) => {
  const {
    data: language,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchLanguage(id)
  const t = useMainTranslation()

  const { mutateAsync, isPending, error: updateError } = useUpdateLanguage()

  const handleSubmit = async ({
    values,
    event,
  }: {
    values: LanguageBody
    event: FormEvent<HTMLFormElement>
  }) => {
    const formdata = new FormData(event.currentTarget)

    if (typeof values.icon === 'string') {
      formdata.set('icon', '')
    } else {
      formdata.set('icon', values.icon)
    }
    formdata.set('_method', 'patch')

    try {
      await mutateAsync({ languageId: id, body: formdata })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  if (isError) {
    return <ErrorAlert>{error?.message}</ErrorAlert>
  }

  if (isFetching) {
    return (
      <Center h={267}>
        <Loader color="var(--mantine-color-primary-6)" />
      </Center>
    )
  }

  if (!isSuccess || !language) {
    return null
  }

  return (
    <Stack gap={0}>
      {updateError?.message && <ErrorAlert>{updateError?.message}</ErrorAlert>}
      <LanguageForm
        initialState={{
          icon: language.data.icon,
          locale: language.data.locale,
          name: language.data.name,
        }}
        submitFn={handleSubmit}
        loading={isPending}
        title={t('lang.editTitle')}
      />
    </Stack>
  )
}
