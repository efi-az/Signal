import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyService } from '../services/currency.service';
import { UseJwtGuard } from '../../../guards/jwt.guard';
import { UseBearerAuth } from '../../../configuration/swagger/use-bearer-auth.decorator';
import { CurrencyDto } from '../dto/currency.dto';
import { CurrencyEntity } from '../entities/currency.entity';
import { PageDto } from '../../../utils/pagination/dto/page.dto';
import { PageOptionsDto } from '../../../utils/pagination/dto/page-option.dto';

@ApiTags("[Currency]")
@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {
  }

  @Post()
  @UseJwtGuard()
  @UseBearerAuth()
  async createCurrency(@Body() currencyDto: CurrencyDto): Promise<CurrencyEntity> {
    return await this.currencyService.createCurrency(currencyDto)
  }

  @Put(':id')
  @UseJwtGuard()
  @UseBearerAuth()
  async updateCurrency(@Body() currencyDto: CurrencyDto, @Param('id') currencyId: string): Promise<CurrencyEntity> {
    return await this.currencyService.updateCurrency(currencyDto, currencyId)
  }

  @Put('status/:id')
  @UseJwtGuard()
  @UseBearerAuth()
  async changeStatus(@Param('id') currencyId: string): Promise<CurrencyEntity> {
    return await this.currencyService.changeStatus(currencyId)
  }

  @Delete(':id')
  @UseJwtGuard()
  @UseBearerAuth()
  async deleteCurrency(@Param('id') currencyId: string): Promise<any> {
    return await this.currencyService.deleteCurrency(currencyId)
  }

  @Get()
  async getAllPagination(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CurrencyEntity>> {
    return await this.currencyService.getAllPagination(pageOptionsDto)
  }

}