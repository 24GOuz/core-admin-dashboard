import { Stack } from '@mantine/core'
import { CountryForm } from './form'
import { ErrorAlert } from '@/components/error-alert/error-alert'
import { useGetCountry, useUpdateCountry } from '../queries'
import CustomLoader from '@/shared/ui/loader'

interface EditProps {
    id: number
}
export const Edit: React.FC<EditProps> = ({ id = 0 }) => {
    const { data, isLoading, isError, error } = useGetCountry(id)
    const { mutateAsync: updateCountry, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateCountry(id)

    if (isLoading) return <CustomLoader />
    return (
        <Stack gap={0}>
            {(isError || isUpdateError) && <ErrorAlert>{error?.message || updateError?.message}</ErrorAlert>}
            <CountryForm
                initialValues={{
                    code: data?.data?.code || '',
                    name: data?.data?.name || {},
                }}
                submitFn={updateCountry}
                loading={isUpdating}
                title={'Edit'}
            />
        </Stack>
    )
}
