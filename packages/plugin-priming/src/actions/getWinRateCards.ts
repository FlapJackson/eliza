import { Action, IAgentRuntime, Memory } from "@elizaos/core";
import { winRateProvider } from "../providers";

export const getWinRateCardsAction: Action = {
    name: "GET_WINRATE_CARDS",
    similes: ["CHECK_WINRATE_CARDS", "SHOW_WINRATE_CARDS"],
    description: "Fetch and display Parallel cards with highest win rates",
    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        return message.content.text.toLowerCase().includes("win");
    },
    handler: async (runtime: IAgentRuntime, message: Memory) => {
        const stats = await winRateProvider.get(runtime, message);
        return {
            text: `Here are the Parallel cards with highest win rates:\n${stats}`,
            action: "GET_WINRATE_CARDS"
        };
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "Which Parallel cards have the highest win rates?" }
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here are the Parallel cards with highest win rates...",
                    action: "GET_WINRATE_CARDS"
                }
            }
        ]
    ]
};