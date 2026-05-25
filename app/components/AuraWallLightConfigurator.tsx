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
              Hand-formed copper and a single pane of iridescent art glass — made
              once, to change the quality of light in a room.
            </p>

            <p className={styles.sectionLabel}>The Narrative</p>
            <p className={styles.activeColorDesc}>{activeColor.desc}</p>

            <p className={styles.sectionLabel}>The heart of the piece</p>
            <h2 className={styles.activeColorName}>{activeColor.name}</h2>

            <div
              className={styles.swatchGrid}
              role="group"
              aria-label="Choose your glass finish"
            >
              {AURA_COLOR_OPTIONS.map((option) => {
                const isActive = option.id === activeColorId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.swatchWrapper} ${isActive ? styles.swatchWrapperActive : ""}`}
                    aria-pressed={isActive}
                    aria-label={`Choose ${option.name}`}
                    onClick={() => setActiveColorId(option.id)}
                  >
                    <div
                      className={styles.swatch}
                      style={
                        option.image
                          ? undefined
                          : { background: `linear-gradient(135deg, ${option.hex} 0%, #000 150%)` }
                      }
                    >
                      {option.image && (
                        <Image
                          src={option.image}
                          alt={option.name}
                          fill
                          sizes="80px"
                          className={styles.swatchImage}
                        />
                      )}
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
                <span className={styles.specValue}>{activeColor.name}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Piece size</span>
                <span className={styles.specValue}>300 × 415 mm</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Glass centre</span>
                <span className={styles.specValue}>30 × 270 mm</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Sizing</span>
                <span className={styles.specValue}>Custom on request</span>
              </div>
            </div>

            <p className={styles.colourNote}>
              If you have a particular colour in mind, let us know when you
              enquire — we can explore options beyond those shown here.
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
                Enquire About This Piece
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
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

  return (
    <svg
      className={className}
      viewBox="0 0 100 150"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter id="aura-ambient-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
        </filter>
        <clipPath id="aura-pane-clip">
          <rect x="48" y="32" width="6" height="86" />
        </clipPath>
        <linearGradient id="aura-copperFrame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b87352" />
          <stop offset="50%" stopColor="#d49b78" />
          <stop offset="100%" stopColor="#8f4d2d" />
        </linearGradient>
        <linearGradient id="aura-silveredGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d5d5d5" />
          <stop offset="25%" stopColor="#f5f5f5" />
          <stop offset="80%" stopColor="#cccccc" />
          <stop offset="100%" stopColor="#a8a8a8" />
        </linearGradient>
        <linearGradient id="aura-paneGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="15%" stopColor="rgba(255,255,255,0)" />
          <stop offset="85%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </linearGradient>
        <linearGradient id="aura-tubeGloss" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.2)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="65%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
        </linearGradient>
        <linearGradient id="aura-innerShadowX" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
          <stop offset="20%" stopColor="rgba(0,0,0,0)" />
          <stop offset="80%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
        </linearGradient>
        <linearGradient id="aura-innerShadowY" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.8)" />
          <stop offset="5%" stopColor="rgba(0,0,0,0)" />
          <stop offset="95%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.8)" />
        </linearGradient>
      </defs>

      <rect
        x="42"
        y="26"
        width="18"
        height="98"
        className={styles.tubeGlow}
        filter="url(#aura-ambient-glow)"
      />
      <rect x="0" y="0" width="100" height="150" fill="url(#aura-copperFrame)" />
      <rect x="2" y="2" width="44" height="116" fill="url(#aura-silveredGlass)" />
      <rect x="2" y="2" width="44" height="116" fill="url(#aura-paneGloss)" />
      <rect x="2" y="120" width="52" height="28" fill="url(#aura-silveredGlass)" />
      <rect x="2" y="120" width="52" height="28" fill="url(#aura-paneGloss)" />
      <rect x="48" y="2" width="50" height="28" fill="url(#aura-silveredGlass)" />
      <rect x="48" y="2" width="50" height="28" fill="url(#aura-paneGloss)" />
      <rect x="56" y="32" width="42" height="116" fill="url(#aura-silveredGlass)" />
      <rect x="56" y="32" width="42" height="116" fill="url(#aura-paneGloss)" />

      {/* Centre glass pane — photo texture + colour tint overlay */}
      {encodedImage ? (
        <>
          <image
            href={encodedImage}
            x="48"
            y="32"
            width="6"
            height="86"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#aura-pane-clip)"
            className={styles.centralGlassImage}
          />
          <rect
            x="48"
            y="32"
            width="6"
            height="86"
            fill={paneColor}
            fillOpacity="0.28"
            clipPath="url(#aura-pane-clip)"
            className={styles.centralGlassTint}
          />
        </>
      ) : (
        <rect x="48" y="32" width="6" height="86" className={styles.centralGlass} />
      )}

      <rect
        x="48"
        y="32"
        width="6"
        height="86"
        fill="url(#aura-tubeGloss)"
        className={styles.tubeShadow}
      />
      <rect
        x="48"
        y="32"
        width="6"
        height="86"
        fill="url(#aura-innerShadowX)"
        className={styles.sunkenShadow}
      />
      <rect
        x="48"
        y="32"
        width="6"
        height="86"
        fill="url(#aura-innerShadowY)"
        className={styles.sunkenShadow}
      />
    </svg>
  );
}
