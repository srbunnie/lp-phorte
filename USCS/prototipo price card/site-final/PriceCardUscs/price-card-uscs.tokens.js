import rawTokens from "../../workspace-support/references/Mode 1.tokens.json" with { type: "json" };
import figmaExport from "../../workspace-support/references/figma-export.json" with { type: "json" };
import { buildPriceCardThemeVars } from "./price-card-uscs.model.js";

export const uscsPriceCardThemeVars = buildPriceCardThemeVars(rawTokens, figmaExport);
