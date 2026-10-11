import { ImageResponse } from "next/og";

export const alt = "USA Sevens Stats — USA Rugby Sevens profiles, records, and stories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "76px",
          background: "#ffffff",
          color: "#111827",
          border: "18px solid #f3f4f6",
        }}
      >
        <div style={{ display: "flex", color: "#1d4ed8", fontSize: 28, fontWeight: 700 }}>
          INDEPENDENT RUGBY SEVENS ARCHIVE
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 76, fontWeight: 800, letterSpacing: -3 }}>
          USA Sevens Stats
        </div>
        <div style={{ display: "flex", marginTop: 24, color: "#4b5563", fontSize: 34 }}>
          Player profiles · Olympic records · Rugby stories
        </div>
        <div style={{ display: "flex", marginTop: 54, width: 1048, height: 8, background: "#f59e0b" }} />
      </div>
    ),
    size,
  );
}
