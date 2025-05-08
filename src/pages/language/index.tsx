import { Titles } from '@/components/titles/titles'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { Stack } from '@mantine/core'
import { Create } from '@/features/language/ui/create'
import { LanguageContent } from '@/features/language/ui/language-content'
import { modals } from '@mantine/modals'

const LanguagesPage = () => {
  const t = useMainTranslation()

  const createM = () =>
    modals.open({ children: <Create />, title: t('lang.create') })

  return (
    <Stack gap={16}>
      <Titles title={t('lang.title')} open={createM} />
      <LanguageContent />
    </Stack>
  )
}

export default LanguagesPage
