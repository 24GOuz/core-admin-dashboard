import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
import { MTable } from '@/components/m-table/m-table'
import { openModal } from '@mantine/modals'
import { Edit } from './edit'
import { DeleteModal } from '@/components/delete-modal/delete-modal'
import { useGetBusinessTypesQuery } from '../queries'
import CustomLoader from '@/shared/ui/loader'
import { Alert } from '@mantine/core'

export const BusinessTypeContent = () => {
    const { data, isLoading, isError, error } = useGetBusinessTypesQuery()

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
                Cell: ({ row }: { row: any }) => {
                    return <span>{row?.original?.name?.uz}</span>
                }
            },
            {
                accessorKey: 'description',
                header: 'Description',
                Cell: ({ row }: { row: any }) => {
                    return <span>{row?.original?.description?.uz}</span>
                }
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

    if (isLoading) {
        return <CustomLoader fullScreen />
    }

    return (
        <>
            <MTable
                data={data?.data || []}
                columns={columns}
                deleteM={deleteM}
                editM={editM}
                rowCount={data?.length || 0}
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
                errorText={error?.message}
                isError={isError}
                manualFiltering={true}
                enableRowActions={true}
                manualPagination={true}
                onSortingChange={() => { }}
                onGlobalFilterChange={() => { }}
            />
        </>
    )
}
