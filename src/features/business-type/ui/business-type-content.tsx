import { useMemo } from 'react'
import { MTable } from '@/components/m-table/m-table'
import { openModal } from '@mantine/modals'
import { Edit } from './edit'
import { DeleteModal } from '@/components/delete-modal/delete-modal'
import { useDeleteBusinessTypeMutation, useGetBusinessTypesQuery } from '../queries'
import { useListParams } from '@/shared/hooks/useParams'

export const BusinessTypeContent = () => {
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
    const { mutateAsync: deleteBusinessType, isPending: isDeleting } = useDeleteBusinessTypeMutation()
    const { data, isLoading, isError, error } = useGetBusinessTypesQuery({
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
            children: <DeleteModal id={id} label={'Delete'} onDelete={() => {
                deleteBusinessType(id.toString())
            }} isDeleting={isDeleting} />,
            title: 'Delete',
        })
    }

    return (
        <>
            <MTable
                data={data?.data || []}
                columns={columns}
                manualPagination={true}
                rowCount={data?.meta.total || 0}
                onPaginationChange={setPagination}
                // deleteM={deleteM}
                // editM={editM}
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
                    setGlobalFilter(value ?? null)
                }}
            />
        </>
    )
}
