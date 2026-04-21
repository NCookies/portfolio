import { ImageResponse } from "next/og";
import { meta, summaryPlain } from "@/lib/portfolio";

export const runtime = "edge";
export const alt = `${meta.name} · ${meta.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PRETENDARD_BOLD =
  "https://unpkg.com/pretendard@1.3.9/dist/web/static/woff2/Pretendard-Bold.woff2";

export default async function OpenGraphImage() {
  let fontData: ArrayBuffer;
  try {
    const res = await fetch(PRETENDARD_BOLD);
    if (!res.ok) throw new Error("font fetch failed");
    fontData = await res.arrayBuffer();
  } catch {
    fontData = new ArrayBuffer(0);
  }

  const description =
    summaryPlain.slice(0, 140) + (summaryPlain.length > 140 ? "…" : "");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          background: "linear-gradient(125deg, #0f172a 0%, #1e293b 38%, #3730a3 100%)",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 72,
            paddingRight: 48,
            paddingTop: 56,
            paddingBottom: 56,
            flex: 1,
            maxWidth: 760,
            fontFamily: fontData.byteLength ? "Pretendard" : "system-ui, sans-serif",
          }}
        >
          <div style={{ fontSize: 26, letterSpacing: "0.12em", opacity: 0.88, marginBottom: 16 }}>
            {meta.title}
          </div>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.15, marginBottom: 14 }}>
            {meta.name}
          </div>
          <div style={{ fontSize: 30, opacity: 0.92, marginBottom: 28 }}>{meta.role}</div>
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.5,
              opacity: 0.82,
              fontWeight: 400,
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            width: 340,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 56,
            opacity: 0.95,
          }}
        >
          <div
            style={{
              width: 260,
              height: 260,
              borderRadius: 24,
              background: "linear-gradient(180deg, rgba(99,102,241,0.35) 0%, rgba(15,23,42,0.6) 100%)",
              border: "2px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 88,
              fontWeight: 700,
            }}
          >
            {(meta.name.trim()[0] ?? "P").toUpperCase()}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts:
        fontData.byteLength > 0
          ? [{ name: "Pretendard", data: fontData, style: "normal", weight: 700 }]
          : [],
    },
  );
}
