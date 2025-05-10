import { Stack } from '@mantine/core';
import { ErrorAlert } from '@/components/error-alert/error-alert';
import { useMainTranslation } from '@/shared/hooks/use-main-translation';
import { useCreateBusinessType } from '../queries';
import { BusinessTypeFormBody } from '../types';
import { BusinessTypeForm } from './form';

export const Create = () => {
  const { mutateAsync, isPending, error, isError } = useCreateBusinessType();
  const t = useMainTranslation();

  const handleSubmit = async (values: BusinessTypeFormBody) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <Stack>
      {isError && <ErrorAlert>{error?.message}</ErrorAlert>}
      <BusinessTypeForm submitFn={handleSubmit} loading={isPending} title={t('createForm')} />
    </Stack>
  );
};
