import { useMemo } from 'react'
import { MTable } from '@/components/m-table/m-table'
import { openModal } from '@mantine/modals'
import { Edit } from './edit'
import { DeleteModal } from '@/components/delete-modal/delete-modal'
import { useDeleteUser, useFetchUsers } from '../queries'
import { useListParams } from '@/shared/hooks/useParams'
import dayjs from 'dayjs'

export const UserContent = () => {
    const {
        pagination,
        setPagination,
        globalFilter,
        sortBy,
        setGlobalFilter,
        setSorting,
        sort,
        sorting,
    } = useListParams()
    const { mutateAsync: deleteUser } = useDeleteUser()
    const { data, isLoading, isError, error } = useFetchUsers({
        page: pagination.pageIndex + 1,
        take: pagination.pageSize,
        keyword: globalFilter || undefined,
        sortBy,
        sort: sort,
    })

    const columns = useMemo(
        () => [
            { accessorKey: 'id', header: 'ID', size: 50 },
            { accessorKey: 'name', header: 'Name', size: 100 },
            { accessorKey: 'surname', header: 'Surname', size: 100 },
            { accessorKey: 'telegramId', header: 'Telegram ID', size: 100 },
            { accessorKey: 'phone', header: 'Phone', size: 100 },
            {
                accessorKey: 'birthday',
                header: 'Birthday',
                cell: ({ getValue }: { getValue: () => string }) => dayjs(getValue()).format('YYYY-MM-DD'),
                size: 100,
            },
            { accessorKey: 'gender', header: 'Gender', size: 100 },
            { accessorKey: 'avatar', header: 'Avatar URL', size: 100 },
            { accessorKey: 'email', header: 'Email', size: 100 },
            {
                accessorKey: 'roles',
                header: 'Roles',
                cell: ({ getValue }: { getValue: () => any }) => {
                    const roles = getValue();
                    return Array.isArray(roles) ? roles.map(r => r.name || r).join(',') : '';
                },
                size: 100,
            },
            { accessorKey: 'isActive', header: 'Is Active', enableSorting: false, size: 100 },
            { accessorKey: 'isVerified', header: 'Is Verified', size: 100 },
            {
                accessorKey: 'createdAt',
                header: 'Created At',
                cell: ({ getValue }: { getValue: () => string }) => dayjs(getValue()).format('YYYY-MM-DD HH:mm'),
            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated At',
                cell: ({ getValue }: { getValue: () => string }) => dayjs(getValue()).format('YYYY-MM-DD HH:mm'),
            },
        ],
        [data],
    )
    const editM = (id: number) => {
        openModal({
            children: <Edit id={id} />,
            title: 'Edit',
        })
    }

    const deleteM = (id: number) => {
        openModal({
            children: <DeleteModal id={id} label={'Delete'} onDelete={() => deleteUser(id)} />,
            title: 'Delete',
        })
    }

    return (
        <MTable
            data={data?.data || []}
            columns={columns}
            manualPagination={true}
            deleteM={deleteM}
            editM={editM}
            rowCount={data?.meta.total}
            onPaginationChange={setPagination}
            state={{
                isLoading: isLoading,
                pagination: {
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                },
                globalFilter: globalFilter,
                sorting,
                showSkeletons: false,
                showAlertBanner: false,
            }}
            errorText={error?.message}
            isError={isError}
            manualSorting={true}
            manualFiltering={true}
            enableRowActions={true}
            positionActionsColumn='first'
            onSortingChange={setSorting}
            onGlobalFilterChange={setGlobalFilter}
        />
    )
}
