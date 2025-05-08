import { withLangs } from '@/features/language/hoc/with-languages'
import { initLanguages } from '@/features/language/lib/init-languages'
import { Language } from '@/features/language/types/language-types'
import {
    Button,
    Flex,
    Stack,
    Text,
    TextInput,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { BusinessTypeFormBody } from '../types'
import { isNotEmpty, useForm } from '@mantine/form'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { HTTPError } from '@/shared/types/http'

type FormProps = {
    submitFn: (data: BusinessTypeFormBody) => Promise<unknown>
    loading: boolean
    title: string
    initialValues?: BusinessTypeFormBody
}

const initialData = (languages: Language[]) => {
    const base = {  }
    return {
        name: { ...base, ...initLanguages(languages, '') },
        description: { ...base, ...initLanguages(languages, '') }
    }
}

export const BusinessTypeForm: React.FC<FormProps> = withLangs(
    ({
        submitFn,
        loading,
        title,
        languages,
        initialValues = initialData(languages),
    }) => {
        const t = useMainTranslation()
        const form = useForm<BusinessTypeFormBody>({
            initialValues,
            validate: {
                name: initLanguages(languages, isNotEmpty(t('isNotEmpty'))),
                description: initLanguages(languages, isNotEmpty(t('isNotEmpty'))),
            },
        })

        const handleSubmit = async (values: Record<string, any>) => {
            try {
                await submitFn(values as BusinessTypeFormBody).then(() => modals.closeAll())
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
                    {languages.length > 0 ? (
                        languages.map((language) => (
                            <TextInput
                                key={language.id}
                                label={`${t('business_type.description')} (${language.locale})`}
                                placeholder={t('business_type.description')}
                                {...form.getInputProps(`description.${language.locale}`)}
                                size="medium"
                            />
                        ))
                    ) : (
                        <Text>{t('languageNotFound')}</Text>
                    )}
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
