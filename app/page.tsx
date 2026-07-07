"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";

const HomeContent = dynamic(() => import("@/app/components/HomeContent"));

export default function Home() {
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [headerVariant, setHeaderVariant] = useState<"light" | "dark">("light");

  useEffect(() => {
    let viewportH = window.innerHeight;
    let headerDark = false;

    const onScroll = () => {
      const y = window.scrollY;

      if (heroBgRef.current) {
        const blur = Math.max(0, 25 - (y / 200) * 25);
        heroBgRef.current.style.filter = `blur(${blur}px)`;
      }
      if (heroOverlayRef.current) {
        const overlay = Math.max(0, 0.5 - (y / 250) * 0.5);
        heroOverlayRef.current.style.opacity = String(overlay);
      }
      if (heroSectionRef.current) {
        const text = Math.max(0, 1 - y / 300);
        heroSectionRef.current.style.opacity = String(text);
      }

      const shouldBeDark = viewportH > 0 && y > viewportH * 0.7;
      if (shouldBeDark !== headerDark) {
        headerDark = shouldBeDark;
        setHeaderVariant(shouldBeDark ? "dark" : "light");
      }
    };

    const onResize = () => {
      viewportH = window.innerHeight;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="w-full min-w-0 box-border bg-white">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/heroimage.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110"
          ref={heroBgRef as React.Ref<HTMLImageElement>}
        />
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 bg-black"
          style={{ opacity: 0.5 }}
        />
      </div>

      <Header variant={headerVariant} />

      <section
        ref={heroSectionRef}
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
      >
        <p
          className="
            text-[15px] sm:text-base lg:text-lg xl:text-xl
            leading-[1.6] text-white font-[family-name:var(--font-playfair),Georgia,serif]
            mb-5 sm:mb-6 lg:mb-8
          "
        >
          <em>Copa + Glas</em> is an East London design studio specialising
          in handcrafted mirrors and lighting. Rooted in the traditions of
          British craft, working with copper and glass to create pieces of
          lasting beauty and significance. Each piece is made to order.
        </p>

        <nav
          className="
            flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 xl:gap-4
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-sm sm:text-[15px] lg:text-base xl:text-lg
          "
        >
          <Link href="/collection" className="text-white no-underline">
            Collection
          </Link>
          <Link href="/bespoke" className="text-white no-underline">
            Bespoke
          </Link>
          <Link href="/origins" className="text-white no-underline">
            Origins
          </Link>
          <Link href="/archive" className="text-white no-underline">
            Archive
          </Link>
          <Link href="/about" className="text-white no-underline">
            About
          </Link>
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

      <HomeContent />
    </div>
  );
}
