import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

export const useGetSearchParam = (key: string) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const value = useMemo(() => searchParams.get(key), [searchParams, key])

  const setValue = (newValue: string | null) => {
    const newParams = new URLSearchParams(searchParams)

    if (newValue) {
      newParams.set(key, newValue)
    } else {
      newParams.delete(key)
    }

    setSearchParams(newParams, { replace: true })
  }

  return [value, setValue] as const
}
