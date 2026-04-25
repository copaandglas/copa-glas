"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CollectionCategory {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  count: string;
  image: string;
  hoverImage?: string;
}

const categories: CollectionCategory[] = [
  {
    slug: "mirrors",
    name: "Mirrors",
    tagline: "Refraction, framed in copper.",
    description:
      "Hand-cut silvered glass held within solid, hand-formed copper, objects designed to articulate the light within a room.",
    count: "Three pieces",
    image: "/mondrian-mirror.png",
    hoverImage: "/mondrian-mirror-close.png",
  },
  {
    slug: "lighting",
    name: "Lighting",
    tagline: "Copper and glass, quietly lit.",
    description:
      "Sculptural wall lights and fixtures made in the studio, where the same material language is carried into the glow of a room.",
    count: "One piece",
    image: "/aura-wall-light-off.png",
    hoverImage: "/aura-wall-light.png",
  },
  {
    slug: "limited-editions",
    name: "Limited Editions",
    tagline: "Works of singular intention.",
    description:
      "Each piece limited to ten worldwide. Made once, never repeated.",
    count: "Two works · 1 of 10",
    image: "/mirror-thumbnail.png",
  },
];

export default function CollectionPage() {
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
          <span className="opacity-90">Collection</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: luxuryEase }}
          className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase opacity-55 mb-3 md:mb-4"
        >
          The Studio Collection
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
          Copper, glass, and the light between them.
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
          Mirrors, lighting, and limited editions. Each piece is hand-made to
          order in our East London workshop, three strands, drawn from a
          single material language in copper and glass.
        </motion.p>
      </div>

      {/* ---- Category cards ---- */}
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
            grid grid-cols-1 lg:grid-cols-3
            gap-y-12 lg:gap-x-8 3xl:gap-x-12
          "
        >
          {categories.map((category, i) => (
            <motion.div
              key={category.slug}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: luxuryEase,
              }}
            >
              <Link
                href={`/${category.slug}`}
                className="group flex flex-col h-full text-inherit no-underline"
                aria-label={`Browse ${category.name}`}
              >
                <div className="relative w-full aspect-[4/5] shrink-0 overflow-hidden bg-muted">
                  <Image
                    src={category.image}
                    alt={`${category.name}, ${category.tagline}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`
                      object-cover will-change-[transform,opacity]
                      transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
                      group-hover:scale-[1.035] group-hover:duration-[900ms]
                      ${category.hoverImage ? "sm:group-hover:opacity-0" : ""}
                    `}
                  />

                  {category.hoverImage && (
                    <Image
                      src={category.hoverImage}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="
                        hidden sm:block object-cover will-change-[transform,opacity]
                        opacity-0
                        transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
                        group-hover:opacity-100 group-hover:scale-[1.035] group-hover:duration-[900ms]
                        pointer-events-none
                      "
                    />
                  )}

                  <div
                    className="
                      absolute inset-0 bg-black/0 sm:group-hover:bg-black/15
                      transition-colors duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
                      group-hover:duration-[700ms]
                    "
                  />
                  <div
                    className="
                      absolute bottom-4 left-4 md:bottom-5 md:left-5
                      text-[10px] tracking-[0.15em] uppercase
                      text-white/95 px-2.5 py-1
                      bg-white/[0.14] backdrop-blur-xl
                      border border-white/25
                    "
                  >
                    {category.count}
                  </div>
                </div>

                <div className="pt-6 md:pt-7 lg:pt-8 flex flex-col flex-1 min-h-0">
                  <h2
                    className="
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[1.75rem] md:text-[1.875rem] lg:text-[1.875rem] 3xl:text-[2.125rem]
                      font-normal leading-[1.1] tracking-[0.01em]
                      mb-3 md:mb-4
                    "
                  >
                    {category.name}
                  </h2>

                  <p
                    className="
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[15px] md:text-base lg:text-[17px]
                      italic leading-[1.55] opacity-[0.75]
                      mb-3 md:mb-4 max-w-[38ch]
                    "
                  >
                    {category.tagline}
                  </p>

                  <p
                    className="
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[14px] md:text-[15px] leading-[1.7]
                      opacity-[0.65] max-w-[48ch]
                    "
                  >
                    {category.description}
                  </p>

                  <div
                    className="
                      mt-auto pt-5 md:pt-6
                      inline-flex items-center gap-2 self-start
                      whitespace-nowrap
                      pb-1 border-b border-black/25
                      text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] 2xl:text-[11px] tracking-[0.12em] md:tracking-[0.15em] uppercase
                      transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      group-hover:border-black/80
                    "
                  >
                    <span>Browse {category.name}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
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

      <Footer />
    </div>
  );
}
