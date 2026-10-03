export const SITE_URL = "https://copaandglas.com";
export const SITE_NAME = "Copa + Glas";

export const CONTACT = {
  email: "studio@copaandglas.com",
  telephone: "+442080643753",
  telephoneDisplay: "+44 (0)20 8064 3753",
  instagram: "https://www.instagram.com/copaandglas",
} as const;

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Copa + Glas Studio — handcrafted mirrors and lighting in copper and glass, East London",
} as const;

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
