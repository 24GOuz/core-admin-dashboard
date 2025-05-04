export interface ResponseWithData<T> extends Response {
    data: T
}

interface Response {
    code: number
    message?: string
}

type ValidationsError = Record<string, string[] | string>

export interface ILanguage {
    uz: string
    kk: string
    ru: string
}

export interface HTTPError extends Response {
    message: string
    errors?: ValidationsError
    status: number
}


export interface ResponseWithMessage extends Response {
    status: number
    message: string
}

export interface ResponseWithPagination<T> {
    data: T
    meta: {
        total: number
        per_page: number
        current_page: number
        last_page: number
        from: number
        to: number
        path: string
        links: { active: boolean; label: string; url: string }[]
    }
}