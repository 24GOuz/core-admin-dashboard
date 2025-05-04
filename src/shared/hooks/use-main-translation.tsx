import { useTranslation } from 'react-i18next'

export const useMainTranslation = () => {
  const { t } = useTranslation('main')
  return t
}
