"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type PrivacySection = {
  num: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  footer?: React.ReactNode;
};

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    num: "01",
    title: "Who We Are",
    paragraphs: [
      "Copa + Glas Studio is a maker of handcrafted glass mirrors and lighting, based in East London, England. We operate under the trading name Copa + Glas and are the data controller responsible for your personal information.",
      "You can contact us at any time regarding this policy or your personal data by writing to us at studio@copaandglas.com.",
    ],
  },
  {
    num: "02",
    title: "Information We Collect",
    paragraphs: [
      "We collect personal information only when it is necessary to do so. The information we may collect includes:",
    ],
    items: [
      "Contact details: your name, email address, phone number, and postal address when you place an order, make a bespoke enquiry, or get in touch with us",
      "Order information: the details of what you have commissioned, your delivery address, and correspondence relating to your order",
      "Payment information: we do not store card details directly; payments are processed securely by our payment provider",
      "Newsletter subscription: your email address if you choose to subscribe to our newsletter",
      "Trade enquiry details: your business name, role, and contact details if you apply for a trade account",
      "Communications: the content of any emails, messages, or enquiries you send us",
    ],
  },
  {
    num: "03",
    title: "How We Use Your Information",
    paragraphs: [
      "We use your personal information for the following purposes:",
    ],
    items: [
      "To fulfil your order and manage the production and delivery of your commission",
      "To communicate with you about your order, answer enquiries, and provide aftercare",
      "To send our newsletter to subscribers who have opted in",
      "To manage trade account applications and maintain trade relationships",
      "To comply with our legal and accounting obligations",
      "To improve our website and understand how visitors use it",
    ],
  },
  {
    num: "04",
    title: "Legal Basis for Processing",
    paragraphs: [
      "Under UK GDPR, we rely on the following legal bases to process your personal data:",
    ],
    items: [
      "Contract: to fulfil orders and manage the commission process",
      "Consent: to send our newsletter — you may withdraw this at any time",
      "Legitimate interests: to respond to enquiries, manage trade relationships, and improve our services",
      "Legal obligation: to maintain records required by law, including for accounting and tax purposes",
    ],
  },
  {
    num: "05",
    title: "Third Parties",
    paragraphs: [
      "We do not sell or rent your personal data to third parties. We may share limited information with trusted third-party services where necessary to operate our business:",
    ],
    items: [
      "Payment processors: to handle transactions securely",
      "Delivery and logistics partners: to arrange shipping and installation",
      "Email service providers: to send transactional and newsletter emails",
      "Accountants and legal advisors: where required by law or professional obligation",
    ],
    footer: (
      <p>
        All third parties we work with are required to handle your data in
        accordance with applicable data protection law. We do not transfer your
        data outside the UK or EEA without appropriate safeguards in place.
      </p>
    ),
  },
  {
    num: "06",
    title: "Data Retention",
    paragraphs: [
      "We retain your personal information only for as long as necessary. Order records and related correspondence are kept for seven years in line with our accounting obligations. Newsletter subscriptions are maintained until you unsubscribe. Enquiries and trade applications that do not result in a commission are held for up to two years, after which they are deleted.",
      "You may request deletion of your data at any time, subject to any legal obligations we are required to meet.",
    ],
  },
  {
    num: "07",
    title: "Your Rights",
    paragraphs: [
      "Under UK GDPR, you have the following rights in relation to your personal data:",
    ],
    items: [
      "The right to access the personal data we hold about you",
      "The right to correct inaccurate or incomplete information",
      "The right to request deletion of your data, where we have no legal obligation to retain it",
      "The right to restrict or object to how we process your data",
      "The right to data portability in certain circumstances",
      "The right to withdraw consent at any time, where processing is based on consent",
    ],
    footer: (
      <p>
        To exercise any of these rights, please contact us at{" "}
        <a
          href="mailto:studio@copaandglas.com"
          className="text-inherit underline underline-offset-[3px] decoration-black/25 hover:decoration-black/60 transition-colors duration-300"
        >
          studio@copaandglas.com
        </a>
        . We will respond within 30 days. You also have the right to lodge a
        complaint with the Information Commissioner&apos;s Office (ICO) at{" "}
        <a
          href="https://ico.org.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit underline underline-offset-[3px] decoration-black/25 hover:decoration-black/60 transition-colors duration-300"
        >
          ico.org.uk
        </a>
        .
      </p>
    ),
  },
  {
    num: "08",
    title: "Cookies",
    paragraphs: [
      "Our website uses only essential cookies required for the site to function. We do not use tracking, advertising, or analytics cookies. No personal data is collected through cookies.",
    ],
  },
  {
    num: "09",
    title: "Website & Security",
    paragraphs: [
      "Our website is hosted securely and all data transmitted between your browser and our site is encrypted. We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, or disclosure.",
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.",
    ],
  },
  {
    num: "10",
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated date. We encourage you to review this page periodically. This policy was last updated May 2026.",
    ],
  },
];

const BODY =
  "font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] md:text-base leading-[1.85] text-black/80";

function PrivacyParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={`space-y-5 ${BODY}`}>
      {paragraphs.map((text) => (
        <p key={text.slice(0, 48)}>{text}</p>
      ))}
    </div>
  );
}

export default function PrivacyPage() {
  const reduced = useReducedMotion();
  const from = (y: number) =>
    reduced ? { opacity: 0 } : { opacity: 0, y };

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant="dark" />

      <main
        className="
          pt-28 md:pt-36 lg:pt-44
          pb-20 md:pb-28 lg:pb-36
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">
          <motion.nav
            initial={from(8)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-14 md:mb-20"
          >
            <Link
              href="/"
              className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity duration-500"
            >
              Home
            </Link>
            <span className="opacity-25 mx-2">/</span>
            <span className="opacity-90">Privacy Policy</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
            <header className="lg:col-span-5 lg:sticky lg:top-28">
              <motion.p
                initial={from(8)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.05, ease }}
                className="text-[9px] tracking-[0.28em] uppercase text-black/62 font-medium mb-7"
              >
                Information
              </motion.p>

              <motion.h1
                initial={from(20)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.12, ease }}
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(2.5rem,6vw,4.25rem)]
                  leading-[1.03] -tracking-[0.01em] font-normal
                  mb-8 md:mb-10
                "
              >
                Privacy Policy
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.28, ease }}
                style={{ originX: 0 }}
                className="w-10 h-px bg-black/15 mb-8"
              />

              <motion.p
                initial={from(14)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.22, ease }}
                className={`max-w-[32rem] ${BODY}`}
              >
                We take the privacy of our clients and visitors seriously. This
                policy explains what personal information we collect, how we use
                it, and your rights in relation to it. If you have any
                questions, please contact us at{" "}
                <a
                  href="mailto:studio@copaandglas.com"
                  className="text-inherit underline underline-offset-[3px] decoration-black/25 hover:decoration-black/60 transition-colors duration-300"
                >
                  studio@copaandglas.com
                </a>
                .
              </motion.p>
            </header>

            <div className="lg:col-span-7">
              <div className="divide-y divide-black/[0.08]">
                {PRIVACY_SECTIONS.map((section, i) => (
                  <motion.section
                    key={section.num}
                    id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                    initial={from(18)}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-6% 0px" }}
                    transition={{ duration: 1.2, delay: (i % 3) * 0.06, ease }}
                    className="py-10 md:py-12 first:pt-0"
                  >
                    <p
                      className="
                        font-[family-name:var(--font-playfair),Georgia,serif]
                        text-[clamp(1.35rem,2vw,1.6rem)]
                        text-accent/70 italic font-normal mb-4
                      "
                    >
                      {section.num}
                    </p>

                    <h2
                      className="
                        font-[family-name:var(--font-playfair),Georgia,serif]
                        text-[clamp(1.15rem,1.8vw,1.35rem)]
                        leading-[1.25] font-normal text-black/90
                        mb-6
                      "
                    >
                      {section.title}
                    </h2>

                    {section.paragraphs && (
                      <PrivacyParagraphs paragraphs={section.paragraphs} />
                    )}

                    {section.items && (
                      <ul className={`space-y-2.5 list-none pl-0 m-0 mt-5 ${BODY}`}>
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.72em] before:w-1 before:h-1 before:rounded-full before:bg-black/25"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.footer && (
                      <div className={`mt-6 ${BODY}`}>{section.footer}</div>
                    )}
                  </motion.section>
                ))}
              </div>

              <motion.aside
                initial={from(14)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6% 0px" }}
                transition={{ duration: 1.2, ease }}
                className="
                  mt-12 md:mt-16 pt-10 md:pt-12
                  border-t border-black/[0.08]
                "
              >
                <p className={`max-w-[36rem] ${BODY}`}>
                  If you have any questions about this policy or how we handle
                  your data, please contact us at{" "}
                  <a
                    href="mailto:studio@copaandglas.com"
                    className="text-inherit underline underline-offset-[3px] decoration-black/25 hover:decoration-black/60 transition-colors duration-300"
                  >
                    studio@copaandglas.com
                  </a>
                  . This policy was last updated May 2026.
                </p>
              </motion.aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
