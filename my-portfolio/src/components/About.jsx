import { useEffect, useRef, useState } from 'react';
import '../App.css';
import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiReactbootstrap } from 'react-icons/si';

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
    transform: visible ? 'translateY(0px)' : 'translateY(60px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };
}

// ── Skills data ───────────────────────────────────────────────────────────────
const skills = [
  { icon: <FaHtml5 />,          name: 'HTML',            desc: 'Website Structure',   color: '#e34f26', bg: '#2a1a10' },
  { icon: <FaCss3Alt />,        name: 'CSS',             desc: 'User Interface',       color: '#264de4', bg: '#101a2a' },
  { icon: <SiJavascript />,     name: 'JavaScript',      desc: 'Interaction',          color: '#f7df1e', bg: '#2a2a10' },
  { icon: <FaReact />,          name: 'React',           desc: 'Framework',            color: '#61dafb', bg: '#0a2a30' },
  { icon: <FaBootstrap />,      name: 'Bootstrap',       desc: 'CSS Framework',        color: '#7952b3', bg: '#1a1030' },
  { icon: <SiTailwindcss />,    name: 'Tailwind',        desc: 'Bootstrap Framework',  color: '#38bdf8', bg: '#0a2030' },
  { icon: <SiReactbootstrap />, name: 'React Bootstrap', desc: 'Design Tool',          color: '#61dafb', bg: '#0a1a2a' },
];

// ── SkillCard with its own observer ──────────────────────────────────────────
function SkillCard({ skill, index }) {
  const { ref, visible } = useSlideUp(index * 100);

  return (
    <div
      ref={ref}
      style={slideStyle(visible, 0)}
      className="skill-card"
    >
      <div
        className="skill-icon"
        style={{ color: skill.color, background: skill.bg }}
      >
        {skill.icon}
      </div>
      <div className="skill-info">
        <h4 className="skill-name">{skill.name}</h4>
        <p className="skill-desc">{skill.desc}</p>
      </div>
    </div>
  );
}

// ── About component ───────────────────────────────────────────────────────────
function About() {
  const { ref: heading1Ref, visible: heading1Visible } = useSlideUp(0);
  const { ref: textRef,     visible: textVisible     } = useSlideUp(150);
  const { ref: heading2Ref, visible: heading2Visible } = useSlideUp(0);
  const { ref: subRef,      visible: subVisible      } = useSlideUp(100);

  return (
    <section id="about">
      <div>

        {/* About Me heading */}
        <h1
          ref={heading1Ref}
          style={slideStyle(heading1Visible, 0)}
          className="para"
        >
          About Me
        </h1>

        {/* About text */}
        <div className="about-grid">
          <p
            ref={textRef}
            style={slideStyle(textVisible, 0)}
            className="about-text"
          >
            Hi, I'm Sakshi Shah, a passionate and dedicated web developer
            specializing in ReactJS. Currently, I'm looking for a Junior level
            position, where I'm honing my skills and expanding my knowledge in
            software development and cutting-edge web technologies.

            <p>
              With a strong interest in frontend development, I love creating
              interactive, user-friendly, and responsive web applications.
            </p>

            <p>
              My expertise in ReactJS and enthusiasm for learning new
              technologies drive me to continuously improve and deliver
              high-quality work. If you're looking for someone with a keen eye
              for detail, a passion for clean code, and a dedication to creating
              great user experiences, let's connect!
            </p>
          </p>
        </div>

        {/* Essential Tools heading */}
        <h1
          ref={heading2Ref}
          style={slideStyle(heading2Visible, 0)}
          className="para"
        >
          Essential Tools I use
        </h1>
        <br />

        {/* Subtitle */}
        <p
          ref={subRef}
          style={slideStyle(subVisible, 0)}
          className="para2"
        >
          Discover the powerful tools and technologies I use to create <br />
          exceptional, high-performing websites &amp; applications.
        </p>

        {/* Skill cards — each animates individually with stagger */}
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default About;
