import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "AirFixPro — AC repair, servicing and installation in Karachi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function logoDataUrl() {
  "use cache";
  const logo = await readFile(join(process.cwd(), "public", site.logo));
  return `data:image/png;base64,${logo.toString("base64")}`;
}

export default async function OpengraphImage() {
  const logoSrc = await logoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #061F40 0%, #0B2B55 55%, #0789D1 130%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", width: 110, height: 110, borderRadius: 999, background: "white", alignItems: "center", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={96} height={96} alt="" />
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 800 }}>
            AirFix<span style={{ color: "#DDF3FF" }}>Pro</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Stay Cool. Live Comfortably.</div>
          <div style={{ fontSize: 32, color: "#DDF3FF" }}>AC repair, cleaning, installation & maintenance in Karachi</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#EAF7FF" }}>
          <span>{site.tagline}</span>
          <span>Call / WhatsApp {site.phone.display}</span>
        </div>
      </div>
    ),
    size,
  );
}
