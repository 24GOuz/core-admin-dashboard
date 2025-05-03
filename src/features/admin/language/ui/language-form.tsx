import { isNotEmpty, useForm } from '@mantine/form'
import type { LanguageBody } from '../types/language-types'
import type { HTTPError } from '@/shared/types/http'
import {
  Avatar,
  Button,
  FileButton,
  Flex,
  Stack,
  TextInput,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { FormEvent, useEffect, useState } from 'react'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { useMainTranslation } from '@/shared/hooks/use-main-translation.tsx'

interface LanguageFormProps {
  submitFn: ({
    values,
    event,
  }: {
    values: LanguageBody
    event: FormEvent<HTMLFormElement>
  }) => Promise<unknown>
  initialState?: LanguageBody
  loading: boolean
  title: string
}

const DEFAULT_FORM_VALUES: LanguageBody = {
  icon: '',
  locale: '',
  name: '',
}

export const LanguageForm: React.FC<LanguageFormProps> = ({
  submitFn,
  loading,
  title,
  initialState = DEFAULT_FORM_VALUES,
}) => {
  const [preview, setPreview] = useState<string | null>(null)
  const t = useMainTranslation()
  const [imgError, setImgError] = useState<string | null>(null)

  const form = useForm<LanguageBody>({
    initialValues: initialState,
    validate: {
      name: isNotEmpty(t('isNotEmpty')),
      locale: isNotEmpty(t('isNotEmpty')),
      icon: isNotEmpty(t('iconEmpty')),
    },
  })

  const handleSubmit = async (
    values: LanguageBody,
    event: FormEvent<HTMLFormElement> | undefined,
  ) => {
    if (!event) return
    try {
      await submitFn({ values: values, event }).then(() => modals.closeAll())
      form.reset()
    } catch (error) {
      const err = error as HTTPError
      if (err.errors) {
        form.setErrors(err.errors)
      }
    }
  }
  const handleFileChange = (file: File | null) => {
    setImgError(null)
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
      form.setFieldValue('icon', file)
    } else {
      setPreview(null)
    }
  }

  useEffect(() => {
    if (initialState?.icon && typeof initialState.icon === 'string') {
      setPreview(initialState.icon)
    }
  }, [initialState])

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={t('lang.name')}
          placeholder={t('lang.name')}
          name="name"
          data-autofocus
          size="medium"
          maxLength={20}
          {...form.getInputProps('name')}
        />
        <TextInput
          label={t('lang.locale')}
          name="locale"
          placeholder={t('lang.locale')}
          size="medium"
          maxLength={10}
          {...form.getInputProps('locale')}
        />

        <Flex align="center" gap={10}>
          {preview === null ? (
            <HiOutlineGlobeAlt size={40} color="#334155" />
          ) : (
            <Avatar src={preview} alt="Preview" radius="lg" size="md" />
          )}

          <FileButton
            onChange={(file) => {
              if (file && file.type === 'image/svg+xml') {
                if (file.size <= 5 * 1024 * 1024) {
                  handleFileChange(file)
                } else {
                  setImgError(t('lang.svgRequired'))
                }
              } else {
                setImgError(t('lang.svgRequired'))
              }
            }}
            accept="image/svg+xml"
            name="icon"
          >
            {(props) => (
              <Button
                {...form.getInputProps('icon')}
                {...props}
                bg="var(--mantine-color-primary-6)"
              >
                {t('lang.uploadImage')}
              </Button>
            )}
          </FileButton>

          <p style={{ color: '#334155', fontSize: '14px' }}>
            {imgError ? imgError : 'SVG'}
          </p>
          {form.errors.icon && (
            <div style={{ color: '#fa5252', fontSize: '12px' }}>
              {form.errors.icon}
            </div>
          )}
        </Flex>
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
