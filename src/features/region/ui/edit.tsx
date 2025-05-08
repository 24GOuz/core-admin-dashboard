import { Stack } from '@mantine/core'
import { RegionForm } from './form'
import { ErrorAlert } from '@/components/error-alert/error-alert'
import { useFetchRegion, useUpdateRegion } from '../queries'
import { RegionFormData } from '../types'

interface EditProps {
    id: number
}
export const Edit: React.FC<EditProps> = ({ id = 0 }) => {
    const { data } = useFetchRegion(id)
    const { mutateAsync, isPending, error, isError } = useUpdateRegion()

    const handleSubmit = async (formData: RegionFormData) => {
        await mutateAsync({ id, data: formData })
    }

    return (
        <Stack gap={0}>
            {isError && <ErrorAlert>{error?.message}</ErrorAlert>}
            <RegionForm
                initialValues={{
                    name: data?.name || {},
                    countryId: String(data?.countryId) || '',
                }}
                submitFn={handleSubmit}
                loading={isPending}
                title={'Edit'}
            />
        </Stack>
    )
}
