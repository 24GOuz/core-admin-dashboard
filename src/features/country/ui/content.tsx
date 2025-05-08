import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
import { MTable } from '@/components/m-table/m-table'
import { openModal } from '@mantine/modals'
import { Edit } from './edit'
import { DeleteModal } from '@/components/delete-modal/delete-modal'
import { Country } from '../types'
import { useDeleteCountry, useGetCountries } from '../queries'
import { useListParams } from '@/shared/hooks/useParams'

export const CountryContent = () => {

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
    const { mutate: deleteCountry } = useDeleteCountry()
    const { data, isLoading, isError, error } = useGetCountries({
        page: pagination.pageIndex + 1,
        take: pagination.pageSize,
        keyword: globalFilter || undefined,
        sortBy,
        sort,
    })

    const columns: MRT_ColumnDef<Country>[] = useMemo(
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
                Cell: ({ row }) => {
                    if (!row?.original?.name) return '';
                    const nameValues = Object.values(row.original.name);
                    return <span>{nameValues[0] || ''}</span>;
                }
            },
            {
                accessorKey: 'code',
                header: 'Code',
            },
            {
                accessorKey: 'isActive',
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
            children: <DeleteModal id={id} label={'Delete'} onDelete={() => deleteCountry(id)} />,
            title: 'Delete',
        })
    }

    return (
        <MTable
            data={data?.data || []}
            columns={columns}
            deleteM={deleteM}
            editM={editM}
            rowCount={data?.meta.total || 0}
            onPaginationChange={setPagination}
            state={{
                isLoading,
                pagination: {
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                },
                globalFilter: globalFilter || undefined,
                sorting,
                showSkeletons: false,
                showAlertBanner: false,
            }}
            manualSorting={true}
            errorText={error?.message}
            isError={isError}
            manualFiltering={true}
            enableRowActions={true}
            manualPagination={true}
            onSortingChange={setSorting}
            onGlobalFilterChange={setGlobalFilter}
        />
    )
}
