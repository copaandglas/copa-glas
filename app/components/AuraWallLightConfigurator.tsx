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

export default function AuraWallLightConfigurator({
  onConfigurationChange,
  onEnquire,
  className = "",
}: AuraWallLightConfiguratorProps) {
  const [activeColorId, setActiveColorId] = useState(DEFAULT_AURA_COLOR_ID);
  const [illuminated, setIlluminated] = useState(false);

  const activeColor = auraColorById(activeColorId);

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
      style={{ ["--active-pane-color" as string]: activeColor.hex }}
    >
      <div className={styles.mobileShell}>
        <div className={styles.container} id="aura-configurator">
          <div className={styles.visualizerPane} aria-hidden="true">
            <SconceSvg
              className={styles.sconceSvg}
              paneImage={activeColor.image}
              paneColor={activeColor.hex}
            />
          </div>

          <div className={styles.controlsPane}>
            <p className={styles.collectionName}>Copa + Glas Studio</p>
            <h1 className={styles.title}>Aura Wall Light</h1>

            <p className={styles.intro}>
              Hand-formed copper around a single pane of Luminous art glass, made
              to change the quality of light in a room.
            </p>

            <p className={styles.sectionLabel}>The Narrative</p>
            <p className={styles.activeColorDesc}>{activeColor.desc}</p>

            <p className={styles.sectionLabel}>The heart of the piece</p>
            <h2 className={styles.activeColorName}>
              {activeColor.id === "custom" ? "Your colour, to be discussed" : activeColor.name}
            </h2>

            <div
              className={styles.swatchGrid}
              role="group"
              aria-label="Choose your glass finish"
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
                      }
                    }}
                  >
                    <div
                      className={styles.swatch}
                      style={
                        isCustom
                          ? { background: "#f5f3ef", border: "1.5px dashed rgba(0,0,0,0.2)" }
                          : option.image
                            ? undefined
                            : { background: `linear-gradient(135deg, ${option.hex} 0%, #000 150%)` }
                      }
                    >
                      {isCustom ? (
                        <span style={{
                          position: "absolute", inset: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "1.25rem", color: "rgba(0,0,0,0.35)", lineHeight: 1,
                        }}>+</span>
                      ) : option.image ? (
                        <Image
                          src={option.image}
                          alt={option.name}
                          fill
                          priority={option.id === DEFAULT_AURA_COLOR_ID}
                          sizes="(max-width: 850px) 80px, 120px"
                          className={styles.swatchImage}
                        />
                      ) : null}
                    </div>
                    <span className={styles.swatchLabel}>{option.shortName}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.toggleWrapper}>
              <span id="aura-light-label" className={styles.toggleLabel}>
                Light the piece
              </span>
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
                <span className={styles.specLabel}>Outer Panes</span>
                <span className={styles.specValue}>Silvered glass</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Centre glass</span>
                <span className={styles.specValue}>
                  {activeColor.id === "custom" ? "To be discussed" : activeColor.name}
                </span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Piece size</span>
                <span className={styles.specValue}>Bespoke to order</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Glass centre</span>
                <span className={styles.specValue}>Bespoke to order</span>
              </div>
            </div>

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
                Enquire About This Piece
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Lighten toward white by `amt` (0–1), keeping the hue — a luminous version. */
function lighten(hex: string, amt: number): [number, number, number] {
  const [r, g, b] = hexToRgb(hex);
  return [
    Math.round(r + (255 - r) * amt),
    Math.round(g + (255 - g) * amt),
    Math.round(b + (255 - b) * amt),
  ];
}

function SconceSvg({
  className,
  paneImage,
  paneColor,
}: {
  className?: string;
  paneImage?: string;
  paneColor: string;
}) {
  const encodedImage = paneImage ?? null;
  const [gr, gg, gb] = lighten(paneColor, 0.12);
  const glow = (a: number) => `rgba(${gr}, ${gg}, ${gb}, ${a})`;

  return (
    <svg
      className={className}
      viewBox="0 0 100 166"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter id="aura-ambient-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
        </filter>
        <filter id="aura-bloom-wide" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <linearGradient id="aura-litCore" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={glow(0)} />
          <stop offset="12%" stopColor={glow(0.85)} />
          <stop offset="50%" stopColor={glow(1)} />
          <stop offset="88%" stopColor={glow(0.85)} />
          <stop offset="100%" stopColor={glow(0)} />
        </linearGradient>
        <clipPath id="aura-pane-clip">
          <rect x="29.3" y="23.4" width="41.4" height="113.9" />
        </clipPath>
        <linearGradient id="aura-copperFrame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b87352" />
          <stop offset="50%" stopColor="#d49b78" />
          <stop offset="100%" stopColor="#8f4d2d" />
        </linearGradient>
        <linearGradient id="aura-silveredGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d8c7bd" />
          <stop offset="25%" stopColor="#f2e8e2" />
          <stop offset="80%" stopColor="#cfbbb0" />
          <stop offset="100%" stopColor="#ae9383" />
        </linearGradient>
        <linearGradient id="aura-paneGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="15%" stopColor="rgba(255,255,255,0)" />
          <stop offset="85%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </linearGradient>
        <linearGradient id="aura-tubeGloss" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
        <linearGradient id="aura-innerShadowX" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.45)" />
          <stop offset="7%" stopColor="rgba(0,0,0,0)" />
          <stop offset="93%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
        </linearGradient>
        <linearGradient id="aura-innerShadowY" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.8)" />
          <stop offset="5%" stopColor="rgba(0,0,0,0)" />
          <stop offset="95%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.8)" />
        </linearGradient>
      </defs>

      <rect
        x="25"
        y="19"
        width="50"
        height="123"
        className={styles.tubeGlow}
        filter="url(#aura-ambient-glow)"
      />
      <rect x="0" y="0" width="100" height="166" fill="url(#aura-copperFrame)" />
      {/* Mirror panes around the centre glass, as on the photographed Aura */}
      <rect x="2.5" y="2.5" width="68.2" height="19.7" fill="url(#aura-silveredGlass)" />
      <rect x="2.5" y="2.5" width="68.2" height="19.7" fill="url(#aura-paneGloss)" />
      <rect x="71.9" y="2.5" width="25.6" height="134.8" fill="url(#aura-silveredGlass)" />
      <rect x="71.9" y="2.5" width="25.6" height="134.8" fill="url(#aura-paneGloss)" />
      <rect x="2.5" y="23.4" width="25.6" height="140.1" fill="url(#aura-silveredGlass)" />
      <rect x="2.5" y="23.4" width="25.6" height="140.1" fill="url(#aura-paneGloss)" />
      <rect x="29.3" y="138.5" width="68.2" height="25" fill="url(#aura-silveredGlass)" />
      <rect x="29.3" y="138.5" width="68.2" height="25" fill="url(#aura-paneGloss)" />

      {/*
        Light spill — rendered above the frame so the lit tube appears to
        cast its colour onto the surrounding silvered glass and copper.
      */}
      <rect
        x="17"
        y="11"
        width="66"
        height="139"
        className={styles.litHaloWide}
        filter="url(#aura-bloom-wide)"
      />
      <rect
        x="25"
        y="19"
        width="50"
        height="123"
        className={styles.litHaloCore}
        filter="url(#aura-ambient-glow)"
      />

      {/* Centre glass pane — photo texture + colour tint overlay */}
      {encodedImage ? (
        <>
          <image
            href={encodedImage}
            x="29.3"
            y="23.4"
            width="41.4"
            height="113.9"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#aura-pane-clip)"
            className={styles.centralGlassImage}
          />
          <rect
            x="29.3"
            y="23.4"
            width="41.4"
            height="113.9"
            fill={paneColor}
            fillOpacity="0.28"
            clipPath="url(#aura-pane-clip)"
            className={styles.centralGlassTint}
          />
        </>
      ) : (
        <rect x="29.3" y="23.4" width="41.4" height="113.9" className={styles.centralGlass} />
      )}

      {/*
        Bright emitting core — a warm gradient (hot centre, soft ends) driven
        by opacity so it lights up reliably on WebKit (iPad / iOS Safari),
        which ignores CSS filter: brightness() on inner SVG elements.
      */}
      <rect
        x="29.3"
        y="23.4"
        width="41.4"
        height="113.9"
        fill="url(#aura-litCore)"
        clipPath="url(#aura-pane-clip)"
        className={styles.lightGlow}
      />

      <rect
        x="29.3"
        y="23.4"
        width="41.4"
        height="113.9"
        fill="url(#aura-tubeGloss)"
        className={styles.tubeShadow}
      />
      <rect
        x="29.3"
        y="23.4"
        width="41.4"
        height="113.9"
        fill="url(#aura-innerShadowX)"
        className={styles.sunkenShadow}
      />
      <rect
        x="29.3"
        y="23.4"
        width="41.4"
        height="113.9"
        fill="url(#aura-innerShadowY)"
        className={styles.sunkenShadow}
      />
    </svg>
  );
}
