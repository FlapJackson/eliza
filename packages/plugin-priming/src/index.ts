import { Plugin } from "@elizaos/core";
import { getCardStatsAction } from "./actions/getCardStats";
import { getParagonStatsAction } from "./actions/getParagonStats";
import { cardProvider } from "./providers/cardProvider";
import { paragonProvider } from "./providers/paragonProvider";

export const PrimingPlugin: Plugin = {
    name: "Priming plugin",
    description: "Plugin for fetching and displaying various Parallel card and paragon statistics from Priming.xyz",
    actions: [getCardStatsAction, getParagonStatsAction],
    providers: [cardProvider, paragonProvider]
};

export default PrimingPlugin;

