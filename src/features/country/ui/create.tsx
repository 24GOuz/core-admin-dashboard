import { CountryForm } from './form'
import { CountryFormData } from '../types'
import { Stack } from '@mantine/core'
import { ErrorAlert } from '@/components/error-alert/error-alert'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { useCreateCountry } from '../queries'

export const Create = () => {
    const { mutateAsync, isPending, error, isError } = useCreateCountry()
    const t = useMainTranslation()

    const handleSubmit = async (values: CountryFormData) => {
        try {
            await mutateAsync(values)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return (
        <Stack>
            {isError && <ErrorAlert>{error?.message}</ErrorAlert>}
            <CountryForm
                submitFn={handleSubmit}
                loading={isPending}
                title={t('createForm')}
            />
        </Stack>
    )
}
