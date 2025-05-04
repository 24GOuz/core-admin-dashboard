import { FormEvent } from 'react'
import { LanguageForm } from './language-form'
import { LanguageBody } from '../types/language-types'
import { Stack } from '@mantine/core'
import { ErrorAlert } from '@/components/error-alert/error-alert'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { useCreateLanguage } from '../queries/language-queries'

export const Create = () => {
  const { mutateAsync, isPending, error } = useCreateLanguage()
  const t = useMainTranslation()

  const handleSubmit = async (values: LanguageBody) => {
    try {
      await mutateAsync(values)
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
