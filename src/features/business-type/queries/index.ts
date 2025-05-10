import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { FilterParams } from '@/shared/types/filterParams';
import { HTTPError, ResponseWithMessage } from '@/shared/types/http';
import { businessTypeApi } from '../api';
import { BusinessTypeFormBody } from '../types';

export const useFetchBusinessTypes = (params: FilterParams) => {
  return useQuery({
    queryKey: ['business-types', params],
    queryFn: () => businessTypeApi.index(params),
  });
};

export const useFetchBusinessType = (id: string) => {
  return useQuery({
    queryKey: ['business-type', id],
    queryFn: () => businessTypeApi.show(id),
  });
};

export const useCreateBusinessType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BusinessTypeFormBody) => businessTypeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-types'] });
      notifications.show({
        title: 'Success',
        message: 'Business type created successfully',
        color: 'green',
      });
    },
  });
};

export const useUpdateBusinessType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BusinessTypeFormBody }) =>
      businessTypeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-types'] });
      notifications.show({
        title: 'Success',
        message: 'Business type updated successfully',
        color: 'green',
      });
    },
  });
};

export const useDeleteBusinessType = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseWithMessage, HTTPError, string>({
    mutationFn: businessTypeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-types'] });
      notifications.show({
        title: 'Success',
        message: 'Business type deleted successfully',
        color: 'green',
      });
      modals.closeAll();
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });
};
