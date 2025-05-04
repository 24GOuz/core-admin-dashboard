import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
import { MTable } from '@/components/m-table/m-table'
import { openModal } from '@mantine/modals'
import { Edit } from './edit'
import { DeleteModal } from '@/components/delete-modal/delete-modal'
import { useFetchUsers } from '../queries'
import { useListParams } from '@/shared/hooks/useParams'

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
                accessorKey: 'letter_code',
                header: 'Letter Code',
            },
            {
                accessorKey: 'is_active',
                header: 'Is Active',
                enableSorting: false,
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
