import { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";
import { CacheManager } from "../cache";
import { fetchCardData } from "./baseProvider";

export const volumeProvider: Provider = {
    get: async (runtime: IAgentRuntime, _message: Memory, _state?: State) => {
        const data = await CacheManager.withCache('volume', () =>
            fetchCardData('volume', runtime)
        );
        return `Highest Volume Cards:\n${JSON.stringify(data, null, 2)}`;
    }
};