import { Stack } from '@mantine/core'
import { ErrorAlert } from '@/components/error-alert/error-alert'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { useCreateBusinessTypeMutation } from '../queries'
import { LanguageForm } from './form'
import { BusinessTypeFormBody } from '../types'

export const Create = () => {
    const { mutateAsync, isPending, error } = useCreateBusinessTypeMutation()
    const t = useMainTranslation()

    const handleSubmit = async (values: BusinessTypeFormBody) => {
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
