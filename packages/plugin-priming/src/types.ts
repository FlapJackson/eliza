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

export interface ParagonDetails {
    title: string;
    parallel: string;
    rarity: string;
    functionText: string;
    passiveAbility: string;
    cost: number;
    attack: number;
    health: number;
}

export interface ParagonMatchup {
    vsParagonId: string;
    totalGames30: number;
    totalWinRate30: number;
}

export interface ParagonDeck {
    code: string;
    winRate: number;
    games: number;
    averageGameSeconds: number;
}

export interface CoreCard {
    name: string;
    frequency: number;
    parallel: string;
    rarity: string;
    cardType: string;
    cost: number;
    attack?: number;
    health?: number;
}