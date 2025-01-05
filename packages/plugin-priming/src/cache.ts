import { elizaLogger } from "@elizaos/core";
import { CacheEntry } from "./types";

export class CacheManager {
    private static caches: Map<string, CacheEntry> = new Map();
    private static CACHE_DURATION = 60 * 60 * 1000; // 1 hour

    static async withCache(key: string, fetchFn: () => Promise<any>) {
        const currentTime = Date.now();
        const cached = this.caches.get(key);

        if (cached && (currentTime - cached.timestamp) < this.CACHE_DURATION) {
            elizaLogger.info(`[PrimingPlugin] Using cached ${key} from ${new Date(cached.timestamp)}`);
            return cached.data;
        }

        const data = await fetchFn();
        this.caches.set(key, { timestamp: currentTime, data });
        return data;
    }
}