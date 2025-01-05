import { Plugin } from "@elizaos/core";
import * as providers from "./providers";
import * as actions from "./actions";

export const PrimingPlugin: Plugin = {
    name: "Priming plugin",
    description: "Plugin for fetching and displaying various Parallel card statistics from Priming.xyz",
    actions: [
        actions.getPopularCardsAction,
        actions.getWinRateCardsAction,
        actions.getVolumeCardsAction
    ],
    providers: [
        providers.popularityProvider,
        providers.winRateProvider,
        providers.volumeProvider
    ]
};

export default PrimingPlugin;

