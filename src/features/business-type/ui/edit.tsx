import { Stack } from '@mantine/core'
import { BusinessTypeForm } from './form'
import { ErrorAlert } from '@/components/error-alert/error-alert'

interface EditProps {
    id: number
}
export const Edit: React.FC<EditProps> = ({ id = 0 }) => {
    console.log(id)
    return (
        <Stack gap={0}>
            {true && <ErrorAlert>This is error</ErrorAlert>}
            {/* <LanguageForm
                initialState={{
                    icon: 'language.data.icon',
                    locale: 'language.data.locale',
                    name: 'language.data.name',
                }}
                submitFn={() => { }}
                loading={false}
                title={'Edit'}
            /> */}
        </Stack>
    )
}
