import { useState, useEffect, useRef } from "react";

const C = {
  ink: "#0d0d14", ink2: "#1a1a2e", ink3: "#12122a",
  red: "#e8192c", redDim: "#a81020",
  gold: "#f5c842", goldDim: "#c49a1a",
  cream: "#faf6ef", cream2: "rgba(250,246,239,0.75)",
  gray: "#9896b0", panelBorder: "#2e2e4a", white: "#ffffff",
};

/* ─── IMAGES ─── */
const IMG = {
  hero1: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=700&q=85",
  hero2: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=85",
  hero3: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=500&q=85",
  about1: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=700&q=85",
  about2: "httttps://images.unsplash.com/photo-1618944913640-d9f68c44b46a?w=500&q=85",
  manga2: "ps://images.unsplash.com/photo-1616627451515-cbc80e5ece53?w=500&q=85",
  manga1: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=500&q=85",
  manga3: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=85",
  manga4: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=85",
  manga5: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=85",
  manga6: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=500&q=85",
  creator1: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=85",
  creator2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=85",
  creator3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=85",
  team1: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&q=85",
  team2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85",
  team3: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85",
  contactBg: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=1400&q=80",
  studioBg: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&q=80",
};

/* ─── GLOBAL STYLES ─── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 17px; }
  body { font-family: 'Inter', sans-serif; background: #0d0d14; color: #faf6ef; overflow-x: hidden; line-height: 1.7; }

  .mv-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .mv-reveal.visible { opacity: 1; transform: none; }

  .mv-panel img { transition: transform 0.55s ease; }
  .mv-panel:hover img { transform: scale(1.06); }

  .mv-svc-card { position: relative; overflow: hidden; transition: background 0.3s; cursor: default; }
  .mv-svc-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #e8192c; transform: scaleX(0); transform-origin: left; transition: transform 0.35s; }
  .mv-svc-card:hover::before { transform: scaleX(1); }
  .mv-svc-card:hover { background: #1a1a2e !important; }

  .mv-mc { transition: transform 0.25s, border-color 0.25s; }
  .mv-mc:hover { transform: translateY(-8px); border-color: #e8192c !important; }
  .mv-mc img { transition: transform 0.4s ease; }
  .mv-mc:hover img { transform: scale(1.06); }

  .mv-cc:hover { border-color: #f5c842 !important; }
  .mv-cc:hover img { border-color: #f5c842 !important; }

  .mv-btn-p:hover { background: #a81020 !important; transform: translateY(-2px); }
  .mv-btn-o:hover { border-color: #f5c842 !important; color: #f5c842 !important; }
  .mv-btn-g:hover { background: #c49a1a !important; }

  .mv-step:hover .mv-dot { background: #e8192c !important; border-color: #e8192c !important; color: #fff !important; }

  .mv-nl:hover { color: #f5c842 !important; }
  .mv-fl:hover { color: #faf6ef !important; }
  .mv-sl:hover { color: #f5c842 !important; }

  .mv-ci:hover { background: rgba(245,200,66,0.08) !important; border-color: #f5c842 !important; }

  .mv-speed::after {
    content: ''; position: absolute; top: 50%; left: 50%;
    width: 300%; height: 300%; transform: translate(-50%, -50%);
    background: repeating-conic-gradient(rgba(255,255,255,0.8) 0deg, transparent 0.5deg, transparent 6deg);
  }

  .mv-inp:focus { border-color: #f5c842 !important; outline: none; }
  .mv-inp::placeholder { color: #7a7890; }
  .mv-ta:focus { border-color: #f5c842 !important; outline: none; }
  .mv-ta::placeholder { color: #7a7890; }
  .mv-sel:focus { border-color: #f5c842 !important; outline: none; }

  .mv-contact-tab.active { background: #e8192c !important; color: #fff !important; border-color: #e8192c !important; }

  @media (max-width: 980px) {
    html { font-size: 15px; }
    .mv-hg { grid-template-columns: 1fr !important; padding-top: 110px !important; }
    .mv-hv { height: 280px !important; }
    .mv-ag { grid-template-columns: 1fr !important; }
    .mv-as { height: 280px !important; }
    .mv-mg { grid-template-columns: repeat(2, 1fr) !important; }
    .mv-mf { grid-row: span 1 !important; }
    .mv-mf img { aspect-ratio: 3/4 !important; }
    .mv-cg { grid-template-columns: 1fr !important; }
    .mv-steps { flex-direction: column !important; gap: 2rem !important; }
    .mv-stl { display: none !important; }
    .mv-ft { grid-template-columns: 1fr 1fr !important; }
    .mv-fb { flex-direction: column !important; gap: 1rem !important; text-align: center !important; }
    .mv-nd { display: none !important; }
    .mv-sg { grid-template-columns: repeat(2, 1fr) !important; }
    .mv-ctg { grid-template-columns: 1fr !important; }
    .mv-cform { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 560px) {
    html { font-size: 14px; }
    .mv-mg { grid-template-columns: 1fr !important; }
    .mv-sg { grid-template-columns: 1fr !important; }
    .mv-sb { gap: 1.5rem !important; }
    .mv-ss { display: none !important; }
    .mv-ft { grid-template-columns: 1fr !important; }
  }
`;

/* ─── HOOKS ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, style, className = "" }) {
  const ref = useReveal();
  return <div ref={ref} className={`mv-reveal ${className}`} style={style}>{children}</div>;
}

function Eye({ children, center = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: C.red, marginBottom: "0.9rem", justifyContent: center ? "center" : "flex-start" }}>
      {center && <span style={{ flex: 1, height: 1, background: "rgba(232,25,44,0.3)", maxWidth: 36 }} />}
      {children}
      <span style={{ flex: 1, height: 1, background: "rgba(232,25,44,0.3)", maxWidth: 36 }} />
    </div>
  );
}

function H2({ children, center = true }) {
  return <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,3.8vw,3rem)", color: C.white, textAlign: center ? "center" : "left", marginBottom: "1rem", lineHeight: 1.15 }}>{children}</h2>;
}

function Sub({ children, center = true }) {
  return <p style={{ textAlign: center ? "center" : "left", maxWidth: 580, margin: center ? "0 auto 3.5rem" : "0 0 2.5rem", color: "rgba(250,246,239,0.65)", fontSize: "1.05rem", lineHeight: 1.8 }}>{children}</p>;
}

/* ─── NAV ─── */
function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 30); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5vw", height: 72, background: sc ? "rgba(13,13,20,0.98)" : "rgba(13,13,20,0.88)", backdropFilter: "blur(16px)", borderBottom: `1px solid rgba(245,200,66,${sc ? 0.22 : 0.1})`, transition: "all 0.3s" }}>
      <a href="#" style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", color: C.gold, letterSpacing: "0.05em", textDecoration: "none" }}>
        Manga<span style={{ color: C.red }}>Verse</span>
      </a>
      <ul className="mv-nd" style={{ display: "flex", gap: "2.2rem", listStyle: "none" }}>
        {["About", "Services", "Titles", "Creators", "Contact"].map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`} className="mv-nl" style={{ fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.08em", color: C.cream, textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}>{l}</a></li>
        ))}
        <li><a href="#contact" style={{ background: C.red, color: "#fff", padding: "0.5rem 1.35rem", borderRadius: 3, fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase" }}>Submit Work</a></li>
      </ul>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="mv-hg" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "100px 5vw 60px", gap: "4rem", position: "relative", overflow: "hidden", background: C.ink }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 75% at 85% 50%, rgba(232,25,44,0.13) 0%, transparent 70%), radial-gradient(ellipse 45% 65% at 15% 80%, rgba(245,200,66,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, marginBottom: "1.75rem" }}>
          <span style={{ display: "inline-block", width: 32, height: 2, background: C.red }} />
          Asia's Premier Manga & Anime Publisher
        </div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.8rem,5.5vw,4.6rem)", lineHeight: 1.08, color: C.white, marginBottom: "1.6rem" }}>
          Where <span style={{ color: C.gold }}>Stories</span><br />
          Become <span style={{ color: C.red }}>Legends</span>
        </h1>
        <p style={{ fontSize: "1.15rem", lineHeight: 1.82, color: "rgba(250,246,239,0.7)", maxWidth: 460, marginBottom: "2.75rem" }}>
          MangaVerse discovers, develops, and publishes the next generation of manga creators and anime studios — connecting bold storytellers with global audiences across 42 countries.
        </p>
        <div style={{ display: "flex", gap: "1.1rem", flexWrap: "wrap" }}>
          <a href="#contact" className="mv-btn-p" style={{ background: C.red, color: "#fff", padding: "1rem 2.2rem", borderRadius: 3, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", transition: "background 0.2s, transform 0.15s", display: "inline-flex", alignItems: "center", gap: 8 }}>Submit Your Manga ↗</a>
          <a href="#services" className="mv-btn-o" style={{ background: "transparent", color: C.cream, padding: "1rem 2.2rem", borderRadius: 3, border: "1.5px solid rgba(250,246,239,0.3)", fontSize: "1rem", fontWeight: 500, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", transition: "border-color 0.2s, color 0.2s" }}>Our Services</a>
        </div>
      </div>

      <div className="mv-hv" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 12, height: 530 }}>
        <div className="mv-panel" style={{ gridColumn: "1/2", gridRow: "1/3", border: `2px solid ${C.panelBorder}`, overflow: "hidden", position: "relative", background: C.ink2 }}>
          <div className="mv-speed" style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.09, overflow: "hidden", pointerEvents: "none" }} />
          <img src={IMG.hero1} alt="Manga art" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(232,25,44,0.15) 0%, transparent 50%)", pointerEvents: "none" }} />
          <span style={{ position: "absolute", bottom: 14, left: 14, background: C.red, color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px" }}>Featured</span>
        </div>
        <div className="mv-panel" style={{ border: `2px solid ${C.panelBorder}`, overflow: "hidden", background: C.ink2 }}>
          <img src={IMG.hero2} alt="Anime" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div className="mv-panel" style={{ border: `2px solid ${C.panelBorder}`, overflow: "hidden", background: C.ink2, position: "relative" }}>
          <img src={IMG.hero3} alt="Manga drawing" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <span style={{ position: "absolute", bottom: 14, left: 14, background: C.gold, color: C.ink, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px" }}>New</span>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ─── */
function Stats() {
  const data = [["340+","Published\nTitles"],["1,200+","Creator\nPartners"],["18M+","Global\nReaders"],["42","Countries\nReached"],["11","Anime\nAdaptations"]];
  return (
    <div className="mv-sb" style={{ background: C.red, padding: "1.1rem 5vw", display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap", justifyContent: "center" }}>
      {data.map(([n, l], i) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", color: "#fff", fontWeight: 700 }}>{n}</span>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", lineHeight: 1.3, whiteSpace: "pre" }}>{l}</span>
          </div>
          {i < data.length - 1 && <span className="mv-ss" style={{ color: "rgba(255,255,255,0.28)", fontSize: "1.4rem" }}>|</span>}
        </div>
      ))}
    </div>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="about" style={{ padding: "7rem 5vw", background: C.ink2 }}>
      <div className="mv-ag" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", maxWidth: 1140, margin: "0 auto" }}>
        <Reveal className="mv-as" style={{ position: "relative", height: 460 }}>
          <img src={IMG.about1} alt="Studio" style={{ position: "absolute", top: 0, left: 0, width: "73%", height: "87%", objectFit: "cover", border: `2px solid ${C.panelBorder}`, display: "block" }} />
          <img src={IMG.about2} alt="Manga art" style={{ position: "absolute", bottom: 0, right: 0, width: "56%", height: "56%", objectFit: "cover", border: `2px solid ${C.red}`, display: "block" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: C.gold, color: C.ink, fontFamily: "'Cinzel', serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.55rem 1.1rem", whiteSpace: "nowrap", zIndex: 3 }}>Est. 2014 — Tokyo</div>
        </Reveal>
        <Reveal>
          <Eye center={false}>About MangaVerse</Eye>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.9rem,3.5vw,2.8rem)", color: C.white, marginBottom: "1.4rem", lineHeight: 1.18 }}>We Build Universes, One Panel at a Time</h2>
          <p style={{ color: "rgba(250,246,239,0.65)", lineHeight: 1.85, marginBottom: "1.1rem", fontSize: "1.05rem" }}>MangaVerse was founded on a single belief: every great story deserves a global stage. We partner with independent manga artists, webtoon creators, and anime studios across Asia and beyond.</p>
          <p style={{ color: "rgba(250,246,239,0.65)", lineHeight: 1.85, marginBottom: "1.75rem", fontSize: "1.05rem" }}>From raw concept to finished volumes, digital releases, merchandise, and anime adaptation pitches — we are with you at every step of your creative journey.</p>
          <ul style={{ listStyle: "none", display: "grid", gap: "0.85rem" }}>
            {["End-to-end publishing support — script to shelf","Dedicated editor-artist pairing from day one","Anime adaptation pipeline with studio partners","International licensing across 42 countries","Creator-first royalty structure — you keep your IP"].map(t => (
              <li key={t} style={{ display: "flex", alignItems: "flex-start", gap: 14, fontSize: "1rem", color: C.cream }}>
                <span style={{ color: C.gold, fontSize: "0.7rem", flexShrink: 0, marginTop: 6 }}>✦</span> {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
const SVCS = [
  { icon: "📖", n: "01", title: "Manga Publishing", desc: "Print and digital publishing for serialised and completed manga. Editorial guidance, typesetting, translation, and global distribution across 40+ markets." },
  { icon: "🎬", n: "02", title: "Anime Development", desc: "We bridge manga IP with animation studios — handling pitches, co-production agreements, and broadcast placement across streaming platforms worldwide." },
  { icon: "🌐", n: "03", title: "Webtoon & Digital", desc: "Vertical-scroll optimised webtoon publishing for global digital platforms, with deep audience analytics and full monetisation support built in." },
  { icon: "⚖️", n: "04", title: "IP Licensing", desc: "Regional and worldwide licensing for merchandise, games, films, and brand collaborations — with full legal IP protection and enforcement for creators." },
  { icon: "✏️", n: "05", title: "Creator Academy", desc: "Workshops, masterclasses, and mentorship programmes by industry professionals for emerging artists and writers at all skill levels." },
  { icon: "📦", n: "06", title: "Merch & Print", desc: "Art books, figure collaborations, collectible editions, and event merchandise — turning beloved titles into physical experiences fans can hold." },
];

function Services() {
  return (
    <section id="services" style={{ padding: "7rem 5vw", background: C.ink }}>
      <Reveal><Eye>What We Offer</Eye></Reveal>
      <Reveal><H2>Publishing. Production. Promotion.</H2></Reveal>
      <Reveal><Sub>Full-spectrum support for manga creators, anime studios, and IP developers at every stage of their journey.</Sub></Reveal>
      <Reveal>
        <div className="mv-sg" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5px", background: C.panelBorder, border: `1.5px solid ${C.panelBorder}`, maxWidth: 1140, margin: "0 auto" }}>
          {SVCS.map(s => (
            <div key={s.n} className="mv-svc-card" style={{ background: C.ink, padding: "2.75rem 2.25rem" }}>
              <span style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontFamily: "'Cinzel', serif", fontSize: "2.8rem", color: "rgba(245,200,66,0.06)", fontWeight: 700, lineHeight: 1 }}>{s.n}</span>
              <span style={{ fontSize: "2.4rem", marginBottom: "1.4rem", display: "block" }}>{s.icon}</span>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.15rem", color: C.white, marginBottom: "0.85rem", letterSpacing: "0.02em" }}>{s.title}</h3>
              <p style={{ fontSize: "0.97rem", color: "rgba(250,246,239,0.55)", lineHeight: 1.78 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
const STEPS = [
  { n: "01", title: "Submit", desc: "Send your pitch — synopsis, sample pages, character sheets. All genres welcome." },
  { n: "02", title: "Review", desc: "Our editorial team reviews within 3–4 weeks with detailed feedback for all submissions." },
  { n: "03", title: "Develop", desc: "Accepted titles are paired with a dedicated editor and begin the development phase." },
  { n: "04", title: "Publish", desc: "We launch your title across print, digital, and streaming platforms simultaneously." },
  { n: "05", title: "Expand", desc: "Successful titles enter the anime pipeline, licensing, and merchandise programme." },
];

function HowItWorks() {
  return (
    <section style={{ padding: "7rem 5vw", background: C.ink2 }}>
      <Reveal><Eye>The Process</Eye></Reveal>
      <Reveal><H2>From Idea to Icon</H2></Reveal>
      <Reveal><Sub>Your creative journey with us follows a clear, creator-friendly path — with support at every step.</Sub></Reveal>
      <Reveal>
        <div className="mv-steps" style={{ display: "flex", gap: 0, maxWidth: 1060, margin: "0 auto", position: "relative" }}>
          <div className="mv-stl" style={{ position: "absolute", top: "2.1rem", left: "calc(2.1rem + 1px)", right: "calc(2.1rem + 1px)", height: 1, background: "rgba(245,200,66,0.2)" }} />
          {STEPS.map(s => (
            <div key={s.n} className="mv-step" style={{ flex: 1, textAlign: "center", padding: "0 1.2rem", position: "relative", zIndex: 2 }}>
              <div className="mv-dot" style={{ width: "4.2rem", height: "4.2rem", borderRadius: "50%", border: `2px solid ${C.gold}`, background: C.ink2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.6rem", fontFamily: "'Cinzel', serif", fontSize: "1.1rem", color: C.gold, transition: "all 0.22s" }}>{s.n}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: C.white, marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(250,246,239,0.5)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── SHOWCASE ─── */
const TITLES = [
  { img: IMG.manga1, genre: "Dark Fantasy", title: "Void Chronicle", author: "Kenji Haruto", badge: "New Vol.", featured: true },
  { img: IMG.manga2, genre: "Shonen Action", title: "Iron Fist Rising", author: "Yuki Tanaka", badge: null },
  { img: IMG.manga3, genre: "Sci-Fi Thriller", title: "Neon Hollow", author: "Aiko Shirogane", badge: "Anime" },
  { img: IMG.manga4, genre: "Romance", title: "Summer Frequency", author: "Rin Nakamura", badge: null },
  { img: IMG.manga5, genre: "Horror", title: "Shadow Protocol", author: "Hana Otsuki", badge: "Hot" },
  { img: IMG.manga6, genre: "Isekai", title: "Realm Ascendant", author: "Tatsuya Mori", badge: null },
];

function Showcase() {
  return (
    <section id="titles" style={{ padding: "7rem 5vw", background: C.ink }}>
      <Reveal><Eye>Titles</Eye></Reveal>
      <Reveal><H2>Latest Releases</H2></Reveal>
      <Reveal><Sub>A glimpse of the stories we've helped bring to the world — from debut serialisations to anime adaptations.</Sub></Reveal>
      <Reveal>
        <div className="mv-mg" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", maxWidth: 1140, margin: "0 auto 2.5rem" }}>
          {TITLES.map((m, i) => (
            <div key={m.title} className={`mv-mc ${m.featured ? "mv-mf" : ""}`} style={{ position: "relative", overflow: "hidden", background: C.ink2, border: `1.5px solid ${C.panelBorder}`, cursor: "pointer", gridRow: m.featured ? "span 2" : undefined }}>
              <img src={m.img} alt={m.title} style={{ width: "100%", aspectRatio: m.featured ? "3/7" : "3/4", objectFit: "cover", display: "block" }} />
              {m.badge && <span style={{ position: "absolute", top: 12, right: 12, background: m.badge === "Anime" ? C.gold : C.red, color: m.badge === "Anime" ? C.ink : "#fff", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px" }}>{m.badge}</span>}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(13,13,20,0.97))", padding: "2.5rem 1.1rem 1.1rem" }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.red, marginBottom: "0.3rem" }}>{m.genre}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.95rem", color: C.white, marginBottom: "0.25rem" }}>{m.title}</div>
                <div style={{ fontSize: "0.8rem", color: C.gray }}>by {m.author}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <div style={{ textAlign: "center" }}>
        <a href="#" className="mv-btn-o" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: C.cream, padding: "0.9rem 2rem", borderRadius: 3, border: "1.5px solid rgba(250,246,239,0.28)", fontSize: "0.95rem", fontWeight: 500, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", transition: "border-color 0.2s, color 0.2s" }}>View All Titles →</a>
      </div>
    </section>
  );
}

/* ─── CREATORS ─── */
const TESTS = [
  { img: IMG.creator1, quote: "MangaVerse didn't just publish my work — they helped me understand my own story better. My editor pushed me in ways I'd never considered. Three volumes in, I have an anime deal.", name: "Kenji Haruto", role: "Creator — Void Chronicle" },
  { img: IMG.creator2, quote: "I was a self-published webtoon artist with 4,000 followers. After signing with MangaVerse, my readership crossed 800,000 in eight months. The growth support team is genuinely exceptional.", name: "Aiko Shirogane", role: "Creator — Neon Hollow" },
  { img: IMG.creator3, quote: "I retained full rights to my IP — that was the dealbreaker for me. MangaVerse proved that a publishing partner can be genuinely aligned with the creator's long-term vision.", name: "Rin Nakamura", role: "Creator — Summer Frequency" },
];

function Creators() {
  return (
    <section id="creators" style={{ padding: "7rem 5vw", background: C.ink2 }}>
      <Reveal><Eye>Creator Stories</Eye></Reveal>
      <Reveal><H2>Built by Creators, for Creators</H2></Reveal>
      <Reveal><Sub>Hear from the artists and writers who call MangaVerse home — and how their stories found the world.</Sub></Reveal>

      {/* Team photos row */}
      <Reveal style={{ maxWidth: 1140, margin: "0 auto 4rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
        {[{img:IMG.team1,name:"Hiroshi Yamamoto",role:"Chief Editor"},{img:IMG.team2,name:"Priya Nair",role:"Head of Creator Relations"},{img:IMG.team3,name:"David Chen",role:"Anime Partnerships Director"}].map(t=>(
          <div key={t.name} style={{ position: "relative", overflow: "hidden", border: `1.5px solid ${C.panelBorder}` }}>
            <img src={t.img} alt={t.name} style={{ width: "100%", height: 240, objectFit: "cover", objectPosition: "top", display: "block" }} />
            <div style={{ padding: "1.1rem 1.25rem", background: C.ink }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", color: C.white, marginBottom: 3 }}>{t.name}</div>
              <div style={{ fontSize: "0.82rem", color: C.gold, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.role}</div>
            </div>
          </div>
        ))}
      </Reveal>

      {/* Testimonials */}
      <div className="mv-cg" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: 1140, margin: "0 auto" }}>
        {TESTS.map(t => (
          <Reveal key={t.name}>
            <div className="mv-cc" style={{ background: C.ink, border: `1.5px solid ${C.panelBorder}`, padding: "2.25rem", transition: "border-color 0.2s", position: "relative", height: "100%" }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "3.5rem", color: "rgba(232,25,44,0.18)", lineHeight: 0, position: "absolute", top: "1.5rem", right: "1.5rem" }}>"</span>
              <img src={t.img} alt={t.name} style={{ width: 76, height: 76, borderRadius: "50%", objectFit: "cover", border: `2.5px solid ${C.panelBorder}`, marginBottom: "1.1rem", display: "block", transition: "border-color 0.2s" }} />
              <p style={{ fontSize: "0.97rem", color: "rgba(250,246,239,0.65)", lineHeight: 1.82, marginBottom: "1.4rem", fontStyle: "italic" }}>{t.quote}</p>
              <div style={{ fontWeight: 600, fontSize: "0.98rem", color: C.white }}>{t.name}</div>
              <div style={{ fontSize: "0.78rem", color: C.gold, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.role}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  const [tab, setTab] = useState("creator");
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"", genre:"", phone:"" });
  const [sent, setSent] = useState(false);

  const upd = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const inputStyle = {
    width: "100%", padding: "0.95rem 1.1rem",
    background: "rgba(255,255,255,0.05)", border: `1.5px solid ${C.panelBorder}`,
    color: C.cream, fontSize: "0.98rem", fontFamily: "'Inter', sans-serif",
    borderRadius: 3, transition: "border-color 0.2s",
  };

  const contactCards = [
    { icon: "✉", label: "General Enquiries", value: "hello@mangaverse.co", sub: "Response within 48 hours" },
    { icon: "📩", label: "Manga Submissions", value: "submissions@mangaverse.co", sub: "Include sample pages" },
    { icon: "⚖", label: "Licensing & Business", value: "licensing@mangaverse.co", sub: "IP, partnerships, co-productions" },
    { icon: "🎧", label: "Creator Support", value: "support@mangaverse.co", sub: "For existing MangaVerse creators" },
  ];

  const offices = [
    { city: "Tokyo HQ", addr: "〒150-0001, 3-12-4 Minami-Aoyama, Minato-ku, Tokyo", phone: "+81-3-5555-0200" },
    { city: "Seoul", addr: "17F, 123 Teheran-ro, Gangnam-gu, Seoul, South Korea", phone: "+82-2-555-0300" },
    { city: "Singapore", addr: "1 Raffles Place, #28-00, Singapore 048616", phone: "+65-6555-0400" },
    { city: "Mumbai", addr: "BKC, G Block, Plot C-48, Bandra East, Mumbai 400051", phone: "+91-22-5555-0500" },
  ];

  return (
    <section id="contact" style={{ padding: "7rem 5vw", background: C.ink, position: "relative" }}>
      {/* background image overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.contactBg})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(232,25,44,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1140, margin: "0 auto" }}>
        <Reveal><Eye>Get in Touch</Eye></Reveal>
        <Reveal><H2>Let's Create Something Legendary</H2></Reveal>
        <Reveal><Sub>Whether you're a creator ready to submit, a studio looking to partner, or a reader with a question — we're here.</Sub></Reveal>

        {/* contact info cards */}
        <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: "1rem", marginBottom: "4rem" }}>
          {contactCards.map(c => (
            <div key={c.label} className="mv-ci" style={{ background: "rgba(255,255,255,0.03)", border: `1.5px solid ${C.panelBorder}`, padding: "1.5rem 1.6rem", borderRadius: 4, transition: "border-color 0.2s, background 0.2s" }}>
              <div style={{ fontSize: "1.6rem", marginBottom: "0.7rem" }}>{c.icon}</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold, marginBottom: "0.4rem" }}>{c.label}</div>
              <div style={{ fontSize: "0.97rem", color: C.cream, fontWeight: 500, marginBottom: "0.25rem" }}>{c.value}</div>
              <div style={{ fontSize: "0.82rem", color: C.gray }}>{c.sub}</div>
            </div>
          ))}
        </Reveal>

        {/* tabs + form */}
        <div className="mv-ctg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <Reveal>
            {/* tab switcher */}
            <div style={{ display: "flex", gap: 0, marginBottom: "2rem", border: `1.5px solid ${C.panelBorder}`, borderRadius: 3, overflow: "hidden" }}>
              {[["creator","🎨 Creator Pitch"],["customer","💬 Customer / Fan"]].map(([k, label]) => (
                <button key={k} onClick={() => { setTab(k); setSent(false); }} className={`mv-contact-tab ${tab===k?"active":""}`}
                  style={{ flex: 1, padding: "0.85rem", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 600, color: tab===k ? "#fff" : C.gray, letterSpacing: "0.04em", transition: "all 0.2s" }}>{label}</button>
              ))}
            </div>

            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 2rem", background: "rgba(245,200,66,0.06)", border: `1.5px solid rgba(245,200,66,0.2)`, borderRadius: 4 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✦</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", color: C.gold, marginBottom: "0.75rem" }}>Message Received!</div>
                <p style={{ color: "rgba(250,246,239,0.65)", fontSize: "1rem" }}>{tab === "creator" ? "Our editorial team will review your pitch within 3–4 weeks and be in touch." : "Our support team will get back to you within 48 hours."}</p>
                <button onClick={() => { setSent(false); setForm({ name:"",email:"",subject:"",message:"",genre:"",phone:"" }); }} style={{ marginTop: "1.5rem", background: "transparent", border: `1.5px solid ${C.gold}`, color: C.gold, padding: "0.7rem 1.75rem", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", borderRadius: 3 }}>Send Another</button>
              </div>
            ) : (
              <div className="mv-cform" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Full Name *</label>
                  <input className="mv-inp" value={form.name} onChange={upd("name")} placeholder="Your full name" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Email Address *</label>
                  <input className="mv-inp" type="email" value={form.email} onChange={upd("email")} placeholder="you@example.com" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Phone</label>
                  <input className="mv-inp" value={form.phone} onChange={upd("phone")} placeholder="+1 234 567 8900" style={inputStyle} />
                </div>
                {tab === "creator" ? (
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Manga Genre *</label>
                    <select className="mv-sel" value={form.genre} onChange={upd("genre")} style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="" style={{ background: C.ink }}>Select your genre</option>
                      {["Shonen (Action/Adventure)","Shojo (Romance/Emotion)","Seinen (Mature/Psychological)","Josei (Slice of Life)","Isekai / Fantasy","Sci-Fi / Cyberpunk","Horror / Supernatural","Sports","Historical / Samurai","Other"].map(g => <option key={g} value={g} style={{ background: C.ink }}>{g}</option>)}
                    </select>
                  </div>
                ) : (
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>Subject *</label>
                    <input className="mv-inp" value={form.subject} onChange={upd("subject")} placeholder="What can we help you with?" style={inputStyle} />
                  </div>
                )}
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, marginBottom: "0.5rem" }}>{tab === "creator" ? "Your Pitch / Story Summary *" : "Message *"}</label>
                  <textarea className="mv-ta" value={form.message} onChange={upd("message")} rows={5}
                    placeholder={tab === "creator" ? "Tell us about your manga — concept, genre, tone, how many chapters you have ready..." : "Tell us how we can help you..."}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }} />
                </div>
                {tab === "creator" && (
                  <div style={{ gridColumn: "1/-1", background: "rgba(245,200,66,0.06)", border: `1px solid rgba(245,200,66,0.2)`, padding: "1rem 1.25rem", borderRadius: 3, fontSize: "0.88rem", color: "rgba(250,246,239,0.6)", lineHeight: 1.7 }}>
                    💡 Attach sample pages (up to 10) and character reference sheets to your email submission at <span style={{ color: C.gold }}>submissions@mangaverse.co</span>
                  </div>
                )}
                <div style={{ gridColumn: "1/-1" }}>
                  <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }} className="mv-btn-p"
                    style={{ background: C.red, color: "#fff", padding: "1.05rem 2.5rem", border: "none", cursor: "pointer", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", borderRadius: 3, transition: "background 0.2s, transform 0.15s", width: "100%" }}>
                    {tab === "creator" ? "Submit My Pitch ✦" : "Send Message ↗"}
                  </button>
                </div>
              </div>
            )}
          </Reveal>

          {/* offices + map placeholder */}
          <Reveal>
            <div style={{ fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: C.red, marginBottom: "1.5rem" }}>Our Offices</div>
            <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
              {offices.map(o => (
                <div key={o.city} style={{ background: "rgba(255,255,255,0.03)", border: `1.5px solid ${C.panelBorder}`, padding: "1.25rem 1.5rem", borderRadius: 3 }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", color: C.gold, marginBottom: "0.4rem" }}>{o.city}</div>
                  <div style={{ fontSize: "0.9rem", color: "rgba(250,246,239,0.65)", lineHeight: 1.65, marginBottom: "0.35rem" }}>{o.addr}</div>
                  <div style={{ fontSize: "0.88rem", color: C.gray }}>{o.phone}</div>
                </div>
              ))}
            </div>
            {/* support hours */}
            <div style={{ background: "rgba(232,25,44,0.08)", border: `1.5px solid rgba(232,25,44,0.2)`, padding: "1.4rem 1.6rem", borderRadius: 3 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", color: C.red, marginBottom: "0.75rem" }}>Support Hours</div>
              {[["Editorial Team","Mon–Fri, 9am–6pm JST"],["Creator Support","Mon–Sat, 9am–9pm JST"],["Licensing Dept.","Mon–Fri, 10am–5pm SGT"],["General Enquiries","24–48h response via email"]].map(([d,h])=>(
                <div key={d} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", padding: "0.4rem 0", borderBottom: `1px solid rgba(232,25,44,0.1)` }}>
                  <span style={{ color: "rgba(250,246,239,0.65)" }}>{d}</span>
                  <span style={{ color: C.cream, fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  const cols = [
    { title: "Company", links: ["About Us","Our Team","Careers","Press"] },
    { title: "Creators", links: ["Submit a Pitch","Creator Academy","Creator Portal","Royalty Info"] },
    { title: "Titles", links: ["All Manga","Webtoons","Anime","Light Novels"] },
  ];
  return (
    <footer style={{ background: "#06060e", padding: "4rem 5vw 2rem", borderTop: `1px solid ${C.panelBorder}` }}>
      <div className="mv-ft" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
        <div>
          <a href="#" style={{ fontFamily: "'Cinzel', serif", fontSize: "1.45rem", color: C.gold, letterSpacing: "0.05em", textDecoration: "none", display: "block", marginBottom: "1rem" }}>
            Manga<span style={{ color: C.red }}>Verse</span>
          </a>
          <p style={{ fontSize: "0.92rem", color: C.gray, lineHeight: 1.78, maxWidth: 260, marginBottom: "1.25rem" }}>The home for the next generation of manga and anime creators. Tokyo · Seoul · Singapore · Mumbai.</p>
          <div style={{ fontSize: "0.88rem", color: "rgba(250,246,239,0.5)", lineHeight: 1.7 }}>
            <div>✉ hello@mangaverse.co</div>
            <div style={{ marginTop: 4 }}>📞 +81-3-5555-0200</div>
          </div>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <h4 style={{ fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, marginBottom: "1.4rem" }}>{c.title}</h4>
            <ul style={{ listStyle: "none", display: "grid", gap: "0.7rem" }}>
              {c.links.map(l => <li key={l}><a href="#" className="mv-fl" style={{ fontSize: "0.92rem", color: C.gray, textDecoration: "none", transition: "color 0.2s" }}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mv-fb" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "2rem", borderTop: `1px solid rgba(46,46,74,0.5)`, fontSize: "0.82rem", color: C.gray }}>
        <span>© 2025 MangaVerse Publishing Ltd. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["X / Twitter","Instagram","Discord","YouTube"].map(s => (
            <a key={s} href="#" className="mv-sl" style={{ fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", color: C.gray, textDecoration: "none", transition: "color 0.2s" }}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function MangaVerse() {
  return (
    <>
      <style>{G}</style>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <HowItWorks />
        <Showcase />
        <Creators />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
