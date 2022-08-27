import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CountryService } from "../service/country.service";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { CountriesEntity } from "../entities/countries.entity";

@ApiTags("Countries")
@Controller("country")
export class CountryController {
  constructor(private countryService:CountryService)
  {}

  @Get()
  async countryListPagination():Promise<any>
  {
    return this.countryService.countryList()
  }
}