import { Action, IAgentRuntime, Memory } from "@elizaos/core";
import { volumeProvider } from "../providers";

export const getVolumeCardsAction: Action = {
    name: "GET_VOLUME_CARDS",
    similes: ["CHECK_VOLUME_CARDS", "SHOW_VOLUME_CARDS"],
    description: "Fetch and display Parallel cards with highest trading volume",
    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        return message.content.text.toLowerCase().includes("volume");
    },
    handler: async (runtime: IAgentRuntime, message: Memory) => {
        const stats = await volumeProvider.get(runtime, message);
        return {
            text: `Here are the Parallel cards with highest trading volume:\n${stats}`,
            action: "GET_VOLUME_CARDS"
        };
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "Show me the Parallel cards with highest trading volume" }
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here are the Parallel cards with highest trading volume...",
                    action: "GET_VOLUME_CARDS"
                }
            }
        ]
    ]
};