export type FilterParams = {
  page?: number
  pageSize?: number
  search?: string | null
  orderby?: string
  sort?: 'asc' | 'desc'
  role?: string | unknown
  status?: string
  academic_degree_id?: number
  season_id?: number | null
  semester?: number
  start_academic_year?: number
  end_academic_year?: number
  country_id?: number
  keyword?: string
  start_id?: number
  take?: number
}
