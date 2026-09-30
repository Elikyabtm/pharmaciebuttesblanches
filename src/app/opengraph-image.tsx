import { ImageResponse } from "next/og";
import { pharmacy } from "@/config/pharmacy";

export const alt = pharmacy.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image Open Graph par défaut (générée), aux couleurs de la pharmacie. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#FAF7F0",
          color: "#15301F",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", position: "relative", width: 72, height: 72 }}>
            <div style={{ position: "absolute", left: 27, top: 5, width: 18, height: 28, borderRadius: 9, background: "#8EB55C" }} />
            <div style={{ position: "absolute", left: 27, top: 39, width: 18, height: 28, borderRadius: 9, background: "#B7D092" }} />
            <div style={{ position: "absolute", left: 5, top: 27, width: 28, height: 18, borderRadius: 9, background: "#B7D092" }} />
            <div style={{ position: "absolute", left: 39, top: 27, width: 28, height: 18, borderRadius: 9, background: "#8EB55C" }} />
          </div>
          <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#4A7328", fontWeight: 700 }}>
            Pharmacie
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05 }}>des Buttes Blanches</div>
          <div style={{ fontSize: 32, marginTop: 24, color: "#5A6158" }}>
            {`Votre pharmacie de proximité à ${pharmacy.address.city}`}
          </div>
        </div>
        <div style={{ display: "flex", height: 10, width: 220, borderRadius: 5, background: "#8EB55C" }} />
      </div>
    ),
    size,
  );
}
