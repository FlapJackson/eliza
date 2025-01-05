import { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";
import { CacheManager } from "../cache";
import { fetchCardData } from "./baseProvider";

export const winRateProvider: Provider = {
    get: async (runtime: IAgentRuntime, _message: Memory, _state?: State) => {
        const data = await CacheManager.withCache('winRate', () =>
            fetchCardData('winRate', runtime)
        );
        return `Highest Win Rate Cards:\n${JSON.stringify(data, null, 2)}`;
    }
};