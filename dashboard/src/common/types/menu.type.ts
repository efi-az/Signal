export type MenuType = {
    id?: number;
    title?: string;
    icon?: string;
    link: string;
    level?: number;
    children?: MenuType[] | null;
};