import { Provider, IAgentRuntime, Memory, State, elizaLogger } from "@elizaos/core";
import { ParagonDetails, ParagonMatchup, ParagonDeck, CoreCard } from "../types";
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
    );

    if (!response.ok) {
        elizaLogger.error(`[PrimingPlugin] API Error: ${response.status} ${response.statusText}`);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    elizaLogger.info(`[PrimingPlugin] Raw matchup data: ${JSON.stringify(data)}`);

    if (!Array.isArray(data)) {
        elizaLogger.error(`[PrimingPlugin] Expected array of matchups, got: ${typeof data}`);
        return [];
    }

    const mappedData = data.map((matchup: any) => {
        const result = {
            vsParagonId: getParagonNameById(matchup.vsParagonId),
            totalGames30: parseInt(matchup.totalGames30) || 0,
            totalWinRate30: parseFloat(matchup.totalWinRate30) || 0
        };
        elizaLogger.info(`[PrimingPlugin] Mapped matchup: ${JSON.stringify(result)}`);
        return result;
    });

    return mappedData;
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

async function fetchParagonCoreCards(paragonId: string): Promise<CoreCard[]> {
    elizaLogger.info(`[PrimingPlugin] Fetching core cards for paragon ${paragonId}`);
    const response = await fetch(
        `https://api.priming.xyz/parallel/cards/game/paragon-core-cards?paragonId=${paragonId}`
    );

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data
        .filter((card: any) => card?.parallelGameData) // Filter out entries with missing data
        .map((card: any) => ({
            name: card.name,
            frequency: card.frequency,
            parallel: card.parallelGameData?.parallel || 'unknown',
            rarity: card.parallelGameData?.rarity || 'unknown',
            cardType: card.parallelGameData?.cardType || 'unknown',
            cost: card.parallelGameData?.cost,
            attack: card.parallelGameData?.attack,
            health: card.parallelGameData?.health
        }));
}

function getParagonNameById(id: string): string {
    return Object.entries(PARAGON_MAP).find(([_, value]) => value === id)?.[0] || id;
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
        elizaLogger.info(`[PrimingPlugin] Processing request for ${paragonName} (${paragonId})`);

        // Core cards query
        if (text.includes('core') || text.includes('cards') || text.includes('synergy') || text.includes('staples')) {
            elizaLogger.info(`[PrimingPlugin] Fetching core cards for ${paragonName}`);
            const data = await CacheManager.withCache(`${paragonId}-core-cards`, () =>
                fetchParagonCoreCards(paragonId)
            );
            const sortedCards = data.sort((a, b) => b.frequency - a.frequency);
            return `${paragonName}'s most played cards:\n${JSON.stringify(sortedCards.slice(0, 5), null, 2)}`;
        }

        // Determine what information is being requested
        if (text.includes('matchup') || text.includes('versus') || text.includes('vs') ||
            text.includes('beat') || text.includes('win')) {
            const data = await CacheManager.withCache(`${paragonId}-matchups`, () =>
                fetchParagonMatchups(paragonId)
            );

            // Filter for meaningful sample size (e.g., 50+ games) and sort by winrate
            const activeMatchups = data
                .filter(m => m.totalGames30 >= 10)  // Only include matchups with significant games
                .sort((a, b) => b.totalWinRate30 - a.totalWinRate30)  // Sort by winrate
                .slice(0, 10);  // Take top 10 matchups

            if (activeMatchups.length === 0) {
                return `${paragonName} has no significant matchups (10+ games) in the last 30 days.`;
            }

            return `${paragonName}'s matchup stats (last 30 days, minimum 10 games):\n` +
                activeMatchups.map(m =>
                    `vs ${m.vsParagonId}: ${m.totalWinRate30.toFixed(1)}% winrate (${m.totalGames30} games)`
                ).join('\n');
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