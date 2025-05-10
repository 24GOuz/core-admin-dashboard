import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { FilterParams } from '@/shared/types/filterParams';
import { HTTPError, ResponseWithData, ResponseWithMessage } from '@/shared/types/http';
import { organizationApi } from '../api';
import { Organization, OrganizationFormBody } from '../types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

export const useFetchOrganizationsQuery = (params: FilterParams) => {
  return useQuery({
    queryKey: ['organizations', params],
    queryFn: () => organizationApi.index(params),
  });
};

export const useFetchOrganizationQuery = (id: string) => {
  return useQuery({
    queryKey: ['organization', id],
    queryFn: () => organizationApi.show(id),
  });
};

export const useCreateOrganizationMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  
  return useMutation<ResponseWithData<Organization>, HTTPError, OrganizationFormBody>({
    mutationFn: (data: OrganizationFormBody) => organizationApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      notifications.show({
        title: 'Success',
        message: 'Organization created successfully',
        color: 'green',
      });
      navigate(ROUTES.organizations);
    },
  });
};

export const useUpdateOrganizationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseWithData<Organization>, HTTPError, { id: string; data: OrganizationFormBody }>({
    mutationFn: ({ id, data }: { id: string; data: OrganizationFormBody }) =>
      organizationApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      notifications.show({
        title: 'Success',
        message: 'Organization updated successfully',
        color: 'green',
      });
    },
  });
};

export const useDeleteOrganizationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseWithMessage, HTTPError, string>({
    mutationFn: organizationApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      notifications.show({
        title: 'Success',
        message: 'Organization deleted successfully',
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

export const useUploadOrganizationLogo = () => {
  return useMutation({
    mutationFn: (data: { file: File }) => organizationApi.uploadFile(data),
  });
};
