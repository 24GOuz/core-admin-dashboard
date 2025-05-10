import { Stack } from '@mantine/core';
import { ErrorAlert } from '@/components/error-alert/error-alert';
import CustomLoader from '@/shared/ui/loader';
import { useFetchCountry, useUpdateCountry } from '../queries';
import { CountryForm } from './form';

interface EditProps {
  id: number;
}
export const Edit: React.FC<EditProps> = ({ id = 0 }) => {
  const { data, isLoading, isError, error } = useFetchCountry(id);
  const {
    mutateAsync: updateCountry,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateCountry(id);

  if (isLoading) return <CustomLoader />;
  return (
    <Stack gap={0}>
      {(isError || isUpdateError) && (
        <ErrorAlert>{error?.message || updateError?.message}</ErrorAlert>
      )}
      <CountryForm
        initialValues={{
          code: data?.data?.code || '',
          name: data?.data?.name || {},
        }}
        submitFn={updateCountry}
        loading={isUpdating}
        title={'Edit'}
      />
    </Stack>
  );
};
