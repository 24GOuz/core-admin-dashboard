import { Language } from '@/features/language/types/language-types'
import { initLanguages } from '@/features/language/lib/init-languages'
import {
    Button,
    Flex,
    Select,
    Stack,
    Text,
    TextInput,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { RegionFormData } from '../types'
import { isNotEmpty } from '@mantine/form'
import { withLangs } from '@/features/language/hoc/with-languages'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { useForm } from '@mantine/form'
import { HTTPError } from '@/shared/types/http'
import { useGetCountries } from '@/features/country/queries'

type FormProps = {
    submitFn: (data: RegionFormData) => Promise<unknown>
    loading: boolean
    title: string
    initialValues?: RegionFormData
}

const initialData = (languages: Language[]) => {
    const base = {}
    return {
        name: { ...base, ...initLanguages(languages, '') },
        countryId: ''
    }
}

export const RegionForm: React.FC<FormProps> = withLangs(({
    submitFn,
    loading,
    title,
    languages,
    initialValues = initialData(languages),
}) => {
    const t = useMainTranslation()
    const { data: countries } = useGetCountries()
    const form = useForm<RegionFormData>({
        initialValues,
        validate: {
            name: initLanguages(languages, isNotEmpty(t('isNotEmpty'))),
            countryId: isNotEmpty(t('isNotEmpty')),
        },
    })
    const handleSubmit = async (values: Record<string, any>) => {
        try {
            await submitFn(values as RegionFormData).then(() => modals.closeAll())
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
                <Select
                    label={'Country'}
                    name="countryId"
                    placeholder={'Country'}
                    size="medium"
                    data={countries?.data?.map((country) => {
                        const nameValues = Object.values(country.name);
                        return {
                            value: String(country.id),
                            label: nameValues[0] || '',
                        }
                    }) ?? []}
                    {...form.getInputProps('countryId')}
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