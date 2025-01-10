import { Action, IAgentRuntime, Memory, elizaLogger } from "@elizaos/core";
import { paragonProvider } from "../providers/paragonProvider";

const paragonNames = [
    'jahn', 'arak', 'gaffar', 'lemieux', 'catherine',
    'armoured division', 'gnaeus', 'scipius', 'aetio',
    'juggernaut', 'brand', 'niamh', 'new dawn',
    'shoshanna', 'nehemiah'
];

export const getParagonStatsAction: Action = {
    name: "GET_PARAGON_STATS",
    similes: [
        // Overview queries
        ...paragonNames.flatMap(name => [
            `CHECK_${name.toUpperCase()}_STATS`,
            `SHOW_${name.toUpperCase()}_STATS`,
            `GET_${name.toUpperCase()}_DETAILS`,
            `WHAT_DOES_${name.toUpperCase()}_DO`
        ]),
        // Matchup queries
        ...paragonNames.flatMap(name => [
            `GET_${name.toUpperCase()}_MATCHUPS`,
            `WHO_BEATS_${name.toUpperCase()}`,
            `WHO_DOES_${name.toUpperCase()}_BEAT`,
            `${name.toUpperCase()}_WIN_RATES`
        ]),
        // Deck queries
        ...paragonNames.flatMap(name => [
            `GET_${name.toUpperCase()}_DECK`,
            `HOW_TO_BUILD_${name.toUpperCase()}`,
            `BEST_${name.toUpperCase()}_DECK`
        ]),
        // Core card queries
        ...paragonNames.flatMap(name => [
            `WHAT_CARDS_GO_WITH_${name.toUpperCase()}`,
            `SHOW_${name.toUpperCase()}_CORE_CARDS`,
            `${name.toUpperCase()}_STAPLES`
        ])
    ],
    description: "Fetch and display Parallel Paragon statistics (overview, matchups, or deck builds)",
    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        const text = message.content.text.toLowerCase();

        const hasParagonName = paragonNames.some(name =>
            text.includes(name.toLowerCase())
        );

        // Expand keywords to include more variations
        const keywords = [
            'paragon', 'deck', 'build', 'matchup', 'versus', 'vs',
            'stats', 'details', 'info', 'about', 'beat', 'win',
            'against', 'play', 'rate', 'performance', 'how'
        ];
        const hasKeyword = keywords.some(word => text.includes(word));

        // Add debug logging
        elizaLogger.debug(`[PrimingPlugin] Validating message: "${text}"`);
        elizaLogger.debug(`[PrimingPlugin] Has paragon name: ${hasParagonName}`);
        elizaLogger.debug(`[PrimingPlugin] Has keyword: ${hasKeyword}`);

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