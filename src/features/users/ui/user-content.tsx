import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
import { MTable } from '@/components/m-table/m-table'
import { openModal } from '@mantine/modals'
import { Edit } from './edit'
import { DeleteModal } from '@/components/delete-modal/delete-modal'
import { useFetchUsers } from '../queries'
import { useListParams } from '@/shared/hooks/useParams'
import { Role } from '@/shared/types/global'
import dayjs from 'dayjs'

export const UserContent = () => {
    const {
        pagination,
        setPagination,
        globalFilter,
        orderby,
        setGlobalFilter,
        setSorting,
        sort,
        sorting,
    } = useListParams()
    const { data } = useFetchUsers({
        page: pagination.pageIndex + 1,
        take: pagination.pageSize,
        keyword: globalFilter || undefined,
        orderby,
        sort: sort,
    })

    const columns = useMemo(
        () => [
            { accessorKey: 'id', header: 'ID', size: 50 },
            { accessorKey: 'name', header: 'Name', size: 150 },
            { accessorKey: 'surname', header: 'Surname', size: 150 },
            { accessorKey: 'telegramId', header: 'Telegram ID' },
            { accessorKey: 'phone', header: 'Phone' },
            {
                accessorKey: 'birthday',
                header: 'Birthday',
                cell: ({ getValue }: { getValue: () => string }) => dayjs(getValue()).format('YYYY-MM-DD'),
            },
            { accessorKey: 'gender', header: 'Gender' },
            { accessorKey: 'avatar', header: 'Avatar URL' },
            { accessorKey: 'email', header: 'Email' },
            {
                accessorKey: 'roles',
                header: 'Roles',
                cell: ({ getValue }: { getValue: () => any }) => {
                    const roles = getValue();
                    return Array.isArray(roles) ? roles.map(r => r.name || r).join(',') : '';
                },
            },
            { accessorKey: 'isActive', header: 'Is Active', enableSorting: false },
            { accessorKey: 'isVerified', header: 'Is Verified' },
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
            children: <DeleteModal id={id} label={'Delete'} onDelete={() => { }} />,
            title: 'Delete',
        })
    }

    return (
        <MTable
            data={data?.data || []}
            columns={columns}
            deleteM={deleteM}
            editM={editM}
            rowCount={0}
            onPaginationChange={setPagination}
            state={{
                isLoading: false,
                pagination: {
                    pageIndex: 0,
                    pageSize: 10,
                },
                globalFilter: '',
                sorting: [],
                showSkeletons: false,
                showAlertBanner: false,
            }}
            manualSorting={true}
            errorText={'this is error'}
            isError={true}
            manualFiltering={true}
            enableRowActions={true}
            manualPagination={true}
            onSortingChange={() => { }}
            onGlobalFilterChange={() => { }}
        />
    )
}
