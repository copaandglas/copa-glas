export interface AuraColorOption {
  id: string;
  name: string;
  shortName: string;
  hex: string;
  desc: string;
}

export const AURA_COLOR_OPTIONS: AuraColorOption[] = [
  {
    id: "amber",
    name: "Amber Iridescent",
    shortName: "Amber",
    hex: "#c45b12",
    desc: "A single pane of iridescent orange art glass, which shifts in colour as the room moves around it. Beautifully harmonious with the brushed copper frame.",
  },
  {
    id: "emerald",
    name: "Emerald Iridescent",
    shortName: "Emerald",
    hex: "#0f7034",
    desc: "Lush botanical green with dark, dramatic shadows and vibrant edge refractions, responding delicately to the light in the room.",
  },
  {
    id: "champagne",
    name: "Champagne Iridescent",
    shortName: "Champagne",
    hex: "#a88032",
    desc: "Bright, celebratory metallic gold that unifies the sconce into a single, cohesive architectural element.",
  },
  {
    id: "peacock",
    name: "Peacock Iridescent",
    shortName: "Peacock",
    hex: "#14767a",
    desc: "Vibrant teal and blue-green hues characterized by rich saturation and complex depth.",
  },
];

export const DEFAULT_AURA_COLOR_ID = "amber";

export function auraColorById(id: string): AuraColorOption {
  return (
    AURA_COLOR_OPTIONS.find((c) => c.id === id) ??
    AURA_COLOR_OPTIONS[0]
  );
}

export function auraConfigurationSummary(colorName: string): string {
  return `I am drawn to the Aura Wall Light — with ${colorName} at its heart.\n\nI would love to speak with the studio about bringing this piece into my home: the room it will live in, and the making of it.`;
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
    illuminated: false,
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
    image: config.illuminated ? "/aura-wall-light.png" : "/aura-wall-light-off.png",
    price: "Price on application",
  };
}
