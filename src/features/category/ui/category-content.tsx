import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
import { MTable } from '@/components/m-table/m-table'
import { openModal } from '@mantine/modals'

export const CategoryContent = () => {

    const data = [
        {
            id: 1,
            name: 'Category 1',
            letter_code: 'C1',
        },
        {
            id: 2,
            name: 'Category 2',
            letter_code: 'C2',
        },
        {
            id: 3,
            name: 'Category 3',
            letter_code: 'C3',
        },
    ]

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
            children: <div>Edit</div>,
            title: 'Edit',
        })
    }

    const deleteM = (id: number) => {
        openModal({
            children: <div>Delete</div>,
            title: 'Delete',
        })
    }

    return (
        <MTable
            data={data || []}
            columns={columns}
            deleteM={deleteM}
            editM={editM}
            rowCount={data.length}
            onPaginationChange={() => { }}
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
