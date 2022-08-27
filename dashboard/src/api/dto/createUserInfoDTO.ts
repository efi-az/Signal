import type {GenderEnum} from "../enum/genderEnum";

export interface CreateUserInfoDTO {
    firstName: string
    lastName: string
    gender: GenderEnum
}