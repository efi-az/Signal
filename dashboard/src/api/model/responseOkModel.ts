export interface ResponseOkModel<T> {
    status: number
    result: T | any,
    timestamps: number
}