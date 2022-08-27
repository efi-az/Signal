import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoutesEntity } from "../entities/routes.entity";
import { In, Repository } from "typeorm";
import { CreateRouteDto } from "../dto/create-route.dto";
import { AssignPermissionRouteDto } from "../dto/assign-permission-route.dto";
import { PermissionEntity } from "../entities/permission.entity";

@Injectable()
export class RouteService {
  constructor(@InjectRepository(RoutesEntity) private routeRepo:Repository<RoutesEntity>,
              @InjectRepository(PermissionEntity) private permissionRope:Repository<PermissionEntity>)
  {}

  async createRoute(createRouteDto:CreateRouteDto):Promise<RoutesEntity>
  {
    const findDuplicate=await this.routeRepo.findOne({where:{address:createRouteDto.address}})
    if (findDuplicate)
      throw new BadRequestException()

    const route=new RoutesEntity()
    route.address=createRouteDto.address
    route.description=createRouteDto.description
    route.method=createRouteDto.method
    route.category=createRouteDto.category
    const save=await this.routeRepo.save(await this.routeRepo.create(route))
    return save
  }

  async assignPermissionToRoute(assignPermissionToRouteDto:AssignPermissionRouteDto):Promise<RoutesEntity>
  {
    const findRoute=await this.routeRepo.findOne({where:{id:assignPermissionToRouteDto.routeId},relations:["obj_permission"]})
    const findPermissions=await this.permissionRope.find({where:{id:In(assignPermissionToRouteDto.permissionIds)}})
      findRoute.obj_permission.concat(findPermissions)
    const save=await this.routeRepo.save(await this.routeRepo.create(findRoute))

    return save
  }


}