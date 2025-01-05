import { IAgentRuntime, Memory, State, elizaLogger } from "@elizaos/core";
import { CardData } from "../types";

export async function fetchCardData(orderBy: string, runtime: IAgentRuntime): Promise<CardData[]> {
    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60);

    elizaLogger.info(`[PrimingPlugin] Fetching card stats ordered by ${orderBy}`);

    // Single API call with take=100
    const response = await fetch(
        `https://api.priming.xyz/parallel/cards/top/selling?take=10&skip=0&startTimestamp=${oneMonthAgo}&endTimestamp=${now}&denomination=usd&orderBy=${orderBy}`
    );

    if (!response.ok) {
        elizaLogger.error(`[PrimingPlugin] API Error: ${response.status} ${response.statusText}`);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    elizaLogger.debug(`[PrimingPlugin] Received ${data.length} entries`);

    // Map the data once and return
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