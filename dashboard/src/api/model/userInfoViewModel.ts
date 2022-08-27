import type {GenderEnum} from "@/api/enum/genderEnum";

export interface UserInfoViewModel {
    id: string
    firstName: string
    lastName: string
    gender: GenderEnum
    createdAt: Date
    updatedAt:Date
}