import { Stack } from '@mantine/core'
import { ErrorAlert } from '@/components/error-alert/error-alert'
import { OrganizationForm } from './form'
import { useFetchOrganizationQuery, useUpdateOrganizationMutation } from '../queries'
import { OrganizationFormBody } from '../types'
interface EditProps {
    id: number
}
export const Edit: React.FC<EditProps> = ({ id = 0 }) => {
    const { data: organization } = useFetchOrganizationQuery(id.toString())
    const { mutateAsync: updateOrganization, isPending: isUpdating } = useUpdateOrganizationMutation()

    const handleSubmit = async (data: OrganizationFormBody) => {
        try {
            await updateOrganization({ id: id.toString(), data })
        } catch (error) {
            return Promise.reject(error)
        }
    }
    return (
        <Stack gap={0}>
            {true && <ErrorAlert>This is error</ErrorAlert>}
            <OrganizationForm
                initialValues={organization?.data}
                submitFn={handleSubmit}
                loading={isUpdating}
                title={'Edit'}
            />
        </Stack>
    )
}
