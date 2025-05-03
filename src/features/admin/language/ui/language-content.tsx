import { Avatar } from '@mantine/core'
import { MRT_ColumnDef } from 'mantine-react-table'
import {
  useDeleteLanguange,
  useFetchLanguages,
} from '../queries/language-queries'
import { Edit } from './edit'
import { Language } from '../types/language-types'
import { useListParams } from '@/shared/hooks/useParams'
import { openModal } from '@mantine/modals'
import { DeleteModal } from '@/shared/ui/delete-modal/delete-modal'
import { useMemo } from 'react'
import { useGetLanguage } from '@/shared/hooks/use-get-language'
import { useMainTranslation } from '@/shared/hooks/use-main-translation.tsx'

export const LanguageContent = () => {
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
  
  const t = useMainTranslation()

  const {
    data: languages,
    isFetching,
    error,
    isError,
  } = useFetchLanguages({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search: globalFilter || undefined,

    orderby,
    sort: sort,
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
        accessorKey: 'icon',
        enableSorting: false,
        header: t('lang.icon'),
        Cell: ({ row }) => <Avatar src={row.original.icon} alt="it's me" />,
      },
    ],
    [lang],
  )
  const editM = (id: number) =>
    openModal({ children: <Edit id={id} />, title: t('lang.editTitle') })
  const { mutateAsync } = useDeleteLanguange()

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
      editM={editM}
      deleteM={deleteM}
      state={{
        isLoading: isFetching,
        pagination,
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
