import { Body, Controller, Patch, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RouteService } from "../service/route.service";
import { CreateRouteDto } from "../dto/create-route.dto";
import { RoutesEntity } from "../entities/routes.entity";
import { AssignPermissionRouteDto } from "../dto/assign-permission-route.dto";

@ApiTags("route")
@Controller("route")
export class RouteController {
  constructor(private routeService:RouteService)
  {}

  @Post("create")
  async createRoute(@Body() createRouteDto:CreateRouteDto):Promise<RoutesEntity>
  {
    return this.routeService.createRoute(createRouteDto)
  }

  @Put("assign/permission/route")
  async assignPermissionToRoute(@Body() assignPermissionToRouteDto:AssignPermissionRouteDto):Promise<RoutesEntity>
  {
    return this.routeService.assignPermissionToRoute(assignPermissionToRouteDto)
  }
}