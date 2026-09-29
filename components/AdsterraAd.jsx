"use client";

import Script from "next/script";

export default function AdsterraAd() {
  return (
    <div
      id="adsterra-ad"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "30px 0",
      }}
    >
      <Script
        async
        data-cfasync="false"
        src="https://pl31569483.profitableratecpmnetwork.com/51d1f81d6e1134a3eb485f0a1ca0078b/invoke.js"
      />

      <div id="container-51d1f81d6e1134a3eb485f0a1ca0078b"></div>
    </div>
  );
}