"use client";

import { useEffect } from "react";
import { rememberReferral } from "@/app/lib/referral";

export default function ReferralMarker({ referral }: { referral: string }) {
  useEffect(() => {
    rememberReferral(referral);
  }, [referral]);

  return null;
}
