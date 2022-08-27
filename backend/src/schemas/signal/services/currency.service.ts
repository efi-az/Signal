import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyEntity } from '../entities/currency.entity';
import { CurrencyDto } from '../dto/currency.dto';
import { CurrencyEnum } from '../enums/currency.enum';
import { PageDto } from '../../../utils/pagination/dto/page.dto';
import { PageOptionsDto } from '../../../utils/pagination/dto/page-option.dto';
import { PageMetaDto } from '../../../utils/pagination/dto/page-meta.dto';

@Injectable()
export class CurrencyService {
  constructor(@InjectRepository(CurrencyEntity) private currencyRep: Repository<CurrencyEntity>) {
  }

  async createCurrency(currencyDto: CurrencyDto): Promise<CurrencyEntity> {
    const findCurrency = await this.currencyRep.findOne({ where: [{ name: currencyDto.name }, { status: currencyDto.status }] });
    if (findCurrency) throw new BadRequestException('duplicate currency');

    const currency = new CurrencyEntity();
    currency.name = currencyDto.name;
    currency.symbol = currencyDto.symbol;
    currency.status = currencyDto.status;
    return await this.currencyRep.save(await this.currencyRep.create(currency));
  }

  async updateCurrency(currencyDto: CurrencyDto, currencyId: string): Promise<CurrencyEntity> {
    const findCurrency = await this.currencyRep.findOne({ where: { id: currencyId } });
    if (!findCurrency) throw new BadRequestException('currency not found');

    findCurrency.name = currencyDto.name;
    findCurrency.symbol = currencyDto.symbol;
    findCurrency.status = currencyDto.status;
    return await this.currencyRep.save(findCurrency);
  }

  async changeStatus(currencyId: string): Promise<CurrencyEntity> {
    const findCurrency = await this.currencyRep.findOne({ where: { id: currencyId } });
    if (!findCurrency) throw new BadRequestException('currency not found');
    findCurrency.status === CurrencyEnum.ENABLE ? findCurrency.status = CurrencyEnum.DISABLE : findCurrency.status = CurrencyEnum.ENABLE;
    return await this.currencyRep.save(findCurrency);
  }

  async deleteCurrency(currencyId: string): Promise<any> {
    return await this.currencyRep.delete({ id: currencyId });
  }

  async getAllPagination(pageOptionsDto: PageOptionsDto): Promise<PageDto<CurrencyEntity>> {
    const queryBuilder = this.currencyRep.createQueryBuilder('currency');

    queryBuilder
      .where('currency.status = :status', { status: CurrencyEnum.ENABLE })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}