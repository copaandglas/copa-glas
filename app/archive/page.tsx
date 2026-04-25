"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const categories = ["All", "Mirrors", "Lighting", "Process", "Studio"] as const;
type Category = (typeof categories)[number];

interface ArchiveImage {
  src: string;
  alt: string;
  category: Exclude<Category, "All">;
  aspect: "portrait" | "landscape" | "square";
  caption?: string;
  year?: string;
}

const archiveImages: ArchiveImage[] = [
  { src: "/rotation-mirror.png", alt: "Rotation Mirror, detail of copper frame and glass facets", category: "Mirrors", aspect: "portrait", caption: "Rotation Mirror, detail", year: "2024" },
  { src: "/heroimage.png", alt: "Studio workshop, hand-forming copper", category: "Process", aspect: "landscape", caption: "Hand-Forming", year: "2024" },
  { src: "/heroimage.png", alt: "Pendant light, suspended copper and glass", category: "Lighting", aspect: "portrait", caption: "Filament Pendant", year: "2023" },
  { src: "/heroimage.png", alt: "East London studio interior", category: "Studio", aspect: "landscape", caption: "East London Workshop", year: "2024" },
  { src: "/rotation-mirror.png", alt: "Rotation Mirror, full view installed", category: "Mirrors", aspect: "square", caption: "Rotation Mirror, installed", year: "2024" },
  { src: "/heroimage.png", alt: "Glass cutting process", category: "Process", aspect: "portrait", caption: "Cutting Silvered Glass", year: "2023" },
  { src: "/heroimage.png", alt: "Wall sconce, hand-finished copper", category: "Lighting", aspect: "landscape", caption: "Arc Sconce", year: "2023" },
  { src: "/heroimage.png", alt: "Convex mirror series", category: "Mirrors", aspect: "portrait", caption: "Convex Series", year: "2022" },
  { src: "/heroimage.png", alt: "Soldering copper joints", category: "Process", aspect: "square", caption: "Soldering", year: "2024" },
  { src: "/heroimage.png", alt: "Chandelier, multi-arm copper and glass", category: "Lighting", aspect: "portrait", caption: "Canopy Chandelier", year: "2022" },
  { src: "/heroimage.png", alt: "Materials, raw copper sheet", category: "Studio", aspect: "landscape", caption: "Raw Materials", year: "2023" },
  { src: "/heroimage.png", alt: "Octagonal mirror with bevelled glass", category: "Mirrors", aspect: "square", caption: "Octagon Mirror", year: "2022" },
];

const aspectClasses = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export default function ArchivePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? archiveImages
    : archiveImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };
  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header variant="dark" />

      {/* Page header */}
      <div className="
        pt-28 md:pt-36 lg:pt-44 3xl:pt-48
        pb-10 md:pb-14 lg:pb-16
        px-[max(1.25rem,env(safe-area-inset-left))]
        md:px-[max(2.25rem,env(safe-area-inset-left))]
        lg:px-[max(3.5rem,env(safe-area-inset-left))]
        3xl:px-[max(5rem,env(safe-area-inset-left))]
        max-w-[1400px] 3xl:max-w-[1680px] mx-auto
      ">
        <h1 className="
          font-[family-name:var(--font-playfair),Georgia,serif]
          text-3xl md:text-4xl lg:text-5xl 3xl:text-[3.5rem]
          font-normal leading-[1.1] mb-4 md:mb-6
        ">
          Archive
        </h1>
        <p className="
          font-[family-name:var(--font-playfair),Georgia,serif]
          text-sm md:text-base lg:text-lg
          text-black/60 max-w-xl leading-relaxed
        ">
          A visual record of the studio&apos;s work: mirrors, lighting, and the craft behind them.
        </p>

        {/* Category filter */}
        <nav className="flex flex-wrap gap-2 md:gap-3 mt-8 md:mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 md:px-5 md:py-2.5
                text-[10px] md:text-[11px] tracking-[0.15em] uppercase
                font-medium cursor-pointer transition-all duration-200
                border
                ${activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black/60 border-black/15 hover:border-black/40 hover:text-black"}
              `}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* Image grid */}
      <div className="
        px-[max(1.25rem,env(safe-area-inset-left))]
        md:px-[max(2.25rem,env(safe-area-inset-left))]
        lg:px-[max(3.5rem,env(safe-area-inset-left))]
        3xl:px-[max(5rem,env(safe-area-inset-left))]
        pb-16 md:pb-24 lg:pb-32
        max-w-[1400px] 3xl:max-w-[1680px] mx-auto
      ">
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, index) => (
              <motion.figure
                key={`${img.caption}-${img.category}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="
                  relative mb-3 md:mb-4 lg:mb-5 break-inside-avoid
                  group cursor-pointer overflow-hidden
                "
                onClick={() => openLightbox(index)}
              >
                <div className={`relative w-full ${aspectClasses[img.aspect]} bg-muted overflow-hidden`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="
                      object-cover
                      transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                      group-hover:scale-[1.03]
                    "
                  />
                  {/* Hover overlay */}
                  <div className="
                    absolute inset-0 bg-black/0 group-hover:bg-black/30
                    transition-colors duration-500
                    flex items-end p-4 md:p-5 lg:p-6
                  ">
                    <div className="
                      translate-y-4 opacity-0
                      group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ">
                      {img.caption && (
                        <p className="
                          text-white text-sm md:text-base
                          font-[family-name:var(--font-playfair),Georgia,serif]
                        ">
                          {img.caption}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-white/60 text-[10px] md:text-[11px] tracking-[0.12em] uppercase">
                          {img.category}
                        </span>
                        {img.year && (
                          <>
                            <span className="text-white/30 text-[10px]">/</span>
                            <span className="text-white/50 text-[10px] md:text-[11px] tracking-[0.08em]">
                              {img.year}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-black/40 text-sm py-20 tracking-wide">
            No images in this category yet.
          </p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="
              fixed inset-0 z-[10000] bg-dark/95 backdrop-blur-sm
              flex items-center justify-center
              p-[max(1rem,env(safe-area-inset-top))_max(1rem,env(safe-area-inset-right))_max(1rem,env(safe-area-inset-bottom))_max(1rem,env(safe-area-inset-left))]
            "
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              className="
                absolute top-4 right-4 md:top-8 md:right-8
                text-white/70 hover:text-white bg-transparent border-none cursor-pointer
                text-[10px] md:text-[11px] tracking-[0.15em] uppercase
                p-3 min-h-11 z-10 transition-colors
              "
            >
              Close
            </button>

            {/* Prev */}
            {filtered.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Previous image"
                className="
                  absolute left-3 md:left-8 top-1/2 -translate-y-1/2
                  w-12 h-12 flex items-center justify-center
                  bg-white/10 hover:bg-white/20
                  border border-white/20 rounded-xl
                  cursor-pointer text-white/90 z-10 transition-colors
                "
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
            )}

            {/* Next */}
            {filtered.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Next image"
                className="
                  absolute right-3 md:right-8 top-1/2 -translate-y-1/2
                  w-12 h-12 flex items-center justify-center
                  bg-white/10 hover:bg-white/20
                  border border-white/20 rounded-xl
                  cursor-pointer text-white/90 z-10 transition-colors
                "
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[90vw] max-h-[85vh] md:max-w-[80vw] md:max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`
                relative w-[85vw] md:w-[70vw] lg:w-[60vw]
                ${aspectClasses[filtered[lightboxIndex].aspect]}
                max-h-[80vh]
              `}>
                <Image
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].alt}
                  fill
                  sizes="80vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption bar */}
              <div className="
                mt-4 flex items-baseline justify-between gap-4
                text-white/60
              ">
                <p className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-sm md:text-base text-white/80
                ">
                  {filtered[lightboxIndex].caption}
                </p>
                <span className="text-[10px] md:text-[11px] tracking-[0.12em] uppercase shrink-0">
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
