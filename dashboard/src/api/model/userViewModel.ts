import type {UserStatusEnum} from "../enum/userStatusEnum";

export interface UserViewModel {
    id: string
    mobilePrefix?: string;
    mobile?: string;
    email?: string;
    createdAt: Date;
    updatedAt: Date;
    status: UserStatusEnum;
}