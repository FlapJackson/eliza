import { Action, IAgentRuntime, Memory } from "@elizaos/core";
import { popularityProvider } from "../providers";

export const getPopularCardsAction: Action = {
    name: "GET_POPULAR_CARDS",
    similes: ["CHECK_POPULAR_CARDS", "SHOW_POPULAR_CARDS"],
    description: "Fetch and display most popular Parallel cards",
    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        return message.content.text.toLowerCase().includes("popular");
    },
    handler: async (runtime: IAgentRuntime, message: Memory) => {
        const stats = await popularityProvider.get(runtime, message);
        return {
            text: `Here are the most popular Parallel cards:\n${stats}`,
            action: "GET_POPULAR_CARDS"
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
                    action: "GET_POPULAR_CARDS"
                }
            }
        ]
    ]
};