import { http } from "@/shared/http/http"
import { Organization, OrganizationFormBody, UploadOrganizationLogoBody } from "../types"
import { FilterParams } from "@/shared/types/filterParams"
import { ResponseWithData, ResponseWithMessage, ResponseWithPagination } from "@/shared/types/http"

export const organizationApi = {
    index: async (params: FilterParams) => {
        const { data } = await http.get<ResponseWithPagination<Organization[]>>('/admin/organization', { params })
        return data
    },
    show: async (id: string) => {
        const { data } = await http.get<ResponseWithData<Organization>>(`/admin/organization/${id}`)
        return data
    },
    create: async (body: OrganizationFormBody) => {
        const { data } = await http.post<ResponseWithData<Organization>>('/admin/organization', body)
        return data
    },
    update: async (id: string, body: OrganizationFormBody) => {
        const { data } = await http.put<ResponseWithData<Organization>>(`/admin/organization/${id}`, body)
        return data
    },
    delete: async (id: string) => {
        const { data } = await http.delete<ResponseWithMessage>(`/admin/organization/${id}`)
        return data
    },
    uploadFile: async (body: { file: File }) => {
        const { data } = await http.post<ResponseWithData<UploadOrganizationLogoBody>>('/admin/organization/upload', {
            logo: body.file
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    }
}