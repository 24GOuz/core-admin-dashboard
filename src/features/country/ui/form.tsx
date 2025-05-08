import { Language } from '@/features/language/types/language-types'
import { initLanguages } from '@/features/language/lib/init-languages'
import {
    Button,
    FileButton,
    Flex,
    Stack,
    Text,
    TextInput,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { CountryFormData } from '../types'
import { isNotEmpty } from '@mantine/form'
import { withLangs } from '@/features/language/hoc/with-languages'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { useForm } from '@mantine/form'
import { HTTPError } from '@/shared/types/http'

type FormProps = {
    submitFn: (data: CountryFormData) => Promise<unknown>
    loading: boolean
    title: string
    initialValues?: CountryFormData
}

const initialData = (languages: Language[]) => {
    const base = {}
    return {
        name: { ...base, ...initLanguages(languages, '') },
        code: ''
    }
}

export const CountryForm: React.FC<FormProps> = withLangs(({
    submitFn,
    loading,
    title,
    languages,
    initialValues = initialData(languages),
}) => {
    const t = useMainTranslation()
    const form = useForm<CountryFormData>({
        initialValues,
        validate: {
            name: initLanguages(languages, isNotEmpty(t('isNotEmpty'))),
            code: isNotEmpty(t('isNotEmpty')),
        },
    })
    const handleSubmit = async (values: Record<string, any>) => {
        try {
            await submitFn(values as CountryFormData).then(() => modals.closeAll())
        } catch (error) {
            const err = error as HTTPError
            if (err.errors) form.setErrors(err.errors)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                {languages.length > 0 ? (
                    languages.map((language) => (
                        <TextInput
                            key={language.id}
                            label={`${t('business_type.name')} (${language.locale})`}
                            placeholder={t('business_type.name')}
                            {...form.getInputProps(`name.${language.locale}`)}
                            size="medium"
                        />
                    ))
                ) : (
                    <Text>{t('languageNotFound')}</Text>
                )}
                <TextInput
                    label={'Code'}
                    name="code"
                    placeholder={'Code'}
                    size="medium"
                    maxLength={10}
                    {...form.getInputProps('code')}
                />
            </Stack>

            <Flex gap={8} justify="end" mt={30}>
                <Button
                    type="button"
                    variant="secondry"
                    size="medium"
                    onClick={() => modals.closeAll()}
                >
                    {t('back')}
                </Button>
                <Button type="submit" variant="primary" size="medium" loading={loading}>
                    {title}
                </Button>
            </Flex>
        </form>
    )
}
)