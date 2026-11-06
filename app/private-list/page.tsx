"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getReferral } from "@/app/lib/referral";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Interest = "collector" | "designer" | "commission";

const INTERESTS: { id: Interest; label: string }[] = [
  { id: "collector", label: "Collector" },
  { id: "designer", label: "Interior designer or architect" },
  { id: "commission", label: "Planning a commission" },
];

const BENEFITS = [
  { n: "01", title: "First sight", body: "Every new edition, before it is announced publicly. Each is limited to ten." },
  { n: "02", title: "The studio", body: "Visits to our East London workshop, by appointment." },
  { n: "03", title: "Notes from the studio", body: "Occasional letters on new work and commissions, sent only when there is something to show." },
];

interface FormState {
  name: string;
  email: string;
  interest: Interest | "";
  location: string;
  website: string;
}

const initialState: FormState = { name: "", email: "", interest: "", location: "", website: "" };

type FieldErrors = Partial<Record<"name" | "email", string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERIF = "font-[family-name:var(--font-newsreader),Georgia,serif]";
const LABEL = "block text-[10px] tracking-[0.18em] uppercase font-medium mb-2.5 text-black/70";
const OPTIONAL = "text-black/30 normal-case tracking-normal ml-2 text-[10px] italic";
const INPUT = `w-full py-3.5 px-4 bg-white border border-black/[0.16] text-[15px] leading-[1.4] ${SERIF} placeholder:text-black/30 focus:border-black focus:shadow-[0_0_0_1px_rgb(0_0_0)] transition-[border-color,box-shadow] duration-200 box-border outline-none`;
const INPUT_ERR = "border-[#8a1f1f]/60 focus:border-[#8a1f1f] focus:shadow-[0_0_0_1px_rgb(138_31_31)]";

/** The ad or link that brought the visitor, read from the address. Nothing is stored. */
function campaignFromUrl() {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search);
  const source = q.get("utm_source");
  const medium = q.get("utm_medium");
  const campaign = q.get("utm_campaign");
  return source || medium || campaign ? { source, medium, campaign } : null;
}

export default function PrivateListPage() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formColumnRef = useRef<HTMLDivElement>(null);

  // On a phone the thank-you is much shorter than the form, so bring it into view.
  useEffect(() => {
    if (state !== "sent") return;
    const el = formColumnRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }
  }, [state, prefersReducedMotion]);

  const anim = (y: number) => (prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "name" || key === "email") {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key as "name" | "email"];
        return next;
      });
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    if (form.website.trim()) {
      setState("sent");
      return;
    }
    const errs: FieldErrors = {};
    if (!form.name.trim()) errs.name = "Please share your name.";
    if (!form.email.trim()) errs.email = "An email, so we can write to you.";
    else if (!EMAIL_RE.test(form.email.trim())) errs.email = "Please check the email address.";
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setState("sending");
    try {
      const res = await fetch("/api/private-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          interest: form.interest || null,
          location: form.location.trim() || null,
          referral: getReferral(),
          campaign: campaignFromUrl(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something didn't send.");
      }
      setState("sent");
    } catch (err) {
      setState("error");
      setSubmitError(err instanceof Error && err.message ? err.message : "Something didn't send.");
    }
  };

  const firstName = form.name.trim().split(/\s+/)[0] || "";

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant="dark" />

      <section
        className="
          bg-white
          pt-28 md:pt-36 lg:pt-44 3xl:pt-48
          pb-20 md:pb-28 lg:pb-36
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">
          <motion.nav
            initial={anim(8)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: luxuryEase }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-12 md:mb-16 lg:mb-24"
          >
            <Link href="/" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity duration-500">
              Home
            </Link>
            <span className="opacity-25 mx-2">/</span>
            <span className="opacity-90">Private list</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 md:gap-16 lg:gap-x-20 lg:gap-y-12 items-start">
            {/* Left: the introduction */}
            <motion.div
              initial={anim(16)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.08, ease: luxuryEase }}
              className="lg:col-span-5 lg:row-start-1"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span aria-hidden className="block h-px w-10 md:w-14 bg-black/25" />
                  <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase opacity-72">Private list</p>
                </div>
                <h1
                  className={`
                    ${SERIF}
                    text-[clamp(2.5rem,6vw,4.5rem)]
                    leading-[1.02] -tracking-[0.012em] font-normal
                    mb-8 md:mb-10
                  `}
                >
                  First sight of<br />
                  <em className="italic">new work.</em>
                </h1>
                <p className={`${SERIF} text-[15px] md:text-base lg:text-[17px] leading-[1.75] opacity-[0.88] max-w-[40ch] text-pretty`}>
                  Members hear of new editions before they are announced anywhere else.
                </p>
              </div>

            </motion.div>

            {/* Right: the form */}
            <motion.div
              ref={formColumnRef}
              initial={anim(20)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.18, ease: luxuryEase }}
              className="scroll-mt-28 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28"
            >
              <AnimatePresence mode="wait">
                {state === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: luxuryEase }}
                    className="pt-2"
                    role="status"
                  >
                    <p className="text-[10px] tracking-[0.28em] uppercase text-accent mb-5">Welcome</p>
                    <h2 className={`${SERIF} text-[2rem] md:text-[2.5rem] leading-[1.1] -tracking-[0.005em] font-normal mb-6`}>
                      Thank you{firstName ? `, ${firstName}` : ""}.
                    </h2>
                    <p className={`${SERIF} text-[15px] md:text-base leading-[1.75] opacity-82 max-w-[42ch] mb-10`}>
                      You are on the private list. When the next edition is ready, you will hear of it
                      before it is announced.
                    </p>
                    <Link
                      href="/limited-editions"
                      className="text-[10px] tracking-[0.22em] uppercase text-black no-underline border-b border-black/40 pb-0.5 hover:border-black transition-colors duration-300"
                    >
                      The current editions
                    </Link>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: luxuryEase }}
                    className="pt-2"
                    aria-label="Join the private list"
                  >
                    <h2 className={`${SERIF} text-[1.6rem] md:text-[1.9rem] leading-[1.15] font-normal mb-8 md:mb-10`}>
                      Join the private list
                    </h2>

                    <div className="mb-5 md:mb-6">
                      <label htmlFor="pl-name" className={LABEL}>Name</label>
                      <input
                        id="pl-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your full name"
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "pl-name-err" : undefined}
                        className={`${INPUT} ${fieldErrors.name ? INPUT_ERR : ""}`}
                      />
                      {fieldErrors.name && <FieldErr id="pl-name-err">{fieldErrors.name}</FieldErr>}
                    </div>

                    <div className="mb-5 md:mb-6">
                      <label htmlFor="pl-email" className={LABEL}>Email</label>
                      <input
                        id="pl-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "pl-email-err" : undefined}
                        className={`${INPUT} ${fieldErrors.email ? INPUT_ERR : ""}`}
                      />
                      {fieldErrors.email && <FieldErr id="pl-email-err">{fieldErrors.email}</FieldErr>}
                    </div>

                    <fieldset className="mb-5 md:mb-6 border-0 p-0 m-0">
                      <legend className={LABEL}>
                        You are <span className={OPTIONAL}>optional</span>
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {INTERESTS.map((opt) => {
                          const active = form.interest === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => update("interest", active ? "" : opt.id)}
                              aria-pressed={active}
                              className={`
                                text-[13px] leading-[1.4] tracking-[0.02em]
                                py-3.5 px-4 text-left border
                                transition-[border-color,background-color] duration-200 cursor-pointer
                                ${active
                                  ? "border-black bg-offwhite text-black"
                                  : "border-black/[0.14] bg-white text-black/65 hover:border-black/35 hover:bg-faint"}
                              `}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="mb-6 md:mb-8">
                      <label htmlFor="pl-location" className={LABEL}>
                        Location <span className={OPTIONAL}>optional</span>
                      </label>
                      <input
                        id="pl-location"
                        type="text"
                        autoComplete="address-level2"
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="City, Country"
                        className={INPUT}
                      />
                    </div>

                    {/* Honeypot */}
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

                    {state === "error" && (
                      <div role="alert" className="mb-6 px-4 py-3.5 border border-[#8a1f1f]/25 bg-[#8a1f1f]/[0.035] text-[13px] leading-[1.55] text-[#6e1818]">
                        {submitError || "Something didn't send. Please try again."}{" "}
                        <a href="mailto:studio@copaandglas.com" className="underline decoration-[#6e1818]/40 underline-offset-2 hover:decoration-[#6e1818]">
                          Write to us directly.
                        </a>
                      </div>
                    )}

                    <div className="pt-6 border-t border-black/[0.06] flex flex-col gap-5">
                      <button
                        type="submit"
                        disabled={state === "sending"}
                        className="
                          inline-flex items-center justify-center gap-2.5
                          py-4 px-8 bg-dark text-white border-none
                          text-[11px] tracking-[0.22em] uppercase
                          cursor-pointer disabled:opacity-65 disabled:cursor-wait
                          transition-colors duration-500 hover:bg-black
                          self-start
                        "
                      >
                        {state === "sending" ? "Joining…" : "Join the private list"}
                        {state !== "sending" && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        )}
                      </button>
                      <p className="text-[11.5px] leading-[1.6] text-black/60 max-w-[52ch]">
                        We write only about new work and the studio. You may leave the list at any
                        time. See our{" "}
                        <Link href="/privacy" className="text-inherit underline underline-offset-2 decoration-black/25 hover:decoration-black/60">
                          privacy notice
                        </Link>
                        .
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* What membership means */}
            <motion.div
              initial={anim(16)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.24, ease: luxuryEase }}
              className="lg:col-span-5 lg:row-start-2 flex flex-col gap-10 md:gap-12"
            >
              <ol className="list-none m-0 p-0 border-t border-black/10">
                {BENEFITS.map((b) => (
                  <li key={b.n} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 md:py-7 border-b border-black/10">
                    <span className="text-[10px] tracking-[0.2em] text-accent/80 pt-[5px]">{b.n}</span>
                    <div>
                      <p className={`${SERIF} text-[17px] md:text-lg leading-[1.3] mb-1.5`}>{b.title}</p>
                      <p className={`${SERIF} text-[14.5px] md:text-[15px] leading-[1.7] text-black/70 max-w-[42ch]`}>
                        {b.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <figure className="m-0">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#f6f5f2]">
                  <Image
                    src="/prairie-mirror-plate.webp"
                    alt="Copper provenance plate engraved Copa + Glas, The Prairie Mirror, Edition 1 of 10"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 text-[9px] tracking-[0.22em] uppercase text-black/60 font-medium">
                  The Prairie Mirror · Edition 1 of 10
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FieldErr({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[11.5px] leading-[1.5] text-[#8a1f1f]">
      {children}
    </p>
  );
}
