import { useEffect, useRef, useState } from 'react';
import '../App.css';
import avatarImg from '../assets/avatarr.png.png';

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

function Hero() {
  const { ref: badgeRef,  visible: badgeVisible  } = useSlideUp(0);
  const { ref: titleRef,  visible: titleVisible  } = useSlideUp(150);
  const { ref: btnsRef,   visible: btnsVisible   } = useSlideUp(300);
  const { ref: avatarRef, visible: avatarVisible } = useSlideUp(200);

  return (
    <section id="home" className="hero">

      <div className="hero-left">

        <div ref={badgeRef} style={slideStyle(badgeVisible, 0)} className="status-badge">
          <span className="status-dot"></span>
          Available for Work
        </div>

        <h1 ref={titleRef} style={slideStyle(titleVisible, 0)} className="hero-title">
          Building scalable <br />
          <span className="hero-highlight">Modern Websites</span> <br />
          for The Future
        </h1>

        <div ref={btnsRef} style={slideStyle(btnsVisible, 0)} className="hero-btns">
          <a
            href="/Sakshi_Shah_CV.pdf"
            download="Sakshi_Shah_CV.pdf"
            className="btn-white"
          >
            Download CV
          </a>
        </div>

      </div>

      <div className="hero-right">
        <div ref={avatarRef} style={slideStyle(avatarVisible, 0)} className="avtar-card">
          <img
            src={avatarImg}
            alt="avatar"
            className="avatar-img"
          />
        </div>
      </div>

    </section>
  );
}

export default Hero;
