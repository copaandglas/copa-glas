"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Mirror {
  slug: string;
  name: string;
  designer: string;
  dimension: string;
  price: string;
  image: string;
  hoverImage?: string;
  tagline: string;
  leadTime: string;
  edition?: string;
}

const mirrors: Mirror[] = [
  {
    slug: "rotation-mirror",
    name: "Rotation Mirror",
    designer: "Copa + Glas Studio",
    dimension: "97cm Ø",
    price: "£6,000",
    image: "/rotation-mirror.png",
    hoverImage: "/rotation-mirror-close.png",
    tagline: "Twenty-six hand-cut facets set in solid copper.",
    leadTime: "Built to order",
  },
  {
    slug: "mondrian-mirror",
    name: "The Mondrian Mirror",
    designer: "Copa + Glas Studio",
    dimension: "69.5 × 100.5cm",
    price: "£8,500",
    image: "/mondrian-mirror.png",
    hoverImage: "/mondrian-mirror-close.png",
    tagline:
      "A composition of rectilinear panes, held in a grid of hand-formed copper.",
    leadTime: "Built to order",
  },
  {
    slug: "fibonacci-mirror",
    name: "Fibonacci Mirror",
    designer: "Copa + Glas Studio",
    dimension: "65 × 90cm",
    price: "£5,500",
    image: "/fibonacci-mirror-mantel.png",
    hoverImage: "/fibonacci-mirror-close.png",
    tagline:
      "A spiralling study in proportion, drawn from nature's own geometry.",
    leadTime: "Built to order",
  },
];

export default function MirrorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="dark" />

      {/* ---- Page header ---- */}
      <div
        className="
          pt-28 md:pt-36 lg:pt-44 3xl:pt-48
          pb-10 md:pb-14 lg:pb-16
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
          max-w-[1400px] 3xl:max-w-[1680px] mx-auto
        "
      >
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: luxuryEase }}
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.12em] uppercase mb-6 md:mb-8"
        >
          <Link
            href="/"
            className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity"
          >
            Home
          </Link>
          <span className="opacity-25 mx-2">/</span>
          <Link
            href="/collection"
            className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity"
          >
            Collection
          </Link>
          <span className="opacity-25 mx-2">/</span>
          <span className="opacity-90">Mirrors</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: luxuryEase }}
          className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase opacity-55 mb-3 md:mb-4"
        >
          Collection, Mirrors
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] 3xl:text-[3.75rem]
            font-normal leading-[1.08] -tracking-[0.005em]
            max-w-3xl mb-5 md:mb-7 lg:mb-8
          "
        >
          Refraction, framed in copper.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: luxuryEase }}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[15px] md:text-base lg:text-lg 3xl:text-[19px]
            leading-[1.75] opacity-[0.72] max-w-xl
          "
        >
          A studio-led collection of mirrors in hand-cut silvered glass and
          solid, hand-formed copper. Each piece is made to order in our East
          London workshop, an object designed not only to reflect a space, but
          to articulate the light within it.
        </motion.p>
      </div>

      {/* ---- Grid ---- */}
      <div
        className="
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
          pb-20 md:pb-28 lg:pb-32
          max-w-[1400px] 3xl:max-w-[1680px] mx-auto
        "
      >
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-x-5 sm:gap-x-5 md:gap-x-6 lg:gap-x-8 3xl:gap-x-10
            gap-y-10 sm:gap-y-10 md:gap-y-12 lg:gap-y-14
          "
        >
          {mirrors.map((mirror, i) => (
            <motion.div
              key={mirror.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: Math.min(i * 0.05, 0.3),
                ease: luxuryEase,
              }}
            >
              <Link
                href={`/product/${mirror.slug}`}
                className="group block text-inherit no-underline"
                aria-label={`View ${mirror.name}`}
              >
                {/* Uniform image tile */}
                <div
                  className="
                    relative w-full aspect-[4/5] overflow-hidden bg-muted
                  "
                >
                  <Image
                    src={mirror.image}
                    alt={`${mirror.name}, ${mirror.tagline}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`
                      object-cover will-change-[transform,opacity]
                      transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
                      group-hover:scale-[1.03] group-hover:duration-[1500ms]
                      ${mirror.hoverImage ? "sm:group-hover:opacity-0" : ""}
                    `}
                  />

                  {mirror.hoverImage && (
                    <Image
                      src={mirror.hoverImage}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="
                        hidden sm:block object-cover will-change-[transform,opacity]
                        opacity-0
                        transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
                        group-hover:opacity-100 group-hover:scale-[1.03] group-hover:duration-[1500ms]
                        pointer-events-none
                      "
                    />
                  )}

                  <div
                    className="
                      absolute inset-0 bg-black/0 sm:group-hover:bg-black/15
                      transition-colors duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
                      group-hover:duration-[1100ms]
                    "
                  />

                  {mirror.edition && (
                    <div
                      className="
                        absolute top-3 left-3 md:top-4 md:left-4
                        text-[10px] tracking-[0.15em] uppercase
                        text-white/95 px-2.5 py-1
                        bg-white/[0.14] backdrop-blur-xl
                        border border-white/25
                      "
                    >
                      {mirror.edition}
                    </div>
                  )}

                  {/* Desktop hover overlay - tagline + cue */}
                  <div
                    className="
                      hidden sm:flex
                      absolute inset-x-0 bottom-0 p-4 md:p-5
                      items-end justify-between gap-3
                      opacity-0 translate-y-3
                      group-hover:opacity-100 group-hover:translate-y-0
                      transition-[opacity,transform] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
                      group-hover:duration-[1300ms]
                      pointer-events-none
                    "
                  >
                    <p
                      className="
                        font-[family-name:var(--font-playfair),Georgia,serif]
                        text-[13px] md:text-[14px] leading-[1.45]
                        italic text-white/95 max-w-[24ch]
                        [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]
                      "
                    >
                      {mirror.tagline}
                    </p>
                    <span
                      className="
                        shrink-0 w-9 h-9 md:w-10 md:h-10
                        flex items-center justify-center
                        bg-white/[0.14] backdrop-blur-xl
                        border border-white/25 text-white
                      "
                      aria-hidden
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Meta: richer on mobile, compact on desktop */}
                <div className="pt-4 sm:pt-4 md:pt-5 lg:pt-6">
                  <h2
                    className="
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[1.375rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem] 3xl:text-[1.5rem]
                      font-normal leading-[1.2] tracking-[0.01em]
                      mb-2 sm:mb-1.5 md:mb-2
                    "
                  >
                    {mirror.name}
                  </h2>

                  {/* Tagline: always visible on mobile, hidden on sm+ where hover reveals it */}
                  <p
                    className="
                      sm:hidden
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[15px] leading-[1.6] italic
                      opacity-[0.7] mb-3.5
                      max-w-[36ch]
                    "
                  >
                    {mirror.tagline}
                  </p>

                  <div
                    className="
                      flex items-baseline justify-between gap-3
                      text-[12px] sm:text-[11px] md:text-[12px]
                      pt-3 sm:pt-0 border-t sm:border-t-0 border-black/[0.08]
                    "
                  >
                    <span className="tracking-[0.08em] uppercase opacity-55">
                      {mirror.dimension}
                    </span>
                    <span
                      className="
                        font-[family-name:var(--font-playfair),Georgia,serif]
                        text-[14px] sm:text-[13px] md:text-[14px] tabular-nums opacity-80
                      "
                    >
                      {mirror.price}
                    </span>
                  </div>

                  {/* Mobile-only tap cue */}
                  <div
                    className="
                      sm:hidden mt-3.5 flex items-center gap-2
                      text-[11px] tracking-[0.15em] uppercase opacity-70
                    "
                  >
                    <span>View Piece</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---- Commission prompt ---- */}
      <section
        className="
          bg-faint border-t border-black/[0.06]
          py-16 md:py-20 lg:py-24
        "
      >
        <div
          className="
            max-w-[1400px] 3xl:max-w-[1680px] mx-auto
            px-[max(1.25rem,env(safe-area-inset-left))]
            md:px-[max(2.25rem,env(safe-area-inset-left))]
            lg:px-[max(3.5rem,env(safe-area-inset-left))]
            3xl:px-[max(5rem,env(safe-area-inset-left))]
            flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16
          "
        >
          <div className="max-w-xl">
            <p className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase opacity-55 mb-3">
              Bespoke
            </p>
            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[1.75rem] md:text-[2.125rem] lg:text-[2.5rem] 3xl:text-[2.75rem]
                font-normal leading-[1.12] -tracking-[0.005em] mb-5 md:mb-6
              "
            >
              Commissioned for the space it is made for.
            </h2>
            <p
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[17px]
                leading-[1.75] opacity-[0.72]
              "
            >
              Every mirror can be scaled, finished, or reconfigured to suit a
              specific interior or architectural brief. We welcome conversations
              with collectors, interior designers, and architects.
            </p>
          </div>

          <Link
            href="/bespoke"
            className="
              inline-flex items-center gap-2
              text-[10px] md:text-[11px] tracking-[0.18em] uppercase
              text-inherit no-underline
              py-4 px-6 md:py-[1.125rem] md:px-8
              bg-black text-white
              transition-colors duration-200
              hover:bg-[#1a1a1a]
              self-start lg:self-end
            "
            style={{ color: "#fff" }}
          >
            <span>Enquire About a Commission</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
