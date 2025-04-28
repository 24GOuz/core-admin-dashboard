import { Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'

interface ErrorAlertProps {
    children: React.ReactNode
}

export const ErrorAlert = ({ children }: ErrorAlertProps) => {
    return (
        <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Error"
            color="red"
            variant="filled"
            mb="md"
        >
            {children}
        </Alert>
    )
} 