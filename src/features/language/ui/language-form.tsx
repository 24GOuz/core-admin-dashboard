import { isNotEmpty, useForm } from '@mantine/form'
import type { LanguageBody } from '../types/language-types'
import type { HTTPError } from '@/shared/types/http'
import {
  Avatar,
  Button,
  FileButton,
  Flex,
  Loader,
  Stack,
  TextInput,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { FormEvent, useEffect, useState } from 'react'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { useUploadLanguage } from '../queries/language-queries'
import { FaCheckCircle } from 'react-icons/fa'

interface LanguageFormProps {
  submitFn: (values: LanguageBody) => Promise<unknown>
  initialState?: LanguageBody
  loading: boolean
  title: string
}

const DEFAULT_FORM_VALUES: LanguageBody = {
  imageId: null,
  locale: '',
  name: '',
}

export const LanguageForm: React.FC<LanguageFormProps> = ({
  submitFn,
  loading,
  title,
  initialState = DEFAULT_FORM_VALUES,
}) => {
  const t = useMainTranslation()
  const { mutateAsync: uploadLanguageImage, isPending: isUploading, isSuccess: isUploadSuccess } = useUploadLanguage()

  const form = useForm<LanguageBody>({
    initialValues: initialState,
    validate: {
      name: isNotEmpty(t('isNotEmpty')),
      locale: isNotEmpty(t('isNotEmpty')),
      imageId: isNotEmpty(t('isNotEmpty')),
    },
  })

  const handleSubmit = async (
    values: LanguageBody,
  ) => {
    try {
      await submitFn(values).then(() => modals.closeAll())
      form.reset()
    } catch (error) {
      const err = error as HTTPError
      if (err.errors) {
        form.setErrors(err.errors)
      }
    }
  }
  // const handleFileChange = (file: File | null) => {
  //   setImgError(null)
  //   if (file) {
  //     const previewUrl = URL.createObjectURL(file)
  //     setPreview(previewUrl)
  //     // form.setFieldValue('icon', file)
  //     const formData = new FormData()
  //     formData.append('image', file)
  //     uploadLanguageImage(formData).then((res) => {
  //       console.log(res)
  //     })
  //   } else {
  //     setPreview(null)
  //   }
  // }

  // useEffect(() => {
  //   if (initialState?.image && typeof initialState.image === 'string') {
  //     setPreview(initialState.image)
  //   }
  // }, [initialState])

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
          <FileButton
            onChange={(file) => {
              if (file) {
                const formData = new FormData()
                formData.append('image', file)
                uploadLanguageImage(formData).then((res) => {
                  form.setFieldValue('imageId', res.data.id)
                })
              }
              // if (file && file.type === 'image/*') {
              //   if (file.size <= 5 * 1024 * 1024) {
              //     handleFileChange(file)
              //   } else {
              //     setImgError(t('lang.imageRequired'))
              //   }
              // } else {
              //   setImgError(t('lang.imageRequired'))
              // }
            }}
            accept="image/*"
            name="image"
          >
            {(props) => (
              <Button
                {...props}
                bg="var(--mantine-color-primary-6)"
              >
                {t('lang.uploadImage')}
              </Button>
            )}
          </FileButton>

          <p style={{ color: '#334155', fontSize: '14px' }}>
            {/* {imgError ? imgError : isUploading ? <Loader size={16} /> : 'SVG'} */}
            {isUploading ? <Loader size={16} /> : isUploadSuccess && <FaCheckCircle size={16} color="green" />}

          </p>
          {form.errors.imageId && (
            <div style={{ color: '#fa5252', fontSize: '12px' }}>
              {form.errors.imageId}
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
        <Button type="submit" variant="primary" size="medium" loading={loading} disabled={isUploading || !isUploadSuccess}>
          {title}
        </Button>
      </Flex>
    </form>
  )
}
