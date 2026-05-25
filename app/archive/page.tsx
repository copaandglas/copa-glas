"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

/* ─── Types ─── */
interface ArchiveItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  year: string;
}

/* ─── Archive content ─── */
const row1Left: ArchiveItem = {
  id: "bigben",
  src: "/bigben.png",
  alt: "Big Ben Clock tower — architectural glazing commission",
  caption: "Big Ben Clock tower",
  category: "Historic Commissions",
  year: "2010",
};
const row1Right: ArchiveItem = {
  id: "naturalhistory",
  src: "/naturalhistory.png",
  alt: "Natural History Museum — architectural glazing commission",
  caption: "Natural History Museum",
  category: "Historic Commissions",
  year: "1994",
};
const row2Items: ArchiveItem[] = [
  {
    id: "workshop-tools",
    src: "/workshop-tools.webp",
    alt: "Workshop tools, Copa + Glas studio",
    caption: "Workshop tools",
    category: "Workshop",
    year: "2021",
  },
  {
    id: "saudi-dome",
    src: "/saudiarabia.jpg",
    alt: "Glass dome, Riyadh, 1983",
    caption: "Glass Dome, Riyadh",
    category: "Historic Commissions",
    year: "1983",
  },
  {
    id: "master-craftsman",
    src: "/ammastercraftsman.png",
    alt: "Anthony McCarty, Walthamstow Workshop, 2003",
    caption: "Anthony McCarty, Walthamstow Workshop",
    category: "Workshop",
    year: "2003",
  },
];
const row4Items: ArchiveItem[] = [
  {
    id: "workshop-film",
    src: "/workshopfilm.jpg",
    alt: "Workshop, Copa + Glas studio",
    caption: "Workshop",
    category: "Workshop",
    year: "2023",
  },
  {
    id: "royal-ag-hall",
    src: "/royalaghallstainglass.jpg",
    alt: "Royal Agricultural Hall, stained glass commission",
    caption: "Royal Agricultural Hall",
    category: "Historic Commissions",
    year: "1997",
  },
];

const row3Items: ArchiveItem[] = [
  {
    id: "cafe-royal",
    src: "/cafe-royal-lightwell-bw.jpg",
    alt: "Lightwell, Hotel Café Royal, 2012",
    caption: "Lightwell, Hotel Café Royal",
    category: "Historic Commissions",
    year: "2012",
  },
  {
    id: "founders",
    src: "/founders.png",
    alt: "The founders in the East London workshop",
    caption: "The Founders",
    category: "Workshop",
    year: "2024",
  },
];

/* All clickable image items — used for lightbox navigation and mobile grid */
const lightboxItems: ArchiveItem[] = [
  row1Left,
  row1Right,
  ...row2Items,
  ...row3Items,
  ...row4Items,
];


/* ─── Category label with copper slashes ─── */
function CategoryLabel({ category, lightMode = false }: { category: string; lightMode?: boolean }) {
  const parts = category.split(" / ");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className={lightMode ? "text-accent/40" : "text-accent/50"}> / </span>
          )}
        </span>
      ))}
    </>
  );
}

/* ─── Image card with scroll animation + hover overlay ─── */
function ImageCard({
  item,
  imageClassName,
  className = "",
  sizes = "(max-width: 768px) 50vw, 33vw",
  delay = 0,
  priority = false,
  onOpen,
}: {
  item: ArchiveItem;
  imageClassName: string;
  className?: string;
  sizes?: string;
  delay?: number;
  priority?: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const captionWithYear = `${item.caption}, ${item.year}`;

  return (
    <motion.div
      ref={ref}
      className={`group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      onClick={onOpen}
    >
      <div className={`relative overflow-hidden bg-[#d5cfc6] shimmer ${imageClassName}`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />

        {/* Gradient overlay + caption on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-5">
          <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <p className="text-white text-[12px] md:text-[13px] font-[family-name:var(--font-playfair),Georgia,serif] leading-snug italic">
              {captionWithYear}
            </p>
          </div>
        </div>

        {/* Expand icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-[-4px] group-hover:translate-y-0">
          <div className="w-[26px] h-[26px] rounded-full bg-white/12 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption below */}
      <div className="pt-[9px] pb-4">
        <p className="text-[8px] tracking-[0.18em] uppercase text-black/52 font-medium leading-[2.2]">
          <CategoryLabel category={item.category} />
        </p>
        <p className="text-[11px] tracking-[0.025em] text-black/75 font-[family-name:var(--font-playfair),Georgia,serif] mt-[2px]">
          {captionWithYear}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Lightbox ─── */
function Lightbox({
  items,
  index,
  direction,
  onClose,
  onPrev,
  onNext,
}: {
  items: ArchiveItem[];
  index: number;
  direction: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchRef = useRef<number | null>(null);
  const item = items[index];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current === null) return;
    const diff = touchRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? onNext() : onPrev();
    touchRef.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-md flex flex-col items-center justify-center px-5 pt-14 pb-8 sm:pb-10"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.2em] text-white/45 font-medium tabular-nums pointer-events-none">
        {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </span>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-5 text-[8px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors duration-200 font-medium py-2 px-1"
      >
        Close
      </button>

      {/* Image + caption — stacked with gap so caption never overlaps image */}
      <motion.div
        className="flex flex-col items-center w-full max-w-[92vw] sm:max-w-[85vw] md:max-w-[76vw] gap-6 sm:gap-8 min-h-0 flex-1 justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -32 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full flex-1 min-h-0 max-h-[min(70vh,calc(100vh-11rem))] sm:max-h-[min(76vh,calc(100vh-12rem))] md:max-h-[min(80vh,calc(100vh-13rem))]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`cap-${index}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.18 }}
            className="shrink-0 text-center w-full px-4 pointer-events-none"
          >
            <p className="text-white/80 text-[12px] md:text-[13px] font-[family-name:var(--font-playfair),Georgia,serif] italic">
              {item.caption}, {item.year}
            </p>
            <p className="text-white/45 text-[7px] tracking-[0.2em] uppercase mt-2">
              <CategoryLabel category={item.category} lightMode />
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white/95 transition-colors duration-200"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white/95 transition-colors duration-200"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ArchivePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxDir, setLightboxDir] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxDir(0);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevLightbox = useCallback(() => {
    setLightboxDir(-1);
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + lightboxItems.length) % lightboxItems.length : null
    );
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxDir(1);
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % lightboxItems.length : null
    );
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prevLightbox, nextLightbox]);

  /* Scroll lock */
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-[#ede9e2]">
      <Header variant="dark" />

      {/* ── Header ──────────────────────────────────── */}
      <section
        className="
          pt-32 sm:pt-36 md:pt-44 lg:pt-52
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          pb-14 sm:pb-18 md:pb-22 lg:pb-28
          max-w-[1440px] mx-auto
        "
      >
        <nav aria-label="Breadcrumb" className="flex items-center text-[9px] tracking-[0.22em] uppercase font-medium mb-9 sm:mb-11">
          <Link href="/" className="text-black/50 hover:text-black/85 transition-opacity duration-400 no-underline">
            Home
          </Link>
          <span className="text-accent/60 mx-2">/</span>
          <span className="text-black/50">Archive</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-20 lg:gap-36">
          <motion.h1
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[clamp(2.6rem,7.5vw,5.25rem)]
              font-normal leading-[1.04] text-black
            "
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Four decades
            <br />
            <em>of making.</em>
          </motion.h1>

          <motion.p
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[13px] sm:text-sm leading-[1.85] text-black/65
              max-w-[310px] md:text-right md:pb-0.5
            "
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            A visual record of the studio. Workshop processes,
            historical commissions, and the craft language that has
            shaped our practice since the beginning.
          </motion.p>
        </div>
      </section>

      {/* ── Editorial grid ──────────────────────────── */}
      <section
        className="
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          max-w-[1440px] mx-auto
        "
      >
        {/* Desktop (≥ md) */}
        <div className="hidden md:flex flex-col gap-1">

          {/* Row 1 — [2/3] [1/3] */}
          <div className="flex gap-1">
            <ImageCard
              item={row1Left}
              className="flex-[2]"
              imageClassName="h-[38vw] max-h-[545px]"
              sizes="(max-width: 1440px) 66vw, 960px"
              delay={0}
              priority
              onOpen={() => openLightbox(0)}
            />
            <ImageCard
              item={row1Right}
              className="flex-[1]"
              imageClassName="h-[38vw] max-h-[545px]"
              sizes="(max-width: 1440px) 33vw, 480px"
              delay={0.07}
              priority
              onOpen={() => openLightbox(1)}
            />
          </div>

          {/* Row 2 — three equal thirds */}
          <div className="flex gap-1">
            {row2Items.map((item, i) => (
              <ImageCard
                key={item.id}
                item={item}
                className="flex-1"
                imageClassName="h-[30vw] max-h-[430px]"
                sizes="(max-width: 1440px) 33vw, 480px"
                delay={i * 0.07}
                onOpen={() => openLightbox(2 + i)}
              />
            ))}
          </div>

          {/* Row 3 — two equal squares */}
          <div className="flex gap-1">
            {row3Items.map((item, i) => (
              <ImageCard
                key={item.id}
                item={item}
                className="flex-1"
                imageClassName="h-[34vw] max-h-[490px]"
                sizes="(max-width: 1440px) 50vw, 720px"
                delay={i * 0.07}
                onOpen={() => openLightbox(5 + i)}
              />
            ))}
          </div>

          {/* Row 4 — [1/3 portrait] [2/3 landscape] */}
          <div className="flex gap-1">
            <ImageCard
              item={row4Items[0]}
              className="flex-[1]"
              imageClassName="h-[34vw] max-h-[490px]"
              sizes="(max-width: 1440px) 33vw, 480px"
              delay={0.04}
              onOpen={() => openLightbox(7)}
            />
            <ImageCard
              item={row4Items[1]}
              className="flex-[2]"
              imageClassName="h-[34vw] max-h-[490px]"
              sizes="(max-width: 1440px) 66vw, 960px"
              delay={0.1}
              onOpen={() => openLightbox(8)}
            />
          </div>

        </div>

        {/* Mobile (< md): 2-column masonry */}
        <div className="md:hidden columns-2 gap-1">
          {lightboxItems.map((item, i) => {
            const lbIndex = lightboxItems.findIndex((l) => l.id === item.id);
            return (
              <ImageCard
                key={item.id}
                item={item}
                imageClassName={i % 5 === 0 || i % 5 === 3 ? "aspect-[4/3]" : "aspect-[3/4]"}
                className="break-inside-avoid mb-1"
                delay={i * 0.04}
                onOpen={() => lbIndex >= 0 ? openLightbox(lbIndex) : undefined}
              />
            );
          })}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────── */}
      <div
        className="
          mx-5 sm:mx-8 md:mx-10 lg:mx-16 xl:mx-20
          mt-20 sm:mt-24 md:mt-32 lg:mt-40
          border-t border-accent/20
        "
      />

      {/* ── Pull quote + CTA ─────────────────────────── */}
      <motion.section
        className="
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          pt-12 sm:pt-14 md:pt-16
          pb-24 sm:pb-32 md:pb-40
          max-w-[1440px] mx-auto
          flex flex-col md:flex-row md:items-end md:justify-between gap-12 md:gap-24
        "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[460px]">
          <blockquote
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[clamp(0.95rem,2vw,1.25rem)]
              leading-[1.7] text-black/80 italic
            "
          >
            "The tradition is unchanged. The materials are the same.
            The intention to create something of lasting beauty and
            significance has never wavered."
          </blockquote>
          <p className="text-[8px] tracking-[0.18em] uppercase text-black/52 mt-5 font-medium">
            Copa + Glas
          </p>
        </div>

        <div className="md:text-right shrink-0">
          <p className="text-[8px] tracking-[0.2em] uppercase text-accent/50 font-medium mb-3.5">
            Related items
          </p>
          <Link
            href="/collection"
            className="
              text-[13px] font-[family-name:var(--font-playfair),Georgia,serif]
              text-black/78 hover:text-black
              underline underline-offset-4 decoration-black/12 hover:decoration-black/45
              transition-all duration-200
            "
          >
            View Collection →
          </Link>
        </div>
      </motion.section>

      <Footer />

      {/* ── Lightbox ─────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={lightboxItems}
            index={lightboxIndex}
            direction={lightboxDir}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
