import { Stack } from '@mantine/core'
import { UserForm } from './form'
import { ErrorAlert } from '@/components/error-alert/error-alert'

interface EditProps {
    id: number
}
export const Edit: React.FC<EditProps> = ({ id = 0 }) => {
    console.log(id)
    return (
        <Stack gap={0}>
            {true && <ErrorAlert>This is error</ErrorAlert>}
            <UserForm
                initialState={{
                    avatar: 'language.data.icon',
                    name: 'language.data.name',
                    surname: 'language.data.surname',
                    birthday: 'language.data.birthday',
                    gender: 'language.data.gender',
                    phone: 'language.data.phone',
                    email: 'language.data.email',
                    password: 'language.data.password',
                    telegramId: 'language.data.telegramId',
                    isActive: true,
                    roles: ['user'],
                    isVerified: true,
                }}
                submitFn={() => { }}
                loading={false}
                title={'Edit'}
            />
        </Stack>
    )
}
