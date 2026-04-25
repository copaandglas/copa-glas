"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Timeline = "within-month" | "1-3-months" | "later-year" | "exploring";
type ContactMethod = "email" | "phone" | "either";

export interface EnquiryDrawerProduct {
  name: string;
  slug?: string;
  image?: string;
  price?: string;
}

interface EnquiryDrawerProps {
  open: boolean;
  onClose: () => void;
  product?: EnquiryDrawerProduct;
  /** Optional override eyebrow label (e.g. "Studio Enquiry"). */
  title?: string;
}

interface FormState {
  name: string;
  email: string;
  telephone: string;
  location: string;
  intendedSpace: string;
  timeline: Timeline | "";
  contactMethod: ContactMethod;
  message: string;
  newsletter: boolean;
  /** Honeypot - leave blank. */
  website: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  telephone: "",
  location: "",
  intendedSpace: "",
  timeline: "",
  contactMethod: "either",
  message: "",
  newsletter: false,
  website: "",
};

const TIMELINE_OPTIONS: { id: Timeline; label: string }[] = [
  { id: "within-month", label: "Within a month" },
  { id: "1-3-months", label: "1 to 3 months" },
  { id: "later-year", label: "Later this year" },
  { id: "exploring", label: "Still exploring" },
];

const CONTACT_OPTIONS: { id: ContactMethod; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "either", label: "Either" },
];

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fieldEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LABEL_CLASS =
  "block text-[10px] tracking-[0.18em] uppercase font-medium mb-2.5 text-black/70";
const LABEL_OPTIONAL_CLASS = "text-black/30 normal-case tracking-normal ml-2 text-[10px] italic";
const INPUT_CLASS =
  "w-full py-3.5 px-4 bg-white border border-black/[0.16] text-[15px] leading-[1.4] font-[family-name:var(--font-playfair),Georgia,serif] placeholder:text-black/30 focus:border-black focus:shadow-[0_0_0_1px_rgb(0_0_0)] transition-[border-color,box-shadow] duration-200 box-border";
const HELP_CLASS = "text-[11px] leading-[1.5] text-black/45 mt-2";

export default function EnquiryDrawer({ open, onClose, product, title }: EnquiryDrawerProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const eyebrow = useMemo(() => {
    if (title) return title;
    return product ? "Enquiry" : "Studio Enquiry";
  }, [title, product]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 420);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (submitState === "sent") {
        setForm(initialState);
        setSubmitState("idle");
      }
    }, 400);
    return () => clearTimeout(t);
  }, [open, submitState]);

  useEffect(() => {
    if (submitState === "sent" && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitState]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "sending") return;

    if (form.website.trim().length > 0) {
      setSubmitState("sent");
      return;
    }

    setSubmitState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          telephone: form.telephone.trim() || null,
          location: form.location.trim() || null,
          intendedSpace: form.intendedSpace.trim() || null,
          timeline: form.timeline || null,
          contactMethod: form.contactMethod,
          message: form.message.trim(),
          newsletter: form.newsletter,
          product: product
            ? { name: product.name, slug: product.slug ?? null }
            : null,
          source:
            typeof window !== "undefined"
              ? { url: window.location.href, path: window.location.pathname }
              : null,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  };

  const firstName = form.name.trim().split(/\s+/)[0] || "there";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: luxuryEase }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-drawer-title"
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="
              absolute right-0 top-0 bottom-0
              w-full sm:w-[min(560px,92vw)]
              bg-white shadow-[-24px_0_48px_-16px_rgba(0,0,0,0.25)]
              flex flex-col
            "
          >
            <div
              className="
                flex items-start justify-between gap-4
                px-6 md:px-8 lg:px-10
                pt-[max(1.5rem,env(safe-area-inset-top))] pb-5
                border-b border-black/[0.06]
              "
            >
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.22em] uppercase text-black/45 mb-2">
                  {eyebrow}
                </p>
                {product ? (
                  <div className="flex items-center gap-3 min-w-0">
                    {product.image && (
                      <div className="relative shrink-0 w-11 h-11 bg-muted overflow-hidden">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h2
                      id="enquiry-drawer-title"
                      className="font-[family-name:var(--font-playfair),Georgia,serif] italic text-[1.25rem] md:text-[1.375rem] leading-[1.2] truncate"
                    >
                      {product.name}
                    </h2>
                  </div>
                ) : (
                  <h2
                    id="enquiry-drawer-title"
                    className="font-[family-name:var(--font-playfair),Georgia,serif] italic text-[1.25rem] md:text-[1.375rem] leading-[1.2]"
                  >
                    A note to the studio
                  </h2>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close enquiry"
                className="
                  shrink-0 -mr-2 -mt-2 p-2.5
                  text-black/55 hover:text-black
                  transition-colors duration-200
                  bg-transparent border-none cursor-pointer
                "
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div
              ref={scrollRef}
              className="
                flex-1 overflow-y-auto
                px-6 md:px-8 lg:px-10
                pb-[max(1.75rem,env(safe-area-inset-bottom))]
              "
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <AnimatePresence mode="wait">
                {submitState === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: luxuryEase }}
                    className="pt-16 md:pt-20 lg:pt-24"
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase text-black/45 mb-4">
                      Received
                    </p>
                    <h3 className="font-[family-name:var(--font-playfair),Georgia,serif] text-[1.75rem] md:text-[2rem] leading-[1.15] -tracking-[0.005em] mb-6">
                      Thank you, {firstName}.
                    </h3>
                    <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] md:text-base leading-[1.7] text-black/70 max-w-[38ch] mb-8">
                      Your note has reached the studio. We'll be in touch
                      within two working days.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="
                        inline-flex items-center gap-2
                        text-[10px] tracking-[0.18em] uppercase font-medium
                        bg-transparent border-none text-black
                        cursor-pointer p-0
                        border-b border-black/80 pb-1
                      "
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: fieldEase }}
                    className="pt-7 md:pt-8"
                    noValidate
                  >
                    <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] leading-[1.7] text-black/65 mb-8 max-w-[44ch]">
                      {product
                        ? "Tell us a little about yourself and the space you have in mind."
                        : "A few details so we can respond thoughtfully."}
                    </p>

                    <SectionHeading>About you</SectionHeading>

                    <Field>
                      <label htmlFor="enq-name" className={LABEL_CLASS}>Name</label>
                      <input
                        ref={firstFieldRef}
                        id="enq-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your full name"
                        className={INPUT_CLASS}
                      />
                    </Field>

                    <Field>
                      <label htmlFor="enq-email" className={LABEL_CLASS}>Email</label>
                      <input
                        id="enq-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        className={INPUT_CLASS}
                      />
                    </Field>

                    <Field>
                      <label htmlFor="enq-tel" className={LABEL_CLASS}>
                        Telephone
                        <span className={LABEL_OPTIONAL_CLASS}>optional</span>
                      </label>
                      <input
                        id="enq-tel"
                        name="telephone"
                        type="tel"
                        autoComplete="tel"
                        value={form.telephone}
                        onChange={(e) => update("telephone", e.target.value)}
                        placeholder="Including country code"
                        className={INPUT_CLASS}
                      />
                    </Field>

                    <Field>
                      <label htmlFor="enq-location" className={LABEL_CLASS}>
                        Location
                        <span className={LABEL_OPTIONAL_CLASS}>optional</span>
                      </label>
                      <input
                        id="enq-location"
                        name="location"
                        type="text"
                        autoComplete="address-level2"
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="City, Country"
                        className={INPUT_CLASS}
                      />
                    </Field>

                    <SectionHeading>About the enquiry</SectionHeading>

                    {product && (
                      <Field>
                        <span className={LABEL_CLASS}>Piece</span>
                        <div className="
                          flex items-center gap-3
                          px-4 py-3 border border-black/[0.08] bg-faint
                        ">
                          {product.image && (
                            <div className="relative shrink-0 w-9 h-9 bg-muted overflow-hidden">
                              <Image src={product.image} alt="" fill sizes="36px" className="object-cover" />
                            </div>
                          )}
                          <span className="font-[family-name:var(--font-playfair),Georgia,serif] italic text-[15px] text-black/80 truncate">
                            {product.name}
                          </span>
                        </div>
                      </Field>
                    )}

                    {product && (
                      <Field>
                        <label htmlFor="enq-space" className={LABEL_CLASS}>
                          Intended space
                          <span className={LABEL_OPTIONAL_CLASS}>optional</span>
                        </label>
                        <input
                          id="enq-space"
                          name="intendedSpace"
                          type="text"
                          value={form.intendedSpace}
                          onChange={(e) => update("intendedSpace", e.target.value)}
                          placeholder="Which room is this for?"
                          className={INPUT_CLASS}
                        />
                      </Field>
                    )}

                    <Field>
                      <span className={LABEL_CLASS}>Timeline</span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {TIMELINE_OPTIONS.map((opt) => {
                          const active = form.timeline === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => update("timeline", opt.id)}
                              aria-pressed={active}
                              className={`
                                text-[12px] md:text-[12.5px] tracking-[0.04em]
                                py-3 px-3 text-left
                                border transition-colors duration-200
                                cursor-pointer bg-white
                                ${active
                                  ? "border-black bg-black text-white"
                                  : "border-black/[0.16] text-black/75 hover:border-black/50"}
                              `}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </Field>

                    <Field>
                      <span className={LABEL_CLASS}>Preferred contact</span>
                      <div className="inline-flex border border-black/[0.16] bg-white">
                        {CONTACT_OPTIONS.map((opt, i) => {
                          const active = form.contactMethod === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => update("contactMethod", opt.id)}
                              aria-pressed={active}
                              className={`
                                text-[11px] md:text-[12px] tracking-[0.08em]
                                py-2.5 px-5 cursor-pointer bg-transparent
                                transition-colors duration-200
                                ${i > 0 ? "border-l border-black/[0.12]" : ""}
                                ${active ? "bg-black text-white" : "text-black/75 hover:text-black"}
                              `}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </Field>

                    <Field>
                      <label htmlFor="enq-message" className={LABEL_CLASS}>Message</label>
                      <textarea
                        id="enq-message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder={
                          product
                            ? `Anything you'd like us to know about ${product.name} or the space it's for.`
                            : "Tell us a little about what you have in mind."
                        }
                        className={`${INPUT_CLASS} resize-y min-h-32 leading-[1.6]`}
                      />
                    </Field>

                    <Field>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={form.newsletter}
                          onChange={(e) => update("newsletter", e.target.checked)}
                          className="
                            mt-0.5 w-4 h-4 shrink-0 accent-black cursor-pointer
                            border border-black/25
                          "
                        />
                        <span className="text-[13px] leading-[1.55] text-black/70 group-hover:text-black/90 transition-colors">
                          Keep me in mind for occasional studio news. Rare, considered.
                        </span>
                      </label>
                    </Field>

                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      className="absolute -left-[9999px] opacity-0 pointer-events-none h-0 w-0"
                      aria-hidden
                    />

                    {submitState === "error" && (
                      <p className="mb-4 text-[13px] text-red-700">
                        Something didn't send. Please try again, or email{" "}
                        <a href="mailto:info@copaandglas.com" className="underline">
                          info@copaandglas.com
                        </a>
                        .
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-3 pb-4">
                      <motion.button
                        type="submit"
                        disabled={submitState === "sending"}
                        whileHover={submitState !== "sending" ? { backgroundColor: "#1a1a1a" } : undefined}
                        whileTap={submitState !== "sending" ? { scale: 0.99 } : undefined}
                        className="
                          inline-flex items-center justify-center gap-2.5
                          py-4 px-7 bg-black text-white border-none
                          text-[11px] tracking-[0.18em] uppercase font-medium
                          cursor-pointer disabled:opacity-65 disabled:cursor-wait
                          transition-colors duration-200
                        "
                      >
                        {submitState === "sending" ? "Sending…" : "Send to the studio"}
                        {submitState !== "sending" && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        )}
                      </motion.button>
                      <p className={HELP_CLASS + " sm:mt-0"}>
                        Typical reply within two working days.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="
      text-[10px] tracking-[0.22em] uppercase text-black/40
      mt-2 mb-5
      pb-2.5 border-b border-black/[0.06]
    ">
      {children}
    </h3>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 md:mb-6">{children}</div>;
}
