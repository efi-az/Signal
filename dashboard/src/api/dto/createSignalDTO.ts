import type { TargetPointViewModel } from "../model/targetPointsViewModel"

export interface CreateSignalDTO {
    leverage: number | null
    risk: number | null
    entryPrice: number | null
    stopLoss: number | null
    targetPoints: TargetPointViewModel[] | []
    description: string | null
    imageId: string | null
    marketId: string | null
}

export interface CreateSignalParamDTO {
    market: 'Spot' | 'Feature' | 'Hold'
    bargin: 'Buy' | 'Sell' | 'Short' | 'Long'
    status: 'Active' | 'Archive' | 'Draft'
}