import { Stack } from '@mantine/core'
import { ErrorAlert } from '@/components/error-alert/error-alert'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { useCreateUser } from '../queries'
import { UserForm } from './form'
import { UserFormData } from '../types'

export const Create = () => {
    const { mutateAsync, isPending, error } = useCreateUser()
    const t = useMainTranslation()

    const handleSubmit = async (values: UserFormData) => {
        try {
            await mutateAsync(values)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return (
        <Stack>
            {error?.message && <ErrorAlert>{error?.message}</ErrorAlert>}
            <UserForm
                submitFn={handleSubmit}
                loading={isPending}
                title={t('createForm')}
            />
        </Stack>
    )
}
