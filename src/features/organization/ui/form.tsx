import { useCallback, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
import { PatternFormat } from 'react-number-format';
import {
  Button,
  FileInput,
  Flex,
  Grid,
  Loader,
  MultiSelect,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useFetchBusinessTypes } from '@/features/business-type/queries';
import { withLangs } from '@/features/language/hoc/with-languages';
import { useFetchRegions } from '@/features/region/queries';
import { useFetchUsers } from '@/features/users/queries';
import { useMainTranslation } from '@/shared/hooks/use-main-translation';
import { HTTPError } from '@/shared/types/http';
import { useUploadOrganizationLogo } from '../queries';
import { OrganizationFormBody } from '../types';

type FormProps = {
  submitFn: (data: OrganizationFormBody) => Promise<unknown>;
  loading: boolean;
  title: string;
  initialValues?: Partial<OrganizationFormBody>;
  error?: HTTPError | null;
};

const initialData: Partial<OrganizationFormBody> = {
  name: '',
  handle: '',
  logoId: 0,
  partnerId: 0,
  regionId: 0,
  phone: '',
  password: '',
  businessTypeIds: [],
};

export const OrganizationForm: React.FC<FormProps> = withLangs(
  ({ submitFn, loading, title, initialValues = initialData, error }) => {
    const t = useMainTranslation();
    const {
      mutateAsync: uploadLogo,
      isPending: uploadingLogo,
      isSuccess: logoUploaded,
    } = useUploadOrganizationLogo();
    const [partnerSearchValue, setPartnerSearchValue] = useState('');
    const { data: partners } = useFetchUsers({
      keyword: partnerSearchValue,
    });
    const { data: regions } = useFetchRegions({});
    const { data: businessTypes } = useFetchBusinessTypes({});

    const form = useForm<OrganizationFormBody>({
      initialValues: initialValues as OrganizationFormBody,
      validate: {
        name: isNotEmpty(t('isNotEmpty')),
        handle: isNotEmpty(t('isNotEmpty')),
        logoId: (value) => (value <= 0 ? t('isNotEmpty') : null),
        partnerId: (value) => (value <= 0 ? t('isNotEmpty') : null),
        regionId: (value) => (value <= 0 ? t('isNotEmpty') : null),
        phone: isNotEmpty(t('isNotEmpty')),
        password: hasLength({ min: 8 }, t('password.minLength', { min: 8 })),
        businessTypeIds: (value) => (value.length === 0 ? t('isNotEmpty') : null),
      },
      initialErrors: error?.errors,
    });

    const handleLogoUpload = useCallback(
      async (file: File | null) => {
        if (!file) return;

        try {
          const result = await uploadLogo({ file });
          form.setFieldValue('logoId', result.data.id);
        } catch (error) {
          console.error('Error uploading logo:', error);
        }
      },
      [uploadLogo, form]
    );

    const handleSubmit = async (values: OrganizationFormBody) => {
      try {
        await submitFn({
          ...values,
          phone: values.phone.replace(/\s/g, '').slice(1),
          businessTypeIds: values.businessTypeIds.map((id) => Number(id)),
        }).then(() => modals.closeAll());
      } catch (error) {
        const err = error as HTTPError;
        if (err.errors) form.setErrors(err.errors);
      }
    };

    return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="md">
          {/* Left Column */}
          <Grid.Col span={6}>
            <Stack>
              <TextInput
                label={t('organization.name')}
                placeholder={t('organization.name')}
                {...form.getInputProps('name')}
                size="medium"
                required
              />

              <TextInput
                label={t('organization.handle')}
                placeholder={t('organization.handle')}
                {...form.getInputProps('handle')}
                size="medium"
                required
              />

              <FileInput
                label={t('organization.logo')}
                placeholder={t('organization.selectLogo')}
                accept="image/*"
                onChange={handleLogoUpload}
                size="medium"
                required
                rightSection={
                  uploadingLogo ? (
                    <Loader size={16} />
                  ) : logoUploaded ? (
                    <IconCheck size={16} />
                  ) : null
                }
              />
              {form.errors.logoId && <Text c="red">{form.errors.logoId}</Text>}

              <Select
                label={t('organization.partner')}
                placeholder={t('organization.selectPartner')}
                data={partners?.data?.map((partner) => ({
                  value: String(partner.id),
                  label: partner.name,
                }))}
                searchable
                nothingFoundMessage={t('nothingFound')}
                onSearchChange={setPartnerSearchValue}
                {...form.getInputProps('partnerId')}
                size="medium"
                required
              />
            </Stack>
          </Grid.Col>

          {/* Right Column */}
          <Grid.Col span={6}>
            <Stack>
              <Select
                label={t('organization.region')}
                placeholder={t('organization.selectRegion')}
                data={regions?.data?.map((region) => ({
                  value: String(region.id),
                  label: region.name?.uz || Object.values(region.name || {})[0] || '',
                }))}
                searchable
                nothingFoundMessage={t('nothingFound')}
                {...form.getInputProps('regionId')}
                size="medium"
                required
              />

              <PatternFormat
                format="+998 ## ### ## ##"
                mask=" "
                allowEmptyFormatting={true}
                customInput={TextInput}
                label={t('organization.phone')}
                placeholder={t('organization.phone')}
                {...form.getInputProps('phone')}
                size="medium"
                required
              />

              <PasswordInput
                label={t('organization.password')}
                placeholder={t('organization.password')}
                {...form.getInputProps('password')}
                size="medium"
                required
              />

              <MultiSelect
                label={t('organization.businessTypes')}
                placeholder={t('organization.selectBusinessTypes')}
                data={businessTypes?.data?.map((type) => ({
                  value: String(type.id),
                  label: type.name?.uz || Object.values(type.name || {})[0] || '',
                }))}
                nothingFoundMessage={t('nothingFound')}
                size="medium"
                required
                {...form.getInputProps('businessTypeIds')}
              />
            </Stack>
          </Grid.Col>
        </Grid>

        <Flex gap={8} justify="end" mt={30}>
          <Button type="button" variant="secondry" size="medium" onClick={() => modals.closeAll()}>
            {t('back')}
          </Button>
          <Button type="submit" variant="primary" size="medium" loading={loading}>
            {title}
          </Button>
        </Flex>
      </form>
    );
  }
);
