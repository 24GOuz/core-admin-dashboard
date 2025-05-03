export interface IResponse<T> {
    message: string
    data: T
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
