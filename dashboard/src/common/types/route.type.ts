import type { RouteRecordRaw } from "vue-router"

export type RouteMetaType = {
    title: string,
    icon: string,
    order?: number,
}

export type RouteMetaOptionalShowType = {
    showInMenu: false,
    title?: string,
    icon?: string,
    order?: number,
}

export type RouteRecordType = RouteRecordRaw & {
    meta: RouteMetaOptionalShowType | RouteMetaType,
    children?: RouteRecordType[]
}
