import { Provider, IAgentRuntime, Memory, State, elizaLogger } from "@elizaos/core";
import { CardData } from "../types";
import { CacheManager } from "../cache";

type OrderByType = 'popularity' | 'winRate' | 'volume';

async function fetchCardData(orderBy: OrderByType, runtime: IAgentRuntime): Promise<CardData[]> {
    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60);

    elizaLogger.info(`[PrimingPlugin] Fetching card stats ordered by ${orderBy}`);
    const response = await fetch(
        `https://api.priming.xyz/parallel/cards/top/selling?take=10&skip=0&startTimestamp=${oneMonthAgo}&endTimestamp=${now}&denomination=usd&orderBy=${orderBy}`
    );

    if (!response.ok) {
        elizaLogger.error(`[PrimingPlugin] API Error: ${response.status} ${response.statusText}`);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    elizaLogger.debug(`[PrimingPlugin] Received ${data.length} entries`);

    return data.map((card: any) => ({
        name: card.name,
        parallel: card.parallel,
        rarity: card.rarity,
        transactions: card.transactions,
        winRate: card.winRate,
        popularity: card.popularity,
        expansion: card.expansion,
        image: card.image,
        functionText: card.functionText,
        averagePrice: card.averagePrice,
        volume: card.volume
    }));
}

export const cardProvider: Provider = {
    get: async (runtime: IAgentRuntime, message: Memory, _state?: State) => {
        const text = message.content.text.toLowerCase();

        // Popularity keywords
        const popularityTerms = ['popular', 'trending', 'most played', 'favorite', 'favourite'];
        // Win rate keywords
        const winTerms = ['win', 'success', 'performance', 'strongest', 'best performing'];
        // Volume keywords
        const volumeTerms = ['volume', 'trade', 'transaction', 'activity', 'market', 'galaxy', 'sales', 'sold'];

        let orderBy: OrderByType;

        if (popularityTerms.some(term => text.includes(term))) {
            orderBy = 'popularity';
        } else if (winTerms.some(term => text.includes(term))) {
            orderBy = 'winRate';
        } else if (volumeTerms.some(term => text.includes(term))) {
            orderBy = 'volume';
        } else {
            // Return undefined if we can't handle this request
            return undefined;
        }

        const data = await CacheManager.withCache(orderBy, () => fetchCardData(orderBy, runtime));
        return `${orderBy.charAt(0).toUpperCase() + orderBy.slice(1)} Cards:\n${JSON.stringify(data, null, 2)}`;
    }
};