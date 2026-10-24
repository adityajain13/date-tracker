import { useState } from "react";
import { pastDates, futureDates } from "./dates";

const vibeColors = {
  "first sparks": "#f4a261",
  "playful": "#48cae4",
  "adventurous": "#8ecae6",
  "easy & warm": "#e9c46a",
  "cozy": "#f9c74f",
  "the one": "#ff6b9d",
  "golden": "#ffd60a",
  "silly & sweet": "#c77dff",
  "spontaneous": "#52b788",
  "creative": "#a8dadc",
  "meaningful": "#b5838d",
};

export default function DateTracker() {
  const [checked, setChecked] = useState({});
  const [hovered, setHovered] = useState(null);
  const [hoveredPast, setHoveredPast] = useState(null);

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#f0ece0",
      padding: "0 0 80px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient background blobs */}
      <div style={{
        position: "fixed", top: "-120px", right: "-100px",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-100px", left: "-80px",
        width: "400px", height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(72,202,228,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: "64px 24px 40px",
        position: "relative",
      }}>
        <div style={{
          fontSize: "11px",
          letterSpacing: "5px",
          textTransform: "uppercase",
          color: "#ff6b9d",
          marginBottom: "16px",
          opacity: 0.9,
        }}>
          our little story
        </div>
        <h1 style={{
          fontSize: "clamp(36px, 8vw, 72px)",
          fontWeight: "normal",
          margin: "0 0 8px 0",
          lineHeight: 1.1,
          letterSpacing: "-1px",
          color: "#f0ece0",
        }}>
          Date Log
        </h1>
        <p style={{
          color: "#888", fontSize: "15px", margin: "12px 0 0",
          fontStyle: "italic",
          letterSpacing: "0.5px",
        }}>
          {pastDates.length} dates down — more to come ♡
        </p>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px" }}>

        {/* Past Dates */}
        <section>
          <div style={{
            display: "flex", alignItems: "center", gap: "16px",
            marginBottom: "24px",
          }}>
            <div style={{
              height: "1px", flex: 1,
              background: "linear-gradient(to right, transparent, #333)",
            }} />
            <span style={{
              fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase",
              color: "#666",
            }}>Chapters</span>
            <div style={{
              height: "1px", flex: 1,
              background: "linear-gradient(to left, transparent, #333)",
            }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {pastDates.map((d, i) => {
              const accent = vibeColors[d.vibe] || "#f0ece0";
              const isHov = hoveredPast === d.num;
              return (
                <div
                  key={d.num}
                  onMouseEnter={() => setHoveredPast(d.num)}
                  onMouseLeave={() => setHoveredPast(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    background: isHov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isHov ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
                    transition: "all 0.2s ease",
                    cursor: "default",
                  }}
                >
                  {/* Number */}
                  <div style={{
                    width: "28px", height: "28px",
                    borderRadius: "50%",
                    background: `${accent}18`,
                    border: `1px solid ${accent}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px",
                    color: accent,
                    flexShrink: 0,
                    fontFamily: "monospace",
                    letterSpacing: "0",
                  }}>
                    {d.num}
                  </div>

                  {/* Emoji */}
                  <span style={{ fontSize: "20px", flexShrink: 0 }}>{d.emoji}</span>

                  {/* Title */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: "15px",
                      color: isHov ? "#f0ece0" : "#ccc",
                      transition: "color 0.2s",
                      lineHeight: 1.3,
                    }}>
                      {d.title}
                    </div>
                  </div>

                  {/* Vibe tag */}
                  <div style={{
                    fontSize: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: accent,
                    opacity: isHov ? 1 : 0.5,
                    transition: "opacity 0.2s",
                    flexShrink: 0,
                    display: window.innerWidth < 400 ? "none" : "block",
                  }}>
                    {d.vibe}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div style={{
          margin: "48px 0",
          display: "flex", alignItems: "center", gap: "16px",
        }}>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, transparent, #333)" }} />
          <span style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#666" }}>
            Up Next
          </span>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to left, transparent, #333)" }} />
        </div>

        {/* Progress */}
        {doneCount > 0 && (
          <div style={{
            marginBottom: "24px",
            padding: "12px 20px",
            borderRadius: "8px",
            background: "rgba(255,107,157,0.06)",
            border: "1px solid rgba(255,107,157,0.15)",
            fontSize: "13px",
            color: "#ff6b9d",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}>
            {doneCount} of {futureDates.length} checked off ♡
          </div>
        )}

        {/* Future Dates */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {futureDates.map((d) => {
            const done = !!checked[d.id];
            const isHov = hovered === d.id;
            return (
              <div
                key={d.id}
                onClick={() => toggle(d.id)}
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "14px 20px",
                  borderRadius: "10px",
                  background: done
                    ? "rgba(255,107,157,0.06)"
                    : isHov
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.015)",
                  border: `1px solid ${done ? "rgba(255,107,157,0.2)" : isHov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  userSelect: "none",
                }}
              >
                {/* Checkbox */}
                <div style={{
                  width: "20px", height: "20px",
                  borderRadius: "50%",
                  border: `1.5px solid ${done ? "#ff6b9d" : "#444"}`,
                  background: done ? "#ff6b9d" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.18s ease",
                  fontSize: "11px",
                }}>
                  {done && <span style={{ color: "#0d0d0d" }}>✓</span>}
                </div>

                {/* Emoji */}
                <span style={{
                  fontSize: "18px", flexShrink: 0,
                  opacity: done ? 0.5 : 1,
                  transition: "opacity 0.18s",
                }}>
                  {d.emoji}
                </span>

                {/* Text */}
                <span style={{
                  fontSize: "15px",
                  color: done ? "#555" : isHov ? "#f0ece0" : "#aaa",
                  textDecoration: done ? "line-through" : "none",
                  transition: "all 0.18s ease",
                  letterSpacing: "0.2px",
                }}>
                  {d.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: "56px",
          textAlign: "center",
          fontSize: "13px",
          color: "#444",
          fontStyle: "italic",
          letterSpacing: "0.5px",
          lineHeight: 1.8,
        }}>
          tap the future dates to check them off<br />
          <span style={{ color: "#ff6b9d", opacity: 0.6 }}>♡</span>
        </div>

      </div>
    </div>
  );
}
