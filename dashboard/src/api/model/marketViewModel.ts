import type { MarketStatusEnum } from './marketStatusEnum';

export interface MarketViewModel {
    id: string
    crypto: string
    base: string
    image: string
    status: MarketStatusEnum
}