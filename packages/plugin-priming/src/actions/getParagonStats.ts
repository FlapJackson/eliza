import { Action, IAgentRuntime, Memory } from "@elizaos/core";
import { paragonProvider } from "../providers/paragonProvider";

export const getParagonStatsAction: Action = {
    name: "GET_PARAGON_STATS",
    similes: [
        // Overview queries
        "CHECK_PARAGON_STATS", "SHOW_PARAGON_STATS",
        "GET_PARAGON_DETAILS", "SHOW_PARAGON_DETAILS",
        "WHAT_DOES_PARAGON_DO", "HOW_DOES_PARAGON_WORK",
        // Matchup queries
        "GET_PARAGON_MATCHUPS", "SHOW_PARAGON_MATCHUPS",
        "WHO_BEATS_PARAGON", "WHO_DOES_PARAGON_BEAT",
        "PARAGON_WIN_RATES", "PARAGON_VERSUS",
        // Deck queries
        "GET_PARAGON_DECK", "SHOW_PARAGON_DECK",
        "WHAT_TO_PLAY_WITH_PARAGON", "HOW_TO_BUILD_PARAGON",
        "BEST_PARAGON_DECK", "TOP_PARAGON_DECK",
        // Core card queries
        "WHAT_CARDS_GO_WITH_PARAGON", "SHOW_PARAGON_CORE_CARDS",
        "MOST_USED_CARDS_WITH_PARAGON", "PARAGON_STAPLES",
        "WHAT_DO_PEOPLE_PLAY_WITH_PARAGON"
    ],
    description: "Fetch and display Parallel Paragon statistics (overview, matchups, or deck builds)",
    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        const text = message.content.text.toLowerCase();

        // Check if message contains a paragon name
        const paragonNames = [
            'jahn', 'arak', 'gaffar', 'lemieux', 'catherine',
            'armoured division', 'gnaeus', 'scipius', 'aetio',
            'juggernaut', 'brand', 'niamh', 'new dawn',
            'shoshanna', 'nehemiah'
        ];

        const hasParagonName = paragonNames.some(name =>
            text.includes(name.toLowerCase())
        );

        // Check for relevant keywords
        const keywords = [
            'paragon', 'deck', 'build', 'matchup', 'versus', 'vs',
            'stats', 'details', 'info', 'about'
        ];
        const hasKeyword = keywords.some(word => text.includes(word));

        return hasParagonName && hasKeyword;
    },
    handler: async (runtime: IAgentRuntime, message: Memory) => {
        const stats = await paragonProvider.get(runtime, message);
        return {
            text: stats,
            action: "GET_PARAGON_STATS"
        };
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "Tell me about Scipius" }
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here are Scipius's details...",
                    action: "GET_PARAGON_STATS"
                }
            }
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "What are Lemieux's matchups like?" }
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here are Lemieux's top matchups...",
                    action: "GET_PARAGON_STATS"
                }
            }
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Show me Catherine's best deck" }
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here's Catherine's top performing deck...",
                    action: "GET_PARAGON_STATS"
                }
            }
        ]
    ]
};