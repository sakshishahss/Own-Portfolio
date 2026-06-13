import { useState, useEffect, useRef } from "react";

// ── Slide-up hook ─────────────────────────────────────────────────────────────
function useSlideUp(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
}

function slideStyle(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(60px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };
}

// ── Project data ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "TMDB Movie App",
    tags: ["React", "Axios", "Development"],
    preview: "tmdb",
  },
  {
    id: 2,
    title: "Live Weather Dashboard",
    tags: ["Web-design", "React", "Fetch API"],
    preview: "weather",
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    tags: ["Web-design", "HTML", "CSS"],
    preview: "portfolio",
  },
];

// ── Preview components ────────────────────────────────────────────────────────
function TMDBPreview() {
  const row1 = [
    "linear-gradient(160deg,#1a1a2e,#16213e)",
    "linear-gradient(160deg,#2c1810,#4a2518)",
    "linear-gradient(160deg,#0d2137,#1a4a6b)",
    "linear-gradient(160deg,#1a2a1a,#2d4a2d)",
    "linear-gradient(160deg,#2a1a2a,#4a2a4a)",
    "linear-gradient(160deg,#1c1c10,#3a3a1a)",
    "linear-gradient(160deg,#1a1010,#3a1a1a)",
  ];
  const row2 = [
    "linear-gradient(160deg,#2d4a1e,#1a3a0d)",
    "linear-gradient(160deg,#1a1010,#3a1a1a)",
    "linear-gradient(160deg,#0a0a0a,#1a1a1a)",
    "linear-gradient(160deg,#0d1a2e,#1a2a4a)",
    "linear-gradient(160deg,#1a0d0d,#2e1010)",
    "linear-gradient(160deg,#1a1a2e,#16213e)",
  ];

  return (
    <div style={{ background: "#0d1117", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#0d253f", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 11, fontWeight: 600 }}>
          <div style={{ width: 16, height: 16, background: "#01b4e4", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 700 }}>M</div>
          MovieApp
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["Home", "Popular", "ProductionHouse"].map((link, i) => (
            <span key={link} style={{ fontSize: 9, color: i === 0 ? "#01b4e4" : "#aaa" }}>{link}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "10px 12px 6px", overflow: "hidden", flexShrink: 0 }}>
        {row1.map((bg, i) => (
          <div key={i} style={{ flexShrink: 0, width: 38, height: 56, borderRadius: 4, background: bg }} />
        ))}
      </div>
      <div style={{ padding: "4px 12px 2px", fontSize: 9, color: "#fff", fontWeight: 600 }}>🔥 TopRated</div>
      <div style={{ display: "flex", gap: 6, padding: "4px 12px 8px", overflow: "hidden" }}>
        {row2.map((bg, i) => (
          <div key={i} style={{ flexShrink: 0, width: 42, height: 62, borderRadius: 4, background: bg }} />
        ))}
      </div>
    </div>
  );
}

function WeatherPreview() {
  return (
    <div style={{ background: "linear-gradient(135deg, #5b8dee 0%, #6c63ff 100%)", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "rgba(80,60,200,0.65)", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 11, fontWeight: 500 }}>
          ☀ Weather App
        </div>
        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 9 }}>🏠 Home</span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: "14px 20px", width: 190, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#5b4fcf" }}>Weather App</div>
          <div style={{ fontSize: 7, color: "#999" }}>Enter a city to get the weather</div>
          <input readOnly placeholder="e.g. Ahmedabad, Mumbai..." style={{ width: "100%", border: "1px solid #ddd", borderRadius: 20, padding: "4px 10px", fontSize: 7, color: "#aaa", outline: "none" }} />
          <div style={{ width: "100%", background: "#6c63ff", borderRadius: 20, padding: "5px 0", fontSize: 8, color: "#fff", textAlign: "center", fontWeight: 500 }}>🔍 Search</div>
        </div>
      </div>
    </div>
  );
}

function PortfolioPreview() {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Tailwind"];
  return (
    <div style={{ background: "#f3f3f3", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#111", padding: "7px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>My Portfolio</span>
        <div style={{ display: "flex", gap: 8 }}>
          {["Home", "About", "Skills", "Projects", "Contact"].map((l) => (
            <span key={l} style={{ color: "#aaa", fontSize: 7.5 }}>{l}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, padding: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Hi, I'm Sakshi Shah 👋</div>
        <div style={{ fontSize: 8, color: "#555" }}>Frontend Developer 🎧</div>
      </div>
      <div style={{ padding: "0 14px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#111" }}>About Me</div>
          <div style={{ fontSize: 7, color: "#555" }}>I am learning React and building projects.</div>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#111" }}>Skills</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 2 }}>
            {skills.map((s) => (
              <span key={s} style={{ background: "#2b7fff", color: "#fff", fontSize: 6.5, padding: "2px 7px", borderRadius: 3, fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#111" }}>Projects</div>
          <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
            <div style={{ height: 14, flex: 1, background: "#e0e0e0", borderRadius: 3, border: "1px solid #ccc" }} />
            <div style={{ height: 14, flex: 1, background: "#e0e0e0", borderRadius: 3, border: "1px solid #ccc" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const previewMap = {
  tmdb: TMDBPreview,
  weather: WeatherPreview,
  portfolio: PortfolioPreview,
};

// ── ProjectCard with slide-up ─────────────────────────────────────────────────
function ProjectCard({ title, tags, preview, index }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useSlideUp(index * 150);
  const Preview = previewMap[preview];

  return (
    <div ref={ref} style={slideStyle(visible, 0)}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#1e1e2e",
          borderRadius: 14,
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.2s, border-color 0.2s",
        }}
      >
        <div style={{ width: "100%", height: 220, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <Preview />
        </div>
        <div style={{ padding: "18px 20px 22px" }}>
          <p style={{ color: "#fff", fontSize: 20, fontWeight: 500, marginBottom: 14, lineHeight: 1.3 }}>
            {title}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 8,
                  padding: "5px 13px",
                  fontSize: 15,
                  color: "#ccc",
                  marginBottom: "0px",
                  marginTop: "30px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Work component ────────────────────────────────────────────────────────────
function Work() {
  const { ref: headingRef, visible: headingVisible } = useSlideUp(0);

  return (
    <div
      id="work"
      style={{
        background: "#0d0d10",
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Animated heading */}
      <h1
        ref={headingRef}
        style={{
          color: "#fff",
          fontSize: 50,
          fontWeight: 600,
          textAlign: "center",
          marginBottom: 80,
          marginRight: 1250,
          padding: 10,
          ...slideStyle(headingVisible, 0),
        }}
      >
        My portfolio highlight
      </h1>

      {/* Cards — each slides up with stagger */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
          maxWidth: 1100,
          margin: "0 auto",
          marginBottom: "0px",
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} {...project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Work;
