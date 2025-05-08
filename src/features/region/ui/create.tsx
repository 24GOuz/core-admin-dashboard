import { RegionForm } from './form'
import { RegionFormData } from '../types'
import { Stack } from '@mantine/core'
import { ErrorAlert } from '@/components/error-alert/error-alert'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { useCreateRegion } from '../queries'

export const Create = () => {
    const { mutateAsync, isPending, error, isError } = useCreateRegion()
    const t = useMainTranslation()

    const handleSubmit = async (values: RegionFormData) => {
        try {
            await mutateAsync(values)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return (
        <Stack>
            {isError && <ErrorAlert>{error?.message}</ErrorAlert>}
            <RegionForm
                submitFn={handleSubmit}
                loading={isPending}
                title={t('createForm')}
            />
        </Stack>
    )
}
