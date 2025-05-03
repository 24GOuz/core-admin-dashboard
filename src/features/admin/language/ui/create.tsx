import { FormEvent } from 'react'
import { useCreateLanguage } from '../queries/language-queries'
import { LanguageForm } from './language-form'
import { LanguageBody } from '../types/language-types'
import { Stack } from '@mantine/core'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useMainTranslation } from '@/shared/hooks/use-main-translation.tsx'

export const Create = () => {
  const { mutateAsync, isPending, error } = useCreateLanguage()
  const t = useMainTranslation()

  const handleSubmit = async ({
    values,
    event,
  }: {
    values: LanguageBody
    event: FormEvent<HTMLFormElement>
  }) => {
    const formdata = new FormData(event.currentTarget)
    formdata.set('icon', values.icon)

    try {
      await mutateAsync(formdata)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <Stack>
      {error?.message && <ErrorAlert>{error?.message}</ErrorAlert>}
      <LanguageForm
        submitFn={handleSubmit}
        loading={isPending}
        title={t('createForm')}
      />
    </Stack>
  )
}
