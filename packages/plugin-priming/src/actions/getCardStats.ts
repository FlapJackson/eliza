import { Action, IAgentRuntime, Memory } from "@elizaos/core";
import { cardProvider } from "../providers/cardProvider";

export const getCardStatsAction: Action = {
    name: "GET_CARD_STATS",
    similes: [
        // Popularity related
        "CHECK_CARD_STATS", "SHOW_CARD_STATS", "GET_POPULAR_CARDS",
        "MOST_PLAYED_CARDS", "TRENDING_CARDS", "FAVORITE_CARDS",
        // Win rate related
        "GET_WINRATE_CARDS", "BEST_PERFORMING_CARDS", "STRONGEST_CARDS",
        "MOST_SUCCESSFUL_CARDS", "HIGHEST_WINRATE",
        // Volume related
        "GET_VOLUME_CARDS", "MOST_TRADED_CARDS", "TRADING_VOLUME",
        "MARKET_ACTIVITY", "TRANSACTION_VOLUME",
        // Volume specific
        "GET_SELLING_CARDS", "SHOW_MARKET_VOLUME", "MOST_TRADED_CARDS",
        "HIGHEST_VOLUME_CARDS", "WHAT_CARDS_ARE_SELLING", "MARKET_ACTIVITY",
        "TRADING_VOLUME", "SALES_DATA"
    ],
    description: "Fetch and display Parallel card statistics (popularity, win rate, or volume)",
    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        const text = message.content.text.toLowerCase();

        // Popularity keywords
        const popularityTerms = ['popular', 'trending', 'most played', 'favorite', 'favourite'];
        // Win rate keywords
        const winTerms = ['win', 'success', 'performance', 'strongest', 'best performing'];
        // Volume keywords
        const volumeTerms = ['volume', 'trade', 'transaction', 'activity', 'market', 'sales', 'sold'];

        return popularityTerms.some(term => text.includes(term)) ||
               winTerms.some(term => text.includes(term)) ||
               volumeTerms.some(term => text.includes(term));
    },
    handler: async (runtime: IAgentRuntime, message: Memory) => {
        const stats = await cardProvider.get(runtime, message);
        return {
            text: stats,
            action: "GET_CARD_STATS"
        };
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "What are the most popular Parallel cards?" }
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here are the most popular Parallel cards...",
                    action: "GET_CARD_STATS"
                }
            }
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Which cards have the highest win rates?" }
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here are the cards with highest win rates...",
                    action: "GET_CARD_STATS"
                }
            }
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Show me the galaxy key transaction volume" }
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here are the cards with highest trading volume...",
                    action: "GET_CARD_STATS"
                }
            }
        ]
    ]
};