import { ImageResponse } from "next/og";

import { profile } from "@/config/profile";

export const alt = profile.siteTitle;
export const contentType = "image/png";
export const size = {
  height: 630,
  width: 1200,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "linear-gradient(135deg, rgb(248, 245, 238) 0%, rgb(235, 241, 236) 58%, rgb(229, 232, 237) 100%)",
          color: "#243042",
          display: "flex",
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxWidth: "780px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              opacity: 0.7,
            }}
          >
            个人主页
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontFamily: "serif",
                fontSize: 82,
                fontWeight: 600,
                lineHeight: 1.06,
              }}
            >
              {profile.name}
            </div>
            <div style={{ fontSize: 34, lineHeight: 1.35, opacity: 0.9 }}>{profile.role}</div>
            <div style={{ fontSize: 28, lineHeight: 1.5, opacity: 0.82 }}>{profile.hero.intro}</div>
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            background: "rgba(255,255,255,0.68)",
            border: "1px solid rgba(36,48,66,0.08)",
            borderRadius: 48,
            display: "flex",
            fontFamily: "serif",
            fontSize: 72,
            fontWeight: 600,
            height: 220,
            justifyContent: "center",
            width: 220,
          }}
        >
          {profile.initials}
        </div>
      </div>
    ),
    size,
  );
}
