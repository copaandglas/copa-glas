// Campaign links, such as a QR code, that enquiries should be traced back to.
// Each key is also the path of the campaign's page, e.g. /estila.
const REFERRALS: Record<string, { label: string; subject: string }> = {
  estila: { label: "House of Estila window", subject: "via Estila" },
};

const STORAGE_KEY = "copa-glas-referral";

/** Remembers the campaign for this tab, so later pages can still report it. */
export function rememberReferral(key: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, key);
  } catch {
    // Storage can be blocked; the enquiry then falls back to its page path.
  }
}

export function getReferral(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Only known campaigns are accepted, as the value comes from the browser. */
export function resolveReferral(key?: string | null, path?: string | null) {
  const candidate = key ?? path?.replace(/^\//, "");
  return candidate && Object.hasOwn(REFERRALS, candidate) ? REFERRALS[candidate] : null;
}
