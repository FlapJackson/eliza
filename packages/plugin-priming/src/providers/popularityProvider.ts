import { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";
import { CacheManager } from "../cache";
import { fetchCardData } from "./baseProvider";

export const popularityProvider: Provider = {
    get: async (runtime: IAgentRuntime, _message: Memory, _state?: State) => {
        const data = await CacheManager.withCache('popularity', () =>
            fetchCardData('popularity', runtime)
        );
        return `Most Popular Cards:\n${JSON.stringify(data, null, 2)}`;
    }
};