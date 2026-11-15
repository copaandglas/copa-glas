"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AURA_COLOR_OPTIONS,
  DEFAULT_AURA_COLOR_ID,
  auraColorById,
  type AuraColorOption,
  type AuraConfiguration,
} from "@/app/lib/aura-wall-light-colors";
import styles from "./AuraWallLightConfigurator.module.css";

export type { AuraConfiguration };

interface AuraWallLightConfiguratorProps {
  onConfigurationChange?: (config: AuraConfiguration) => void;
  onEnquire?: (config: AuraConfiguration) => void;
  className?: string;
}

/** The glasses that can be shown in the drawing; a custom glass has no picture. */
const GLASSES = AURA_COLOR_OPTIONS.filter((option) => option.pane);

export default function AuraWallLightConfigurator({
  onConfigurationChange,
  onEnquire,
  className = "",
}: AuraWallLightConfiguratorProps) {
  const [activeColorId, setActiveColorId] = useState(DEFAULT_AURA_COLOR_ID);
  // The drawing keeps the last real glass on show while a custom one is discussed.
  const [shownGlassId, setShownGlassId] = useState(DEFAULT_AURA_COLOR_ID);
  const [illuminated, setIlluminated] = useState(true);

  const activeColor = auraColorById(activeColorId);
  const shownGlass = auraColorById(shownGlassId);

  const emitChange = useCallback(
    (color: AuraColorOption, isOn: boolean) => {
      onConfigurationChange?.({
        colorId: color.id,
        colorName: color.name,
        illuminated: isOn,
      });
    },
    [onConfigurationChange],
  );

  useEffect(() => {
    emitChange(activeColor, illuminated);
  }, [activeColor, illuminated, emitChange]);

  const rootClass = [styles.root, illuminated ? styles.isOn : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
      style={{ ["--glow" as string]: shownGlass.glow ?? shownGlass.hex }}
    >
      <div className={styles.mobileShell}>
        <div className={styles.container} id="aura-configurator">
          <div className={styles.visualizerPane} aria-hidden="true">
            <div className={styles.stage}>
              <div className={styles.fixture}>
                <SconceSvg className={styles.sconceSvg} shownGlassId={shownGlass.id} />
              </div>
            </div>
          </div>

          <div className={styles.controlsPane}>
            <p className={styles.collectionName}>Copa + Glas Studio</p>
            <h1 className={styles.title}>Aura Wall Light</h1>

            <p className={styles.intro}>
              Hand-formed copper around a single pane of luminous art glass, made
              to change the quality of light in a room.
            </p>

            <p className={styles.sectionLabel}>The glass</p>
            <h2 className={styles.activeColorName}>
              {activeColor.id === "custom" ? "Your colour, to be discussed" : activeColor.name}
            </h2>
            <p className={styles.activeColorDesc}>{activeColor.desc}</p>

            <div
              className={styles.swatchGrid}
              role="group"
              aria-label="Choose your glass"
            >
              {AURA_COLOR_OPTIONS.map((option) => {
                const isActive = option.id === activeColorId;
                const isCustom = option.id === "custom";
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.swatchWrapper} ${isActive ? styles.swatchWrapperActive : ""}`}
                    aria-pressed={isActive}
                    aria-label={isCustom ? "Request a custom glass colour" : `Choose ${option.name}`}
                    onClick={() => {
                      setActiveColorId(option.id);
                      if (isCustom) {
                        onEnquire?.({
                          colorId: option.id,
                          colorName: option.name,
                          illuminated,
                        });
                      } else {
                        setShownGlassId(option.id);
                      }
                    }}
                  >
                    <span className={`${styles.swatch} ${isCustom ? styles.swatchCustom : ""}`}>
                      {isCustom ? (
                        <span className={styles.swatchPlus}>+</span>
                      ) : option.image ? (
                        <Image
                          src={option.image}
                          alt=""
                          fill
                          priority={option.id === DEFAULT_AURA_COLOR_ID}
                          sizes="(max-width: 767px) 20vw, 96px"
                          className={styles.swatchImage}
                        />
                      ) : null}
                    </span>
                    <span className={styles.swatchLabel}>{option.shortName}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.toggleWrapper}>
              <label htmlFor="aura-light-toggle" id="aura-light-label" className={styles.toggleLabel}>
                Light the glass
              </label>
              <div className={styles.switch}>
                <input
                  type="checkbox"
                  id="aura-light-toggle"
                  role="switch"
                  aria-checked={illuminated}
                  aria-labelledby="aura-light-label"
                  checked={illuminated}
                  onChange={(e) => setIlluminated(e.target.checked)}
                />
                <label className={styles.slider} htmlFor="aura-light-toggle" aria-hidden="true" />
              </div>
            </div>

            <div className={styles.specsTable}>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Frame</span>
                <span className={styles.specValue}>Solid brushed copper</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Outer panes</span>
                <span className={styles.specValue}>Silvered glass</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Centre glass</span>
                <span className={styles.specValue}>
                  {activeColor.id === "custom" ? "To be discussed" : activeColor.name}
                </span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Size</span>
                <span className={styles.specValue}>Agreed with the studio</span>
              </div>
            </div>

            <p className={styles.colourNote}>
              Colour on a screen is a guide. Art glass varies from sheet to sheet,
              and material samples are prepared for approval before anything is made.
            </p>

            {onEnquire && (
              <button
                type="button"
                onClick={() =>
                  onEnquire({
                    colorId: activeColor.id,
                    colorName: activeColor.name,
                    illuminated,
                  })
                }
                className={styles.enquireBtn}
              >
                Enquire about this light
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The centre pane in the drawing. */
const PANE = { x: 29.3, y: 23.4, width: 41.4, height: 113.9 };

/** The four mirror panes around it, as on the photographed Aura. */
const MIRRORS = [
  { x: 2.5, y: 2.5, width: 68.2, height: 19.7 },
  { x: 71.9, y: 2.5, width: 25.6, height: 134.8 },
  { x: 2.5, y: 23.4, width: 25.6, height: 140.1 },
  { x: 29.3, y: 138.5, width: 68.2, height: 25 },
];

function SconceSvg({ className, shownGlassId }: { className?: string; shownGlassId: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 166"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter id="aura-spill-blur" x="-60%" y="-30%" width="220%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <clipPath id="aura-pane-clip">
          <rect {...PANE} />
        </clipPath>
        <clipPath id="aura-mirror-clip">
          {MIRRORS.map((m) => (
            <rect key={`${m.x}-${m.y}`} {...m} />
          ))}
        </clipPath>
        <linearGradient id="aura-copperFrame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b67452" />
          <stop offset="48%" stopColor="#d39c7c" />
          <stop offset="100%" stopColor="#8d4e30" />
        </linearGradient>
        {/*
          Copper-rose mirror, measured from the photographs of the Aura. One
          reflection runs across all four panes, so they read as flat mirror.
        */}
        <linearGradient id="aura-mirror" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="166">
          <stop offset="0%" stopColor="#b28979" />
          <stop offset="30%" stopColor="#c8a596" />
          <stop offset="52%" stopColor="#ad8272" />
          <stop offset="100%" stopColor="#8e6252" />
        </linearGradient>
        <linearGradient id="aura-mirrorSheen" gradientUnits="userSpaceOnUse" x1="0" y1="166" x2="100" y2="0">
          <stop offset="0%" stopColor="rgba(40,16,8,0.1)" />
          <stop offset="55%" stopColor="rgba(255,244,236,0)" />
          <stop offset="100%" stopColor="rgba(255,244,236,0.14)" />
        </linearGradient>
        <linearGradient id="aura-paneEdgeX" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(20,6,0,0.5)" />
          <stop offset="6%" stopColor="rgba(20,6,0,0)" />
          <stop offset="94%" stopColor="rgba(20,6,0,0)" />
          <stop offset="100%" stopColor="rgba(20,6,0,0.5)" />
        </linearGradient>
        <linearGradient id="aura-paneEdgeY" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(20,6,0,0.6)" />
          <stop offset="3.5%" stopColor="rgba(20,6,0,0)" />
          <stop offset="97%" stopColor="rgba(20,6,0,0)" />
          <stop offset="100%" stopColor="rgba(20,6,0,0.45)" />
        </linearGradient>
        <linearGradient id="aura-paneSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="100" height="166" fill="url(#aura-copperFrame)" />

      {MIRRORS.map((m) => (
        <g key={`${m.x}-${m.y}`}>
          <rect {...m} fill="url(#aura-mirror)" />
          <rect {...m} fill="url(#aura-mirrorSheen)" />
        </g>
      ))}

      {/* The lit glass colours the mirror beside it. Kept inside the mirror panes. */}
      <g clipPath="url(#aura-mirror-clip)">
        <rect
          x={PANE.x - 5}
          y={PANE.y - 5}
          width={PANE.width + 10}
          height={PANE.height + 10}
          className={styles.mirrorSpill}
          filter="url(#aura-spill-blur)"
        />
      </g>

      {/*
        Every glass is drawn unlit and lit, and shown by opacity alone. Opacity
        behaves the same in every browser; CSS filters on SVG do not in Safari.
      */}
      <g clipPath="url(#aura-pane-clip)">
        {GLASSES.map((glass) => {
          const shown = glass.id === shownGlassId;
          return (
            <g key={glass.id}>
              <image
                href={glass.pane!.off}
                {...PANE}
                preserveAspectRatio="xMidYMid slice"
                className={`${styles.paneImage} ${shown ? styles.paneShown : ""}`}
              />
              <image
                href={glass.pane!.on}
                {...PANE}
                preserveAspectRatio="xMidYMid slice"
                className={`${styles.paneImage} ${styles.paneLit} ${shown ? styles.paneShown : ""}`}
              />
            </g>
          );
        })}
      </g>

      {/* The glass sits a little behind the copper, and takes a faint sheen unlit. */}
      <rect {...PANE} fill="url(#aura-paneSheen)" className={styles.paneSheen} />
      <rect {...PANE} fill="url(#aura-paneEdgeX)" className={styles.paneEdge} />
      <rect {...PANE} fill="url(#aura-paneEdgeY)" className={styles.paneEdge} />
    </svg>
  );
}
