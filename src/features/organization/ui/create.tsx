import { Stack } from '@mantine/core';
import { ErrorAlert } from '@/components/error-alert/error-alert';
import { useMainTranslation } from '@/shared/hooks/use-main-translation';
import { useCreateOrganizationMutation } from '../queries';
import { OrganizationFormBody } from '../types';
import { OrganizationForm } from './form';
import { HTTPError } from '@/shared/types/http';

export const Create = () => {
  const { mutateAsync, isPending, error, isError } = useCreateOrganizationMutation();
  const t = useMainTranslation();

  const handleSubmit = async (values: OrganizationFormBody) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <Stack>
      {isError && <ErrorAlert>{error?.message}</ErrorAlert>}
      <OrganizationForm
        submitFn={handleSubmit}
        loading={isPending}
        title={t('createForm')}
        error={error as HTTPError | null}
      />
    </Stack>
  );
};
