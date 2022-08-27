import type {PaginationMetaOptionModel} from "./paginationMetaOptionModel";

export interface PaginationResponseModel<T> {
    data: T[],
    meta: PaginationMetaOptionModel
}