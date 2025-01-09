import { Provider, IAgentRuntime, Memory, State, elizaLogger } from "@elizaos/core";
import { ParagonDetails, ParagonMatchup, ParagonDeck } from "../types";
import { CacheManager } from "../cache";

const PARAGON_MAP: { [key: string]: string } = {
    "Jahn": "CB-9",
    "Arak": "CB-21",
    "Gaffar": "CB-62",
    "Lemieux": "CB-171",
    "Catherine": "CB-197",
    "Armoured Division": "CB-277",
    "Gnaeus": "CB-371",
    "Scipius": "CB-373",
    "Aetio": "CB-375",
    "Juggernaut": "CB-376",
    "Brand": "CB-378",
    "Niamh": "CB-379",
    "New Dawn": "CB-380",
    "Shoshanna": "CB-389",
    "Nehemiah": "CB-390"
};

async function fetchParagonDetails(paragonId: string): Promise<ParagonDetails> {
    elizaLogger.info(`[PrimingPlugin] Fetching details for paragon ${paragonId}`);
    const response = await fetch(
        `https://api.priming.xyz/parallel/cards/game/paragon-overview?paragonId=${paragonId}`
    );

    if (!response.ok) {
        elizaLogger.error(`[PrimingPlugin] API Error: ${response.status} ${response.statusText}`);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.details;
}

async function fetchParagonMatchups(paragonId: string): Promise<ParagonMatchup[]> {
    elizaLogger.info(`[PrimingPlugin] Fetching matchups for paragon ${paragonId}`);
    const response = await fetch(
        `https://api.priming.xyz/parallel/cards/game/paragon-vs-paragon?paragonId=${paragonId}`
    ); //todo: take only relevant stats from response. Agent is getting too much data

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}

async function fetchParagonDecks(paragonId: string): Promise<ParagonDeck[]> {
    elizaLogger.info(`[PrimingPlugin] Fetching top decks for paragon ${paragonId}`);
    const response = await fetch(
        `https://api.priming.xyz/parallel/cards/game/paragon-top-decks?paragonId=${paragonId}&period=30`
    );

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.decks;
}

export const paragonProvider: Provider = {
    get: async (runtime: IAgentRuntime, message: Memory, _state?: State) => {
        const text = message.content.text.toLowerCase();

        // Find which paragon is being asked about
        const paragonName = Object.keys(PARAGON_MAP).find(name =>
            text.toLowerCase().includes(name.toLowerCase())
        );

        if (!paragonName) {
            return undefined;
        }

        const paragonId = PARAGON_MAP[paragonName];

        // Determine what information is being requested
        if (text.includes('matchup') || text.includes('versus') || text.includes('vs')) {
            const data = await CacheManager.withCache(`${paragonId}-matchups`, () =>
                fetchParagonMatchups(paragonId)
            );
            const sortedMatchups = data.sort((a, b) => b.totalGames30 - a.totalGames30);
            return `${paragonName}'s top matchups (last 30 days):\n${JSON.stringify(sortedMatchups.slice(0, 5), null, 2)}`;
        }

        if (text.includes('deck') || text.includes('build')) {
            const data = await CacheManager.withCache(`${paragonId}-decks`, () =>
                fetchParagonDecks(paragonId)
            );
            return `${paragonName}'s top performing deck (last 30 days):\n${JSON.stringify(data[0], null, 2)}`;
        }

        // Default to overview
        const data = await CacheManager.withCache(`${paragonId}-details`, () =>
            fetchParagonDetails(paragonId)
        );
        return `${paragonName}'s details:\n${JSON.stringify(data, null, 2)}`;
    }
};