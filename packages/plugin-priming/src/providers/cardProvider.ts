import { Provider, IAgentRuntime, Memory, State, elizaLogger } from "@elizaos/core";
import { CardData } from "../types";
import { CacheManager } from "../cache";

type OrderByType = 'popularity' | 'winRate' | 'volume';

async function fetchCardData(orderBy: OrderByType, runtime: IAgentRuntime): Promise<CardData[]> {
    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60);

    elizaLogger.info(`[PrimingPlugin] Fetching card stats ordered by ${orderBy}`);
    const response = await fetch(
        `https://api.priming.xyz/parallel/cards/top/selling?take=50&skip=0&startTimestamp=${oneMonthAgo}&endTimestamp=${now}&denomination=usd&orderBy=${orderBy}`
    );

    if (!response.ok) {
        elizaLogger.error(`[PrimingPlugin] API Error: ${response.status} ${response.statusText}`);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    elizaLogger.info(`[PrimingPlugin] Raw API response: ${JSON.stringify(data)}`);
    elizaLogger.info(`[PrimingPlugin] Received ${data.length} entries`);

    const mappedData = data.map((card: any) => ({
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
    elizaLogger.info(`[PrimingPlugin] Mapped data: ${JSON.stringify(mappedData)}`);
    return mappedData;
}

export const cardProvider: Provider = {
    get: async (runtime: IAgentRuntime, message: Memory, _state?: State) => {
        const text = message.content.text.toLowerCase();
        elizaLogger.info(`[PrimingPlugin] Processing request: "${text}"`);

        // Popularity keywords
        const popularityTerms = ['popular', 'trending', 'most played', 'favorite', 'favourite'];
        // Win rate keywords
        const winTerms = ['win', 'success', 'performance', 'strongest', 'best performing'];
        // Volume keywords
        const volumeTerms = ['volume', 'trade', 'transaction', 'activity', 'market', 'galaxy', 'sales', 'sold'];

        let orderBy: OrderByType;

        if (popularityTerms.some(term => text.includes(term))) {
            orderBy = 'popularity';
            elizaLogger.info(`[PrimingPlugin] Fetching popularity data`);
            const data = await CacheManager.withCache(orderBy, () => fetchCardData(orderBy, runtime));
            elizaLogger.info(`[PrimingPlugin] Processing popularity data for ${data.length} cards`);

            const validCards = data.filter(card =>
                card.popularity !== null &&
                card.popularity !== undefined &&
                card.winRate !== null &&
                card.winRate !== undefined
            );
            elizaLogger.info(`[PrimingPlugin] Found ${validCards.length} cards with valid data`);

            const sortedCards = validCards
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 10)
                .map(card => `${card.name}: ${card.popularity.toFixed(1)}% play rate (${card.winRate.toFixed(1)}% win rate)`);

            const response = `Most popular cards (last 30 days):\n${sortedCards.join('\n')}`;
            elizaLogger.info(`[PrimingPlugin] Sending response: ${response}`);
            return response;

        } else if (winTerms.some(term => text.includes(term))) {
            orderBy = 'winRate';
            elizaLogger.info(`[PrimingPlugin] Fetching win rate data`);
            const data = await CacheManager.withCache(orderBy, () => fetchCardData(orderBy, runtime));
            elizaLogger.info(`[PrimingPlugin] Processing win rate data for ${data.length} cards`);

            const validCards = data.filter(card =>
                card.popularity !== null &&
                card.popularity !== undefined &&
                card.winRate !== null &&
                card.winRate !== undefined
            );
            elizaLogger.info(`[PrimingPlugin] Found ${validCards.length} cards with valid data`);

            // Filter for cards with popularity >= 25%
            const significantCards = validCards
                .filter(card => card.popularity >= 25);
            elizaLogger.info(`[PrimingPlugin] Found ${significantCards.length} cards with >= 25% popularity`);
            elizaLogger.info(`[PrimingPlugin] Filtered cards: ${JSON.stringify(significantCards.map(c => ({ name: c.name, popularity: c.popularity, winRate: c.winRate })))}`);

            const sortedCards = significantCards
                .sort((a, b) => b.winRate - a.winRate)
                .slice(0, 10)
                .map(card => `${card.name}: ${card.winRate.toFixed(1)}% win rate (${card.popularity.toFixed(1)}% popularity)`);

            const response = `Top performing cards (minimum 25% popularity):\n${sortedCards.join('\n')}`;
            elizaLogger.info(`[PrimingPlugin] Available win rate data: ${response}`);
            return response;
        } else if (volumeTerms.some(term => text.includes(term))) {
            orderBy = 'volume';
            const data = await CacheManager.withCache(orderBy, () => fetchCardData(orderBy, runtime));

            const validCards = data.filter(card =>
                card.volume !== null &&
                card.volume !== undefined &&
                card.transactions !== null &&
                card.transactions !== undefined
            );
            elizaLogger.info(`[PrimingPlugin] Found ${validCards.length} cards with valid volume data`);

            const sortedCards = validCards
                .sort((a, b) => b.volume - a.volume)
                .slice(0, 10)
                .map(card => `${card.name}: $${card.volume.toLocaleString()} (${card.transactions} trades)`);

            return `Most traded cards (last 30 days):\n${sortedCards.join('\n')}`;
        } else {
            // Return undefined if we can't handle this request
            return undefined;
        }

        const data = await CacheManager.withCache(orderBy, () => fetchCardData(orderBy, runtime));
        return `${orderBy.charAt(0).toUpperCase() + orderBy.slice(1)} Cards:\n${JSON.stringify(data, null, 2)}`;
    }
};