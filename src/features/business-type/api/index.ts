import { http } from '@/shared/http/http';
import { FilterParams } from '@/shared/types/filterParams';
import { ResponseWithData, ResponseWithMessage, ResponseWithPagination } from '@/shared/types/http';
import { BusinessType, BusinessTypeFormBody } from '../types';

export const businessTypeApi = {
  index: async (params: FilterParams) => {
    const response = await http.get<ResponseWithPagination<BusinessType[]>>(
      '/admin/business-type',
      { params }
    );
    return response.data;
  },
  show: async (id: string) => {
    const response = await http.get<ResponseWithData<BusinessType>>(`/admin/business-type/${id}`);
    return response.data;
  },
  create: async (data: BusinessTypeFormBody) => {
    const response = await http.post<ResponseWithData<BusinessType>>('/admin/business-type', data);
    return response.data;
  },
  update: async (id: string, data: BusinessTypeFormBody) => {
    const response = await http.put<ResponseWithData<BusinessType>>(
      `/admin/business-type/${id}`,
      data
    );
    return response.data;
  },
  delete: async (id: string) => {
    const response = await http.delete<ResponseWithMessage>(`/admin/business-type/${id}`);
    return response.data;
  },
};
