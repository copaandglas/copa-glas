"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const configurators = [
  {
    href: "/configure/aura-wall-light",
    name: "Aura Wall Light",
    tagline: "A single pane of iridescent art glass at the centre — choose yours, and watch the room change around it.",
    image: "/aura-wall-light.png",
    available: true,
  },
  {
    href: "#",
    name: "Studio Mirrors",
    tagline: "Silvered glass and copper, composed for the wall — in development in the studio.",
    image: "/mondrian-mirror.png",
    available: false,
  },
] as const;

export default function ConfigurePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="dark" />

      <div
        className="
          pt-28 md:pt-36 lg:pt-44 3xl:pt-48
          pb-16 md:pb-20 lg:pb-24
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
          <Link href="/" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity">
            Home
          </Link>
          <span className="opacity-25 mx-2">/</span>
          <span className="opacity-90">Make Your Own</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: luxuryEase }}
          className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase mb-4 md:mb-5 opacity-75"
        >
          Copa + Glas Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: luxuryEase }}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] 3xl:text-[3.5rem]
            font-normal leading-[1.08] tracking-[0.02em]
            mb-6 md:mb-8 max-w-3xl
          "
        >
          Make Your Own
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: luxuryEase }}
          className="text-[10px] tracking-[0.18em] uppercase text-black/45 mb-6 md:mb-8"
        >
          Studio beta — not part of the main collection
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: luxuryEase }}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[15px] md:text-base lg:text-[17px] leading-[1.85] opacity-[0.88]
            max-w-2xl mb-14 md:mb-16 lg:mb-20
          "
        >
          Each piece holds glass and copper shaped by hand in East London. Begin with
          the Aura wall light: choose the iridescent finish that belongs in your room,
          lift the light, and send your note when the piece feels like yours.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {configurators.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.08, ease: luxuryEase }}
            >
              {item.available ? (
                <Link href={item.href} className="group block no-underline text-inherit">
                  <ConfiguratorCard item={item} />
                </Link>
              ) : (
                <div className="opacity-70 cursor-default" aria-disabled>
                  <ConfiguratorCard item={item} comingSoon />
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ConfiguratorCard({
  item,
  comingSoon = false,
}: {
  item: (typeof configurators)[number];
  comingSoon?: boolean;
}) {
  return (
    <>
      <div className="relative aspect-[4/5] bg-muted overflow-hidden mb-5">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-700 ${comingSoon ? "" : "group-hover:scale-[1.02]"}`}
        />
        {!comingSoon && (
          <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase bg-white/90 px-3 py-1.5">
            Beta
          </span>
        )}
        {comingSoon && (
          <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase bg-white/90 px-3 py-1.5">
            Coming soon
          </span>
        )}
      </div>
      <h2 className="font-[family-name:var(--font-playfair),Georgia,serif] text-xl md:text-2xl font-normal mb-2">
        {item.name}
      </h2>
      <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] leading-[1.7] opacity-80 mb-3">
        {item.tagline}
      </p>
      {!comingSoon && (
        <span className="text-[10px] tracking-[0.15em] uppercase border-b border-black/25 pb-0.5 group-hover:border-black/80 transition-[border-color]">
          Step inside
        </span>
      )}
    </>
  );
}
