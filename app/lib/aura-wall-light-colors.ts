import generated from "./aura-glass.generated.json";

/**
 * The glass colours are rendered by scripts/aura-glass/build.mjs, which also
 * writes aura-glass.generated.json. Change a colour there, not here.
 */
export interface AuraColorOption {
  id: string;
  name: string;
  shortName: string;
  /** The lit glass, used wherever a single flat colour is needed. */
  hex: string;
  desc: string;
  /** Square sample of the lit glass. */
  image?: string;
  /** The centre pane, unlit and lit. */
  pane?: { off: string; on: string };
  /** The light the glass throws on the wall and the mirror beside it. */
  glow?: string;
}

type GlassId = keyof typeof generated;

function glass(id: GlassId) {
  return {
    hex: generated[id].lit,
    glow: generated[id].glow,
    image: `/aura-glass/${id}-swatch.webp`,
    pane: { off: `/aura-glass/${id}-off.webp`, on: `/aura-glass/${id}-on.webp` },
  };
}

export const AURA_COLOR_OPTIONS: AuraColorOption[] = [
  {
    id: "amber",
    name: "Corella Orange Glass",
    shortName: "Corella Orange",
    ...glass("amber"),
    desc: "Unlit, a dark amber. Lit, a deep orange that turns to gold towards its edges, close in tone to the copper around it.",
  },
  {
    id: "emerald",
    name: "English Muffle Sussex Green Glass",
    shortName: "Sussex Green",
    ...glass("emerald"),
    desc: "Unlit, a dark olive. Lit, a fresh leaf green, softened by the gentle ripple of the glass.",
  },
  {
    id: "champagne",
    name: "Corella Yellow Glass",
    shortName: "Corella Yellow",
    ...glass("champagne"),
    desc: "Unlit, a deep old gold. Lit, a clear golden yellow, the brightest of the four.",
  },
  {
    id: "red",
    name: "Antique Opalescent Red Wispy Glass",
    shortName: "Antique Red",
    ...glass("red"),
    desc: "Unlit, a red so deep it is almost black. Lit, a rich red, with fine streaks running the length of the glass.",
  },
  {
    id: "custom",
    name: "Custom Glass",
    shortName: "Custom",
    hex: "#888888",
    desc: "Have a particular colour, texture or finish in mind? Tell us when you enquire. We work with a far wider range of art glass than the four shown here.",
  },
];

export const DEFAULT_AURA_COLOR_ID = "amber";

export function auraColorById(id: string): AuraColorOption {
  return (
    AURA_COLOR_OPTIONS.find((c) => c.id === id) ??
    AURA_COLOR_OPTIONS[0]
  );
}

export function auraConfigurationSummary(config: AuraConfiguration): string {
  const lit = config.illuminated ? " (lit)" : "";
  if (config.colorId === "custom") {
    return `Aura Wall Light — Custom glass (to be discussed)${lit}`;
  }
  return `Aura Wall Light — ${config.colorName}${lit}`;
}

export interface AuraConfiguration {
  colorId: string;
  colorName: string;
  illuminated: boolean;
}

export function defaultAuraConfiguration(): AuraConfiguration {
  const color = auraColorById(DEFAULT_AURA_COLOR_ID);
  return {
    colorId: color.id,
    colorName: color.name,
    illuminated: true,
  };
}

/** Enquiry drawer product payload for the current Aura configuration. */
export function auraEnquiryProduct(config: AuraConfiguration) {
  const color = auraColorById(config.colorId);
  return {
    name: "Aura Wall Light",
    slug: "aura-wall-light",
    finish: color.name,
    finishSwatch: color.hex,
    finishImage: color.image,
    image: config.illuminated ? "/aura-wall-light-interior.webp" : "/aura-wall-light-interior-off.webp",
    price: "Price on application",
  };
}
