import { useMemo } from 'react';
import { openModal } from '@mantine/modals';
import { DeleteModal } from '@/components/delete-modal/delete-modal';
import { MTable } from '@/components/m-table/m-table';
import { useListParams } from '@/shared/hooks/useParams';
import { useDeleteOrganizationMutation, useFetchOrganizationsQuery } from '../queries';
import { Organization } from '../types';
import { formatDate } from '@/shared/utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

export const OrganizationContent = () => {
  const navigate = useNavigate();
  const {
    pagination,
    setPagination,
    globalFilter,
    sortBy,
    setGlobalFilter,
    setSorting,
    sort,
    sorting,
  } = useListParams();

  const { mutateAsync: deleteBusinessType, isPending: isDeleting } =
    useDeleteOrganizationMutation();
  const { data, isLoading, isError, error } = useFetchOrganizationsQuery({
    page: pagination.pageIndex + 1,
    take: pagination.pageSize,
    keyword: globalFilter || undefined,
    sortBy,
    sort,
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 350,
      },
      {
        accessorKey: 'handle',
        header: 'Handle',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'partner',
        header: 'Partner',
        Cell: ({ row }: { row: { original: Organization } }) => {
          return (
            <span>
              {row.original?.partner?.name} {row.original?.partner?.surname}
            </span>
          );
        },
      },
      {
        accessorKey: 'region',
        header: 'Region',
        Cell: ({ row }: { row: { original: Organization } }) => {
          return <span>{row.original.region?.name?.uz || Object.values(row.original.region?.name || {})[0] || ''}</span>;
        },
      },
      {
        accessorKey: 'businessTypes',
        header: 'Business Types',
        Cell: ({ row }: { row: { original: Organization } }) => {
          return <span>{row.original?.businessTypes?.map((businessType) => businessType?.name?.uz || Object.values(businessType?.name || {})[0] || '').join(', ')}</span>;
        },
      },
      {
        accessorKey: 'isActive',
        header: 'Active',
        Cell: ({ row }: { row: { original: Organization } }) => {
          return <span>{row.original.isActive ? 'Yes' : 'No'}</span>;
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        Cell: ({ row }: { row: { original: Organization } }) => {
          return <span>{formatDate(row.original.createdAt)}</span>;
        },
      },
    ],
    [data]
  );

  const editM = (id: number) => {
    navigate(ROUTES.organizations + `/${id}/edit`);
  };

  const deleteM = (id: number) => {
    openModal({
      children: (
        <DeleteModal
          id={id}
          label={'Delete'}
          onDelete={() => {
            deleteBusinessType(id.toString());
          }}
          isDeleting={isDeleting}
        />
      ),
      title: 'Delete',
    });
  };

  return (
    <>
      <MTable
        data={data?.data || []}
        columns={columns}
        manualPagination={true}
        rowCount={data?.meta.total || 0}
        onPaginationChange={setPagination}
        deleteM={deleteM}
        editM={editM}
        state={{
          isLoading: isLoading,
          pagination: {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          },
          globalFilter: globalFilter,
          sorting,
          showSkeletons: false,
        }}
        enableRowActions={true}
        errorText={error?.message}
        isError={isError}
        manualFiltering={true}
        manualSorting={true}
        onSortingChange={setSorting}
        onGlobalFilterChange={(value) => {
          setGlobalFilter(value ?? null);
        }}
      />
    </>
  );
};
