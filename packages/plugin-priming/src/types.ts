export interface CardData {
    name: string;
    parallel: string;
    rarity: string;
    transactions: number;
    winRate: number;
    popularity: number;
    expansion: string;
    image: string;
    functionText: string;
    averagePrice: number;
    volume: number;
}

export interface CacheEntry {
    timestamp: number;
    data: CardData[];
}