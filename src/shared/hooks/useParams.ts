import { MRT_SortingState } from 'mantine-react-table'
import { useState } from 'react'

interface useListParamsProps {
  pagination: { pageIndex: number; pageSize: number }
  globalFilter: string
  sorting: MRT_SortingState
}

export const useListParams = (
  props: useListParamsProps = {
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    globalFilter: '',
    sorting: [],
  }
) => {
  const [pagination, setPagination] = useState(props.pagination)
  const [sorting, setSorting] = useState<MRT_SortingState>(props.sorting)
  const [globalFilter, setGlobalFilter] = useState(props.globalFilter)

  const orderby = sorting.length ? sorting[0].id : undefined
  const sort: 'desc' | 'asc' | undefined = sorting.length
    ? sorting[0].desc
      ? 'asc'
      : 'desc'
    : undefined

  return {
    orderby,
    sort,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    pagination,
    setPagination,
  }
}
