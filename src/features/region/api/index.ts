import { http } from '@/shared/http/http';
import { FilterParams } from '@/shared/types/filterParams';
import { ResponseWithPagination } from '@/shared/types/http';
import { Region, RegionFormData } from '../types';

export const regionApi = {
  index: async (params: FilterParams) => {
    const { data } = await http.get<ResponseWithPagination<Region[]>>('/admin/region', { params });
    return data;
  },
  show: async (id: number) => {
    const { data } = await http.get<Region>(`/admin/region/${id}`);
    return data;
  },
  create: async (body: RegionFormData) => {
    const { data } = await http.post<Region>('/admin/region', body);
    return data;
  },
  update: async (id: number, body: RegionFormData) => {
    const { data } = await http.put<Region>(`/admin/region/${id}`, body);
    return data;
  },
  delete: async (id: number) => {
    const { data } = await http.delete<Region>(`/admin/region/${id}`);
    return data;
  },
};
