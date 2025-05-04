import { ComponentType } from 'react'
import { Center, Loader } from '@mantine/core'
import { useFetchLanguages } from '../queries/language-queries'
import { Language } from '../types/language-types'
import { ErrorAlert } from '@/components/error-alert/error-alert'

interface WithLanguagesProps {
    languages: Language[]
}

export const withLangs = <T,>(Component: ComponentType<T & WithLanguagesProps>) => {
    const displayName = Component.displayName || 'Component'

    const ComponentWithLanguages = (props: T) => {
        const {
            data: languages,
            isFetching,
            isError,
            isSuccess,
        } = useFetchLanguages({
            page: 1,
            take: 10,
        })

        if (isFetching)
            return (
                <Center>
                    <Loader color="var(--mantine-color-primary-6)" />
                </Center>
            )
        if (isError) return <ErrorAlert>Ошибка при загрузке языков</ErrorAlert>
        if (isSuccess) return <Component {...props} languages={languages.data} />
    }

    ComponentWithLanguages.displayName = `withLanguages(${displayName})`

    return ComponentWithLanguages
}
