import type { CSSProperties } from "react";

/**
 * Timing for the `rise` and `rise-line` entrance classes in globals.css.
 *
 * The entrance is CSS, not script, so it begins when the page first paints
 * and does not wait for JavaScript to load.
 *
 * @param y        distance travelled, in pixels
 * @param duration seconds
 * @param delay    seconds
 */
export function riseStyle(y: number, duration: number, delay = 0): CSSProperties {
  return {
    "--rise-y": `${y}px`,
    "--rise-d": `${duration}s`,
    "--rise-delay": `${delay}s`,
  } as CSSProperties;
}
