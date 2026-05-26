"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setViewportH(window.innerHeight);
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const blurAmount = Math.max(0, 25 - (scrollY / 200) * 25);
  const textOpacity = Math.max(0, 1 - scrollY / 300);
  const overlayOpacity = Math.max(0, 0.5 - (scrollY / 250) * 0.5);

  // Switch header to dark once we've scrolled into the white section
  // (a little before the section reaches the top so it doesn't lag).
  const headerVariant: "light" | "dark" =
    viewportH > 0 && scrollY > viewportH * 0.7 ? "dark" : "light";

  return (
    <div className="w-full min-w-0 box-border bg-white">
      {/* Fixed background image: only visible behind the hero.
          Sits behind the white section, which covers it as you scroll. */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/heroimage.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110 transition-[filter] duration-150 ease-out"
          style={{ filter: `blur(${blurAmount}px)` }}
        />
        <div
          className="absolute inset-0 bg-black transition-opacity duration-150 ease-out"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      <Header variant={headerVariant} />

      {/* ── Hero (grey/dark background scroll) ───────────────── */}
      <section
        className="
          relative z-10 h-screen w-full box-border
          max-w-full sm:max-w-[min(90%,520px)] lg:max-w-[520px] xl:max-w-[600px]
          pt-[max(100px,calc(72px+env(safe-area-inset-top)))]
          sm:pt-[max(130px,calc(72px+env(safe-area-inset-top)))]
          lg:pt-[max(160px,calc(72px+env(safe-area-inset-top)))]
          xl:pt-[max(200px,calc(72px+env(safe-area-inset-top)))]
          pb-15 sm:pb-20 lg:pb-25 xl:pb-30
          px-[max(1rem,env(safe-area-inset-left))]
          sm:px-[max(1.5rem,env(safe-area-inset-left))]
          lg:px-[max(1.75rem,env(safe-area-inset-left))]
          xl:px-[max(2rem,env(safe-area-inset-left))]
        "
        style={{ opacity: textOpacity, transition: "opacity 0.15s ease-out" }}
      >
        <p className="
          text-[15px] sm:text-base lg:text-lg xl:text-xl
          leading-[1.6] text-white font-[family-name:var(--font-playfair),Georgia,serif]
          mb-5 sm:mb-6 lg:mb-8
        ">
          <em>Copa + Glas</em> is an East London design studio specialising
          in handcrafted mirrors and lighting. Rooted in the traditions of
          British craft, working with copper and glass to create pieces of
          lasting beauty and significance. Each piece is made to order.
        </p>

        <nav className="
          flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 xl:gap-4
          font-[family-name:var(--font-playfair),Georgia,serif]
          text-sm sm:text-[15px] lg:text-base xl:text-lg
        ">
          <Link href="/collection" className="text-white no-underline">Collection</Link>
          <Link href="/bespoke" className="text-white no-underline">Bespoke</Link>
          <Link href="/origins" className="text-white no-underline">Origins</Link>
          <Link href="/archive" className="text-white no-underline">Archive</Link>
          <Link href="/about" className="text-white no-underline">About</Link>
          <div
            className="
              flex flex-col
              gap-2.5 sm:gap-3 lg:gap-3.5 xl:gap-4
              mt-6 sm:mt-7 lg:mt-8 xl:mt-9
            "
          >
            <Link href="/collaborative" className="text-white no-underline">
              Collaborations
            </Link>
            <Link href="/contact" className="text-white no-underline">
              Enquire
            </Link>
          </div>
        </nav>
      </section>

      {/* ── White canvas: content to be punched in ───────────── */}
      <section
        aria-label="Studio"
        className="
          relative z-10 bg-white text-dark
          min-h-screen w-full
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          py-24 md:py-32 lg:py-40
        "
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Content goes here */}
        </div>
      </section>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
