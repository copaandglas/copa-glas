"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import EnquiryDrawer from "@/app/components/EnquiryDrawer";
import AuraWallLightConfigurator, {
  type AuraConfiguration,
} from "@/app/components/AuraWallLightConfigurator";
import {
  auraConfigurationSummary,
  auraEnquiryProduct,
  defaultAuraConfiguration,
} from "@/app/lib/aura-wall-light-colors";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AuraWallLightConfigurePage() {
  const [config, setConfig] = useState<AuraConfiguration>(defaultAuraConfiguration);
  const [enquireOpen, setEnquireOpen] = useState(false);

  const handleConfigurationChange = useCallback((next: AuraConfiguration) => {
    setConfig(next);
  }, []);

  const openEnquiry = useCallback((snapshot: AuraConfiguration) => {
    setConfig(snapshot);
    setEnquireOpen(true);
  }, []);

  const enquiryProduct = useMemo(() => auraEnquiryProduct(config), [config]);

  const configurationMessage = useMemo(
    () => auraConfigurationSummary(config),
    [config],
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header variant="dark" />

      <motion.nav
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: luxuryEase }}
        aria-label="Breadcrumb"
        className="
          hidden md:flex flex-wrap items-center gap-y-1.5
          text-[10px] md:text-[11px] tracking-[0.12em] uppercase
          pt-28 md:pt-32 px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          max-w-[1400px] 3xl:max-w-[1680px] mx-auto w-full
        "
      >
        <Link href="/" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity">
          Home
        </Link>
        <span className="opacity-25 mx-2">/</span>
        <Link href="/configure" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity">
          Make Your Own
        </Link>
        <span className="opacity-25 mx-2">/</span>
        <span className="opacity-90">Aura Wall Light</span>
      </motion.nav>

      <main className="flex-1 min-h-0 pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.75rem))] md:pt-0 md:py-8 lg:py-12 md:px-[max(2.25rem,env(safe-area-inset-left))] lg:px-[max(3.5rem,env(safe-area-inset-left))]">
        <AuraWallLightConfigurator
          onConfigurationChange={handleConfigurationChange}
          onEnquire={openEnquiry}
          className="configure-embedded"
        />
      </main>

      <section
        className="
          hidden md:block border-t border-black/[0.08]
          px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          py-10 lg:py-12 max-w-[1400px] 3xl:max-w-[1680px] mx-auto w-full
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] leading-[1.7] opacity-85 max-w-xl">
            When the glass feels right, send your note to the studio. Anthony will
            follow up personally — to hear about the room, the light you imagine, and
            the making of the piece. If you have a particular colour in mind, let us
            know and we can explore.
          </p>
          <motion.button
            type="button"
            onClick={() => openEnquiry(config)}
            aria-haspopup="dialog"
            className="
              shrink-0 py-[1.125rem] px-10 bg-black text-white border-none cursor-pointer
              text-[11px] tracking-[0.18em] uppercase font-medium
            "
            whileHover={{ backgroundColor: "#1a1a1a" }}
            whileTap={{ scale: 0.995 }}
          >
            Enquire — {config.colorName} at the heart
          </motion.button>
        </div>
      </section>

      <div
        className="
          md:hidden fixed bottom-0 inset-x-0 z-[100]
          p-4 pb-[max(1rem,env(safe-area-inset-bottom))]
          bg-white/95 backdrop-blur-sm border-t border-black/[0.08]
        "
      >
        <p className="text-[10px] tracking-[0.1em] uppercase text-black/45 mb-2 text-center truncate">
          {config.colorName}
        </p>
        <button
          type="button"
          onClick={() => openEnquiry(config)}
          className="
            w-full py-4 bg-black text-white border-none cursor-pointer
            text-[11px] tracking-[0.18em] uppercase font-medium
          "
        >
          Enquire About This Piece
        </button>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>

      <EnquiryDrawer
        open={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        title="Enquiry"
        product={enquiryProduct}
        configurationMessage={configurationMessage}
        variant="configurator"
      />
    </div>
  );
}
