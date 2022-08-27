import {  Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { ReferralEntity } from "../entities/referral.entity";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class ReferralService {
  constructor(@InjectEntityManager("default") private entityManager:EntityManager,
              @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,
              @InjectRepository(ReferralEntity) private referralRepo:Repository<ReferralEntity>
              )
  {}

  async userTreeChildren(userId:string):Promise<Object>
  {
    const treeRepository=this.entityManager.getTreeRepository(ReferralEntity)
    const findUserReferral=await this.referralRepo.createQueryBuilder("referral")
      .innerJoin("referral.obj_user","user")
      .where("user.id = :userId",{userId})
      .getOne()

    const findChildrenTree=await treeRepository.findDescendantsTree(findUserReferral,{relations:["obj_user"]})
    const countChildren=await treeRepository.countDescendants(findUserReferral)
    return {
      childs:findChildrenTree,
      count:countChildren-1
    }
  }
}