import { Avatar } from '@mantine/core'
import { MRT_ColumnDef } from 'mantine-react-table'
import {
  useDeleteLanguage,
  useFetchLanguages,
} from '../queries/language-queries'
import { Language } from '../types/language-types'
import { openModal } from '@mantine/modals'
import { useMemo } from 'react'
import { MTable } from '@/components/m-table/m-table'
import { useListParams } from '@/shared/hooks/useParams'
import { useGetLanguage } from '@/shared/hooks/use-get-language'
import { useMainTranslation } from '@/shared/hooks/use-main-translation'
import { DeleteModal } from '@/components/delete-modal/delete-modal'

export const LanguageContent = () => {
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

  const t = useMainTranslation()
  const {
    data: languages,
    isFetching,
    error,
    isError,
  } = useFetchLanguages({
    page: pagination.pageIndex + 1,
    take: pagination.pageSize,
    keyword: globalFilter || undefined,
    sortBy,
    sort,
  })
  const lang = useGetLanguage()
  const columns: MRT_ColumnDef<Language>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: t('lang.name'),
        size: 300,
      },
      {
        accessorKey: 'locale',
        header: t('lang.locale'),
      },
      {
        accessorKey: 'image',
        enableSorting: false,
        header: t('lang.icon'),
        Cell: ({ row }) => <Avatar src={row?.original?.image?.path} alt={row?.original?.image?.filename} />,
      },
    ],
    [lang],
  )
  const { mutateAsync } = useDeleteLanguage()

  const deleteM = (id: number) => {
    openModal({
      children: (
        <DeleteModal
          label={t('lang.deleteLabel')}
          onDelete={mutateAsync}
          id={id}
        />
      ),
      title: t('lang.deleteTitle'),
    })
  }

  return (
    <MTable
      columns={columns}
      data={languages?.data || []}
      manualPagination={true}
      rowCount={languages?.meta.total}
      onPaginationChange={setPagination}
      deleteM={deleteM}
      state={{
        isLoading: isFetching,
        pagination: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
        globalFilter,
        sorting,
        showSkeletons: false,
      }}
      enableRowActions={true}
      errorText={error?.message}
      isError={isError}
      manualSorting={true}
      manualFiltering={true}
      onSortingChange={setSorting}
      onGlobalFilterChange={(value) => {
        setGlobalFilter(value ?? null)
      }}
    />
  )
}
