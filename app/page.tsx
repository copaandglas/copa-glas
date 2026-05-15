"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import EnquiryDrawer from "@/app/components/EnquiryDrawer";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blurAmount = Math.max(0, 25 - (scrollY / 200) * 25);
  const textOpacity = Math.max(0, 1 - scrollY / 300);
  const overlayOpacity = Math.max(0, 0.5 - (scrollY / 250) * 0.5);

  return (
    <div className="w-full min-w-0 box-border">
      {/* Background image: scroll-driven blur requires inline style */}
      <div className="fixed inset-0 z-0 overflow-hidden">
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

      <Header variant="light" />

      {/* Hero content: opacity driven by scroll */}
      <div
        className="
          relative z-10 min-h-screen w-full box-border
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
          with handcrafted mirrors and lighting. Rooted with the traditions of
          British craft, we work with copper and glass to create pieces of
          lasting beauty and significance. Each piece is made to order.
        </p>

        <nav className="
          flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 xl:gap-4
          font-[family-name:var(--font-playfair),Georgia,serif]
          text-sm sm:text-[15px] lg:text-base xl:text-lg
        ">
          <Link href="/collection" className="text-white no-underline">Collection</Link>
          <Link href="/bespoke" className="text-white no-underline">Bespoke</Link>
          <Link href="/archive" className="text-white no-underline">Archive</Link>
          <Link href="/about" className="text-white no-underline">About</Link>
          <button
            onClick={() => setShowEnquiryForm(true)}
            className="
              text-white bg-transparent border-none p-0 cursor-pointer text-left
              font-[family-name:var(--font-playfair),Georgia,serif] text-inherit
              mt-6 sm:mt-7 lg:mt-8 xl:mt-9
            "
          >
            Enquire
          </button>
        </nav>
      </div>

      <EnquiryDrawer
        open={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        title="Studio Enquiry"
      />

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
