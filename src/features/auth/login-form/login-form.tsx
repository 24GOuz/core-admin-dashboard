import { useState } from 'react'
import { Alert, Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { PatternFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import styles from './login-form.module.css'

interface LoginFormValues {
    phone: string
    password: string
}

export const LoginForm = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<LoginFormValues>({
        initialValues: {
            phone: '',
            password: '',
        },
        validate: {
            phone: (value) => {
                if (!value) return 'Phone number is required'
                if (value.length < 9) return 'Phone number is invalid'
                return null
            },
            password: (value) => {
                if (!value) return 'Password is required'
                if (value.length < 6) return 'Password must be at least 6 characters'
                return null
            },
        },
    })

    const handleSubmit = async (values: LoginFormValues) => {
        try {
            setIsLoading(true)
            setError(null)

            // TODO: Replace this with your actual login API call
            if (values.phone && values.password) {
                // Simulating successful login
                localStorage.setItem('token', 'dummy_token')
                navigate('/dashboard')
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (err) {
            setError('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
                <Title order={2} c="black">Login</Title>
                {error && (
                    <Alert color="red" mt={16} mb={16}>
                        {error}
                    </Alert>
                )}
                <Stack gap={20}>
                    <PatternFormat
                        format="+998 ## ### ## ##"
                        mask=" "
                        allowEmptyFormatting={true}
                        customInput={TextInput}
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        autoFocus
                        size="md"
                        radius="md"
                        {...form.getInputProps('phone')}
                        onValueChange={(values) => {
                            form.setFieldValue('phone', values.value)
                        }}
                        onChange={() => { }}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        {...form.getInputProps('password')}
                        size="md"
                        radius="md"
                    />
                </Stack>
                <Button
                    loading={isLoading}
                    type="submit"
                    fullWidth
                    variant="filled"
                    color="blue"
                    size="md"
                    radius="md"
                    mt={24}
                >
                    Sign In
                </Button>
            </form>
        </div>
    )
}
