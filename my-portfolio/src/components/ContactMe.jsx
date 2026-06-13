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

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%",
  background: "#1e1e2e",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: 14,
  color: "#fff",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

const labelStyle = {
  display: "block",
  color: "#ccc",
  fontSize: 14,
  fontWeight: 500,
  marginBottom: "8px",
};

const iconBtnStyle = {
  width: "44px",
  height: "44px",
  background: "#1e1e2e",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textDecoration: "none",
  transition: "background 0.2s, border-color 0.2s",
};

const iconBtnHover = {
  ...iconBtnStyle,
  background: "#2a2a3e",
  borderColor: "rgba(255,255,255,0.25)",
};

function ContactMe() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // slide-up refs
  const { ref: headingRef,  visible: headingVisible  } = useSlideUp(0);
  const { ref: paraRef,     visible: paraVisible     } = useSlideUp(150);
  const { ref: iconsRef,    visible: iconsVisible    } = useSlideUp(250);
  const { ref: formRef,     visible: formVisible     } = useSlideUp(200);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      id="contact"
      style={{
        background: "#0d0d10",
        minHeight: "100vh",
        marginTop: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "60px",
          maxWidth: "1000px",
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* ── Left side ── */}
        <div>
          <h1
            ref={headingRef}
            style={{
              color: "#fff",
              fontSize: "clamp(32px, 4vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "20px",
              ...slideStyle(headingVisible, 0),
            }}
          >
            Contact <span style={{ color: "#aaa" }}>me</span>{" "}
            <span style={{ color: "#aaa" }}>for</span>
            <br />
            collaboration
          </h1>

          <p
            ref={paraRef}
            style={{
              color: "#888",
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: "40px",
              ...slideStyle(paraVisible, 0),
            }}
          >
            Reach out today to discuss your project needs and start collaborating on something amazing!
          </p>

          {/* Social icons */}
          <div
            ref={iconsRef}
            style={{
              display: "flex",
              gap: "12px",
              ...slideStyle(iconsVisible, 0),
            }}
          >
            {/* GitHub */}
            <a
              href="https://github.com/sakshishahss"
              target="_blank"
              rel="noreferrer"
              style={iconBtnStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, iconBtnHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, iconBtnStyle)}
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#aaa">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/sakshishah-dev"
              target="_blank"
              rel="noreferrer"
              style={iconBtnStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, iconBtnHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, iconBtnStyle)}
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#aaa">
                <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.989V9h3.101v1.561h.044c.432-.818 1.487-1.681 3.062-1.681 3.275 0 3.879 2.156 3.879 4.961v6.611zM5.337 7.433a1.8 1.8 0 1 1 0-3.601 1.8 1.8 0 0 1 0 3.601zM6.961 20.452H3.71V9h3.251v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Right side: Form ── */}
        <div
          ref={formRef}
          style={slideStyle(formVisible, 0)}
        >
          {/* Name + Email row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Sakshi Shah"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#2a9db5")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="connectsakshi211@gmail.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#2a9db5")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
          </div>

          {/* Message */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Hi!"
              rows={6}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "140px",
                lineHeight: 1.6,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2a9db5")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "16px",
              background: submitted ? "#1e7a3a" : "#2a9db5",
              color: "#fff",
              fontSize: 16,
              fontWeight: 500,
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.1s",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => { if (!submitted) e.target.style.background = "#238aA0"; }}
            onMouseLeave={(e) => { if (!submitted) e.target.style.background = "#2a9db5"; }}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            {submitted ? "✓ Message sent!" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;
