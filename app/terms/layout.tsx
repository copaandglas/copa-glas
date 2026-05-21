import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Sale | Copa + Glas Studio",
  description:
    "Terms of sale for Copa + Glas handmade mirrors, lighting, and bespoke commissions. Lead times, payment, delivery, inspection, and returns.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
