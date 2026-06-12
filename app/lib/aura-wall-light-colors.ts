export interface AuraColorOption {
  id: string;
  name: string;
  shortName: string;
  hex: string;
  desc: string;
  image?: string;
}

export const AURA_COLOR_OPTIONS: AuraColorOption[] = [
  {
    id: "amber",
    name: "Corella Orange Glass",
    shortName: "Corella Orange",
    hex: "#d45210",
    image: "/corella-orange.jpg",
    desc: "Vibrant coloured art glass — beautifully harmonious with the brushed copper frame.",
  },
  {
    id: "emerald",
    name: "English Muffle Sussex Green Glass",
    shortName: "Sussex Green",
    hex: "#3d7a38",
    image: "/english-muffle-sussex-green.png",
    desc: "Lush botanical green with dark, dramatic shadows and vibrant edge refractions, responding delicately to the light in the room.",
  },
  {
    id: "champagne",
    name: "Corella Yellow Glass",
    shortName: "Corella Yellow",
    hex: "#cdb800",
    image: "/corella-yellow.jpg",
    desc: "Bright, celebratory acid yellow that catches every shift in daylight — alive in the room from morning to dusk.",
  },
  {
    id: "red",
    name: "Antique Opalescent Red Wispy Glass",
    shortName: "Antique Red",
    hex: "#cc1a1a",
    image: "/antique-wispy-red.jpg",
    desc: "A deep, warm red with a wispy, hand-made quality — each pane unique in tone and texture, drawing the eye before the light is even lit.",
  },
  {
    id: "custom",
    name: "Custom Glass",
    shortName: "Custom",
    hex: "#888888",
    desc: "Have a particular colour, texture, or finish in mind? Describe it when you enquire — we can source and work with a much wider range of art glass than shown here.",
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
    finishImage: color.image,
    image: config.illuminated ? "/aura-wall-light.png" : "/aura-wall-light-off.png",
    price: "Price on application",
  };
}
