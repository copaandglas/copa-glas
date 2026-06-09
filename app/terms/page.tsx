"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type TermsList = {
  title: string;
  items: string[];
};

type TermsSubsection = {
  title: string;
  paragraphs: string[];
};

type TermsSection = {
  num: string;
  title: string;
  paragraphs?: string[];
  subsections?: TermsSubsection[];
  lists?: TermsList[];
  footer?: React.ReactNode;
};

const TERMS_SECTIONS: TermsSection[] = [
  {
    num: "01",
    title: "Lead Times",
    paragraphs: [
      "All Copa + Glas pieces are handmade to order in our East London studio. No piece exists before it is commissioned. Standard collection pieces carry a lead time of 6 to 8 weeks from the confirmation of order and receipt of deposit.",
      "Bespoke commissions, architectural projects, and limited edition pieces may carry longer lead times depending on the scope and complexity of the work. An estimated lead time will be confirmed at the time of commission.",
      "We will endeavour to meet all agreed timelines and will provide advance notice in the event of any delay.",
      "Please note that delays in payment, in approving drawings or samples, or in providing required specifications may impact production and delivery timelines.",
    ],
  },
  {
    num: "02",
    title: "Payment Terms",
    paragraphs: [
      "A deposit of 50% of the total order value is required to confirm any commission and begin production. The remaining balance is due upon completion, prior to dispatch. No piece will leave the studio until payment has been received in full.",
      "Copa + Glas is VAT registered. All invoices are issued in GBP inclusive of VAT where applicable. Trade partners registered with our trade programme are invoiced ex-VAT with full VAT receipts provided.",
      "For large architectural or hospitality commissions, bespoke payment schedules may be agreed in writing prior to the commencement of work.",
    ],
  },
  {
    num: "03",
    title: "Delivery",
    subsections: [
      {
        title: "UK Delivery",
        paragraphs: [
          "All UK deliveries are carried out by our own in-house specialised delivery service and include delivery and installation to your specified space. Our delivery team will contact you directly to arrange a suitable delivery date and time. Standard delivery operates Monday to Friday.",
          "The customer is responsible for ensuring adequate access for safe delivery and installation. Doorway widths, stairwells, corridor dimensions, and any access restrictions must be assessed in advance. Copa + Glas cannot be held liable if delivery or installation is not possible due to access limitations. Dimensions and package weights are available on request.",
        ],
      },
      {
        title: "International Delivery",
        paragraphs: [
          "Copa + Glas ships internationally. All pieces are dispatched from our East London studio in protective packaging appropriate to the fragility of the work. International delivery is coordinated by the studio with specialist handling to your specified address.",
          "For international deliveries, installation services may vary by location. Please contact us at the point of enquiry to confirm what is available in your country. Transit times vary by destination. We will provide an estimate at the time of order confirmation.",
        ],
      },
      {
        title: "Duties & Customs",
        paragraphs: [
          "Listed prices do not include local import charges, duties, taxes, or customs clearance costs. These are the sole responsibility of the customer and should be confirmed locally before placing an order. Copa + Glas can provide general guidance for customers in the UK, EU, and USA upon request.",
        ],
      },
    ],
  },
  {
    num: "04",
    title: "Inspection & Damage",
    paragraphs: [
      "All pieces must be inspected carefully at the time of delivery. Any damage must be reported to our delivery team and Copa + Glas within 48 hours of receipt. We are unable to process claims or arrange replacements after this period.",
      "In the event of damage, clear photographs of both the packaging and the piece, including any damage, must be submitted to studio@copaandglas.com for assessment. Please retain all original packaging until the piece has been fully inspected.",
      "All deliveries are insured. Where damage has occurred in transit, we will manage the claim and arrange for repair or replacement as appropriate. Copa + Glas cannot accept responsibility for damage resulting from third-party installation or misuse after delivery.",
      "If delivery is signed for without inspection, Copa + Glas cannot accept liability for transit damage reported after the fact.",
    ],
  },
  {
    num: "05",
    title: "Returns",
    paragraphs: [
      "As every piece is made to order specifically for the client who commissioned it, Copa + Glas is unable to accept returns if an item is no longer wanted or was ordered in error. The made-to-order nature of our work means no piece has a secondary use once made to a specific specification.",
      "Returns are accepted only for pieces that are defective or damaged in transit, reported in accordance with our delivery and inspection terms above. In such cases, we will arrange for repair or replacement at no additional cost to the client.",
    ],
  },
  {
    num: "06",
    title: "Mirrors & Glass",
    paragraphs: [
      "All Copa + Glas mirrors use hand-cut and hand-ground silvered glass. Due to the nature of hand craftsmanship, each piece will carry slight tonal and surface variation. This is not a defect but an inherent characteristic of the making process and a mark of its authenticity.",
      "All mirrors are inspected prior to dispatch to ensure they meet our quality standards. Inspection is carried out viewing vertically from a distance of two metres under normal daylight, not under direct or artificial spotlighting. Faults not visible under these conditions are considered within tolerance.",
    ],
    lists: [
      {
        title: "Manufacturing Tolerances",
        items: [
          "Overall mirror size: plus or minus 3mm",
          "Hand-cut glass panel: plus or minus 1mm",
          "Copper section joins: minor tonal variation is inherent in the hand-forming process",
        ],
      },
      {
        title: "Defects Eligible for Repair or Replacement",
        items: [
          "Surface chips greater than 2mm",
          "Cracks or scratches visible from one metre",
          "Delamination of the mirror surface",
          "Broken copper joins or significant frame defects",
        ],
      },
    ],
  },
  {
    num: "07",
    title: "Copper & Materials",
    paragraphs: [
      "All copper used in Copa + Glas pieces is hand-formed and will naturally exhibit tonal variation. This is not a flaw. It is a hallmark of the hand-making process and the character of the material itself. Copper is a living material; it will age and develop its own patina over time, which we consider part of the beauty of the object.",
      "Where iridescent or art glass is used, as in our limited edition pieces and selected collaborative works, each panel is unique. No two pieces will be identical in colour or light behaviour. This is the nature of the material and cannot be guaranteed to match any reference sample.",
      "All pieces are intended for indoor use only unless explicitly specified otherwise. Care instructions are provided with every piece and should be followed carefully to preserve the finish. Metal cleaning products should never be used on copper as they will strip the surface.",
    ],
  },
  {
    num: "08",
    title: "Limited Editions",
    paragraphs: [
      "Copa + Glas limited editions are produced in runs of ten worldwide. Each piece is individually numbered, signed by our Master Craftsman, and supplied with a certificate of authenticity on cotton rag paper and a copper provenance plate fixed to the backing board.",
      "Once an edition is complete it will not be remade. Sold-out editions remain documented on the website as a permanent record of the work.",
      "Payment terms for limited editions follow our standard commission terms: 50% deposit to confirm, balance on completion. The edition number is assigned at the point of deposit confirmation.",
      "The certificate of authenticity and copper provenance plate are considered part of the work. Copa + Glas cannot be held responsible for the value or resale of limited edition pieces.",
    ],
  },
  {
    num: "09",
    title: "Bespoke Commissions",
    paragraphs: [
      "Bespoke commissions are undertaken on the basis of an agreed written brief. Detailed drawings and material samples are provided during the development process and must be approved by the client in writing before production begins. Copa + Glas cannot be held responsible for faults arising from specifications that have not been through a prototyping phase. We recommend a prototyping phase for all first-time bespoke commissions.",
      "By placing a bespoke order, the client confirms they hold all necessary rights to any design, reference, or intellectual property supplied to Copa + Glas in connection with the commission.",
      "Unless otherwise agreed in writing, Copa + Glas retains all intellectual property and reproduction rights in the designs, processes, and techniques used in the production of bespoke work.",
      "Bespoke commissions are non-cancellable once production has commenced. The deposit is non-refundable in all cases.",
    ],
  },
  {
    num: "10",
    title: "Care & Installation",
    paragraphs: [
      "Every Copa + Glas piece is supplied with care instructions. These should be read carefully and followed closely to preserve the finish and the integrity of the work over time.",
      "Our in-house specialised delivery service includes installation for UK deliveries. For international installations, please contact us at the point of enquiry to discuss what is available in your location.",
      "Where installation is carried out by a third party, Copa + Glas cannot accept responsibility for damage resulting from improper fitting or handling. The client is responsible for ensuring the wall or surface to which the piece is fixed is structurally suitable. Fixing specifications are available on request.",
    ],
  },
  {
    num: "11",
    title: "Trade & Specification",
    paragraphs: [
      "Copa + Glas operates a trade programme for interior designers, architects, and hospitality practices. Trade pricing is confirmed on approval and applies to all collection pieces. Trade partners are invoiced ex-VAT with full VAT receipts.",
      "All other terms, including lead times, payment structure, delivery, damage reporting, and returns, apply equally to trade orders. No exceptions are made to these terms without prior written agreement.",
    ],
    footer: (
      <p>
        To apply for a trade account, please visit our{" "}
        <Link
          href="/trade-specification"
          className="text-inherit underline underline-offset-[3px] decoration-black/25 hover:decoration-black/60 transition-colors duration-300"
        >
          Trade &amp; Specification
        </Link>{" "}
        page.
      </p>
    ),
  },
];

const BODY =
  "font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] md:text-base leading-[1.85] text-black/80";

function TermsParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={`space-y-5 ${BODY}`}>
      {paragraphs.map((text) => (
        <p key={text.slice(0, 48)}>{text}</p>
      ))}
    </div>
  );
}

export default function TermsPage() {
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
            <span className="opacity-90">Terms of Sale</span>
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
                Terms of Sale
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
                Every Copa + Glas piece is made to order by hand in our East London
                studio. Please read these terms carefully before placing an order. If
                you have any questions, we are always available at{" "}
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
                {TERMS_SECTIONS.map((section, i) => (
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
                      <TermsParagraphs paragraphs={section.paragraphs} />
                    )}

                    {section.subsections && (
                      <div className="space-y-8 mt-8">
                        {section.subsections.map((sub) => (
                          <div key={sub.title}>
                            <h3 className="text-[10px] tracking-[0.22em] uppercase font-medium text-black/55 mb-4">
                              {sub.title}
                            </h3>
                            <TermsParagraphs paragraphs={sub.paragraphs} />
                          </div>
                        ))}
                      </div>
                    )}

                    {section.lists && (
                      <div className="space-y-8 mt-8">
                        {section.lists.map((list) => (
                          <div key={list.title}>
                            <h3 className="text-[10px] tracking-[0.22em] uppercase font-medium text-black/55 mb-4">
                              {list.title}
                            </h3>
                            <ul
                              className={`
                                space-y-2.5 list-none pl-0 m-0
                                ${BODY}
                              `}
                            >
                              {list.items.map((item) => (
                                <li
                                  key={item}
                                  className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.72em] before:w-1 before:h-1 before:rounded-full before:bg-black/25"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
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
                  If you have any questions about these terms before placing an
                  order, please contact us at{" "}
                  <a
                    href="mailto:studio@copaandglas.com"
                    className="text-inherit underline underline-offset-[3px] decoration-black/25 hover:decoration-black/60 transition-colors duration-300"
                  >
                    studio@copaandglas.com
                  </a>
                  . We respond to all enquiries within 24 hours. These terms were
                  last updated May 2026.
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
