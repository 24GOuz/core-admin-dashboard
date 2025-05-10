import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { modals } from '@mantine/modals';
import { queryClient } from '@/shared/query-client/query-client';
import { FilterParams } from '@/shared/types/filterParams';
import { countryApi } from '../api';
import { CountryFormData } from '../types';

export const useFetchCountries = (params?: FilterParams) => {
  return useQuery({
    queryKey: ['countries', params],
    queryFn: () => countryApi.index(params),
  });
};

export const useFetchCountry = (id: number) => {
  return useQuery({
    queryKey: ['country', id],
    queryFn: () => countryApi.show(id),
  });
};

export const useCreateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: countryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      modals.closeAll();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useUpdateCountry = (id: number) => {
  return useMutation({
    mutationFn: (data: CountryFormData) => countryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      modals.closeAll();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteCountry = () => {
  return useMutation({
    mutationFn: countryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      modals.closeAll();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
