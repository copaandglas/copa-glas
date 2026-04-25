"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import EnquiryDrawer from "@/app/components/EnquiryDrawer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProductData {
  designer: string;
  name: string;
  size: string;
  description: string;
  provenance: string;
  material: string;
  dimensions: { cm: string; inches: string };
  finish: string;
  leadTime: string;
  price: string;
  images: string[];
  collectionCategory: { href: string; label: string };
}

const rotationMirror: ProductData = {
  designer: "Copa + Glas Studio",
  name: "Rotation Mirror",
  size: "",
  description: `The Rotation mirror is a foundational piece for the studio, exploring the tension between rigid geometry and fragmented light. Comprising twenty-six hand-cut glass facets, each pane is meticulously set within a slender frame of solid, hand-formed copper.

The result is a subtle, shifting perspective, a refractive depth that intensifies as one moves through the space. It is a piece designed not just to reflect an interior, but to articulate the light within it.`,
  provenance: `Hand-formed in our East London workshop, the Rotation series has been commissioned for architectural environments of note, including the Burberry flagship on Regent Street.`,
  material: "Solid copper; hand-cut silvered glass",
  dimensions: { cm: "97cm Diameter", inches: "38.2in Diameter" },
  finish: "Copper hand-finished in the studio",
  leadTime: "Master-led and made to order",
  price: "£6,000.00",
  images: ["/rotation-mirror.png"],
  collectionCategory: { href: "/mirrors", label: "Mirrors" },
};

const mondrianMirror: ProductData = {
  designer: "Copa + Glas Studio",
  name: "The Mondrian Mirror",
  size: "",
  description: `The Mondrian mirror is a tall vertical composition of hand-cut silvered glass divided by a slender grid of solid, hand-formed copper, an homage to rectilinear abstraction, brought into three dimensions for the wall.

Each pane sits within its own frame; the interplay of line and reflection reads differently from every angle in the room.`,
  provenance: `Made to order in our East London workshop, where each joint is formed and fitted by hand.`,
  material: "Solid copper; hand-cut silvered glass",
  dimensions: { cm: "69.5 × 100.5cm", inches: "27.4 × 39.6in" },
  finish: "Copper hand-finished in the studio",
  leadTime: "Made to order",
  price: "£8,500.00",
  images: ["/mondrian-mirror.png"],
  collectionCategory: { href: "/mirrors", label: "Mirrors" },
};

const fibonacciMirror: ProductData = {
  designer: "Copa + Glas Studio",
  name: "Fibonacci Mirror",
  size: "",
  description: `The Fibonacci mirror explores proportion through nested rectangles, a spiralling geometry drawn from the golden ratio, resolved in hand-cut silvered glass and slender lines of solid, hand-formed copper.

Each panel catches light differently, so the composition shifts subtly as you move through the room.`,
  provenance: `Made to order in our East London workshop, where every joint is soldered and finished by hand.`,
  material: "Solid copper; hand-cut silvered glass",
  dimensions: { cm: "65 × 90cm", inches: "25.6 × 35.4in" },
  finish: "Copper hand-finished in the studio",
  leadTime: "Made to order",
  price: "£5,500.00",
  images: ["/fibonacci-mirror-mantel.png"],
  collectionCategory: { href: "/mirrors", label: "Mirrors" },
};

const frankLloydWrightMirror: ProductData = {
  designer: "Copa + Glas Studio",
  name: "The Frank Lloyd Wright Mirror",
  size: "",
  description: `A tall vertical mirror in the spirit of Prairie School geometry, a disciplined grid of hand-formed copper holds clear silvered glass alongside panels of coloured and iridescent art glass, with a broad central field for the room to settle into.

Commissioned feeling, architectural scale, and craft detail in a single piece.`,
  provenance: `Limited to ten pieces worldwide. Each mirror is assembled and finished by hand in our East London workshop.`,
  material: "Solid copper; hand-cut silvered and art glass",
  dimensions: { cm: "31.5 × 91cm", inches: "12.4 × 35.8in" },
  finish: "Copper hand-finished in the studio",
  leadTime: "Made to order",
  price: "Price on request",
  images: ["/frank-lloyd-wright-mirror.png"],
  collectionCategory: { href: "/limited-editions", label: "Limited Editions" },
};

const auraWallLight: ProductData = {
  designer: "Copa + Glas Studio",
  name: "Aura Wall Light",
  size: "",
  description: `The Aura wall light is a composition of hand-formed copper and hand-finished glass, drawn into the glow of a room. Scale, proportion, glass finish, and colour are shaped to the space it lives in.

The piece shown was made for a private commission: a solid copper frame with tinted glass, 50 × 65cm. At its centre, a single pane of iridescent orange art glass, which shifts in colour as the room moves around it. Each Aura is made once, to the room it belongs in.`,
  provenance: `Made to order in our East London workshop, each Aura is assembled and finished by hand before leaving the studio.`,
  material: "Solid copper frame; hand-finished glass",
  dimensions: { cm: "50 × 65cm (piece shown)", inches: "19.7 × 25.6in (piece shown)" },
  finish: "Copper hand-finished in the studio. Glass specified to commission.",
  leadTime: "Made to order",
  price: "Price on application",
  images: ["/aura-wall-light.png"],
  collectionCategory: { href: "/lighting", label: "Lighting" },
};

const rotationConfettiMirror: ProductData = {
  designer: "Copa + Glas Studio",
  name: "The Rotation Confetti Mirror",
  size: "",
  description: `A celebratory reimagining of the Rotation, twenty-six hand-cut glass facets, set within solid, hand-formed copper, with refracted colour.

Assembled and finished to order in our East London workshop.`,
  provenance: `Limited to ten pieces worldwide. Each mirror is finished by hand in our East London workshop.`,
  material: "Solid copper; hand-cut silvered and art glass",
  dimensions: { cm: "97cm Diameter", inches: "38.2in Diameter" },
  finish: "Copper hand-finished in the studio",
  leadTime: "Made to order",
  price: "Price on request",
  images: ["/mirror-thumbnail.png"],
  collectionCategory: { href: "/limited-editions", label: "Limited Editions" },
};

function productForSlug(slug: string | undefined): ProductData {
  if (slug === "aura-wall-light") return auraWallLight;
  if (slug === "mondrian-mirror") return mondrianMirror;
  if (slug === "fibonacci-mirror") return fibonacciMirror;
  if (slug === "frank-lloyd-wright-mirror") return frankLloydWrightMirror;
  if (slug === "rotation-confetti-mirror") return rotationConfettiMirror;
  return rotationMirror;
}

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const product = useMemo(() => productForSlug(slug), [slug]);

  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelectedImage(0);
  }, [slug]);

  const goToPreviousImage = useCallback(() => {
    setSwipeDirection(-1);
    setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
  }, [product.images.length]);

  const goToNextImage = useCallback(() => {
    setSwipeDirection(1);
    setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
  }, [product.images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") goToPreviousImage();
      if (e.key === "ArrowRight") goToNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPreviousImage, goToNextImage]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) goToNextImage();
    else if (info.offset.x > threshold) goToPreviousImage();
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <Header variant="dark" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="dark" />

      <div className="pt-20 md:pt-[100px] lg:pt-[140px] 3xl:pt-[160px] min-w-0">
        <main className="
          flex flex-col md:flex-row
          max-w-[1400px] 3xl:max-w-[1680px] mx-auto
          pt-5 md:pt-7 lg:pt-10 3xl:pt-12
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
          pb-[max(2.5rem,env(safe-area-inset-bottom))]
          md:pb-[max(3.75rem,env(safe-area-inset-bottom))]
          lg:pb-[max(6.25rem,env(safe-area-inset-bottom))]
          gap-0 md:gap-11 lg:gap-16 3xl:gap-[5.625rem]
          items-start w-full box-border
        ">
          {/* ---- LEFT: Images ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
            className="
              w-full md:w-[48%] lg:w-1/2 3xl:w-1/2
              md:flex-none relative md:sticky md:top-6 self-start
            "
          >
            {/* Main image */}
            <motion.div className="
              relative aspect-[4/5] md:max-h-[calc(100vh-180px)] lg:max-h-[calc(100vh-220px)]
              bg-muted mb-3 md:mb-4 overflow-hidden
              cursor-grab md:cursor-default touch-pan-y
            ">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, x: swipeDirection * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: swipeDirection * -30 }}
                  transition={{ duration: 0.4, ease: luxuryEase }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 md:pointer-events-auto"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={`${product.name}, image ${selectedImage + 1} of ${product.images.length}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={selectedImage === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Desktop arrows */}
              {product.images.length > 1 && (
                <div className="hidden md:flex absolute inset-0 items-center justify-between px-5 pointer-events-none">
                  <motion.button
                    onClick={goToPreviousImage}
                    aria-label="Previous image"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.3)", scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      w-12 h-12 flex items-center justify-center
                      bg-white/[0.18] backdrop-blur-2xl border border-white/30 rounded-xl
                      cursor-pointer text-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                      pointer-events-auto text-[0px]
                    "
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </motion.button>
                  <motion.button
                    onClick={goToNextImage}
                    aria-label="Next image"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.3)", scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      w-12 h-12 flex items-center justify-center
                      bg-white/[0.18] backdrop-blur-2xl border border-white/30 rounded-xl
                      cursor-pointer text-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                      pointer-events-auto text-[0px]
                    "
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </motion.button>
                </div>
              )}

              {/* Mobile dots */}
              {product.images.length > 1 && (
                <div className="md:hidden absolute bottom-4 inset-x-0 flex justify-center gap-2 pointer-events-none">
                  {product.images.map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.2)] transition-all duration-300"
                      style={{
                        width: selectedImage === i ? 20 : 6,
                        backgroundColor: selectedImage === i ? "#fff" : "rgba(255,255,255,0.5)",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Desktop counter */}
              <div className="
                hidden md:block absolute bottom-4 right-4
                text-[11px] font-medium tracking-[0.15em] text-white/95
                bg-white/[0.18] backdrop-blur-2xl border border-white/30
                rounded-lg py-2 px-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)]
              ">
                {selectedImage + 1} <span className="opacity-50">/</span> {product.images.length}
              </div>
            </motion.div>

            {/* Thumbnails (tablet+) */}
            <div className="hidden md:flex gap-2.5">
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => { setSwipeDirection(index > selectedImage ? 1 : -1); setSelectedImage(index); }}
                  aria-label={`View image ${index + 1} of ${product.images.length}`}
                  aria-pressed={selectedImage === index}
                  className="flex-1 aspect-square max-w-20 p-0 bg-muted cursor-pointer overflow-hidden transition-[opacity,border-color] duration-200"
                  style={{
                    border: selectedImage === index ? "2px solid #000" : "2px solid transparent",
                    opacity: selectedImage === index ? 1 : 0.55,
                  }}
                  whileHover={{ opacity: 1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Image src={img} alt={`View ${index + 1}`} width={80} height={80} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>

            <div className="md:hidden h-6" />
          </motion.div>

          {/* ---- RIGHT: Details ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
            className="flex-1 min-w-0 max-w-full md:max-w-[540px] 3xl:max-w-[640px]"
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.12em] uppercase mb-4 md:mb-5 lg:mb-7"
            >
              <Link href="/" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity">Home</Link>
              <span className="opacity-25 mx-2">/</span>
              <Link href="/collection" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity">Collection</Link>
              <span className="opacity-25 mx-2">/</span>
              <Link href={product.collectionCategory.href} className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity">{product.collectionCategory.label}</Link>
              <span className="opacity-25 mx-2">/</span>
            </nav>

            {/* Designer */}
            <p className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase mb-2 md:mb-3 opacity-55">
              {product.designer}
            </p>

            {/* Title */}
            <h1 className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[1.75rem] md:text-[2.125rem] lg:text-[2.375rem] 3xl:text-[2.75rem]
              font-normal leading-[1.12] uppercase tracking-[0.02em]
              mb-6 md:mb-7 lg:mb-9 3xl:mb-10
            ">
              {product.name}
              {product.size && (
                <><br /><span className="text-[0.8em]">({product.size})</span></>
              )}
            </h1>

            {/* The Narrative */}
            <section className="mb-6 md:mb-7 lg:mb-9 3xl:mb-10 pb-6 md:pb-7 lg:pb-9 3xl:pb-10 border-b border-black/[0.08]">
              <h3 className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] lg:text-base 3xl:text-lg italic font-normal mb-3.5 lg:mb-4 3xl:mb-5">
                The Narrative
              </h3>
              <div className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] lg:text-base 3xl:text-[17px] leading-[1.85] opacity-[0.78]">
                {product.description.split("\n\n").map((para, i) => (
                  <p key={i} className={i === 0 ? "mb-4 lg:mb-6" : ""}>{para}</p>
                ))}
              </div>
            </section>

            {/* Provenance & Spec */}
            <section className="mb-6 md:mb-7 lg:mb-9 3xl:mb-10">
              <h3 className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] lg:text-base 3xl:text-lg italic font-normal mb-3.5 lg:mb-4 3xl:mb-5">
                Provenance &amp; Specification
              </h3>
              <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] 3xl:text-base leading-[1.8] opacity-[0.78] mb-5 lg:mb-6">
                {product.provenance}
              </p>

              <div className="text-[13px] md:text-sm">
                {[
                  { label: "Materials", value: product.material },
                  { label: "Dimensions", value: product.dimensions.cm },
                  { label: "Finish", value: product.finish },
                  { label: "Lead Time", value: product.leadTime },
                ].map((spec, i, arr) => (
                  <div
                    key={spec.label}
                    className={`
                      flex flex-wrap justify-between items-baseline py-2.5 md:py-3
                      gap-x-5 gap-y-2
                      ${i < arr.length - 1 ? "border-b border-black/[0.06]" : ""}
                    `}
                  >
                    <span className="font-medium shrink-0 text-xs md:text-[13px]">{spec.label}</span>
                    <span className="opacity-70 text-left md:text-right leading-normal flex-[1_1_200px] min-w-0">{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Download */}
            <a
              href="#"
              className="
                inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.12em] uppercase
                text-inherit no-underline mb-7 md:mb-8 lg:mb-10 3xl:mb-11
                pb-1 border-b border-black/25 hover:border-black/80 transition-[border-color]
              "
            >
              <span>Download Spec Sheet</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>

            {/* Price & CTA */}
            <div className="
              bg-faint p-7 md:p-8 lg:p-9 3xl:p-10
              -mx-5 md:mx-0 border-none md:border md:border-black/[0.06]
              border-b border-b-black/[0.06]
            ">
              <div className="mb-6 lg:mb-7 3xl:mb-8">
                <p className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[1.875rem] md:text-[2.125rem] lg:text-[2.375rem] 3xl:text-[2.625rem]
                  font-normal leading-[1.1] -tracking-[0.01em] mb-2
                ">
                  {product.price}
                </p>
                <p className="text-[11px] md:text-xs opacity-40 italic tracking-[0.02em]">
                  Tax included. Shipping quoted upon enquiry.
                </p>
              </div>

              <motion.button
                onClick={() => setEnquireOpen(true)}
                aria-haspopup="dialog"
                className="
                  w-full py-[1.125rem] md:py-[1.1875rem] 3xl:py-5 px-6 md:px-8 3xl:px-9
                  bg-black text-white border-none cursor-pointer
                  text-[11px] md:text-xs tracking-[0.18em] uppercase font-medium
                  mb-[1.125rem] md:mb-[1.375rem]
                "
                whileHover={{ backgroundColor: "#1a1a1a" }}
                whileTap={{ scale: 0.995 }}
                transition={{ duration: 0.15 }}
              >
                Enquire About This Piece
              </motion.button>

              <div className="flex items-center gap-5 md:gap-7 text-[10px] md:text-[11px] tracking-[0.12em] uppercase">
                <a href="#" className="inline-flex items-center gap-1.5 text-inherit no-underline opacity-50 hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>Save</span>
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 text-inherit no-underline opacity-50 hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span>Share</span>
                </a>
              </div>
            </div>

          </motion.div>
        </main>
      </div>

      <EnquiryDrawer
        open={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        product={{
          name: product.name,
          slug,
          image: product.images[0],
          price: product.price,
        }}
      />

      <Footer />
    </div>
  );
}
