import React, { useEffect, useState } from 'react';
import {
  Rocket,
  Download,
  ArrowRight,
  GraduationCap,
  Cpu,
  Star,
  Sun,
  Moon,
  Award,
  Globe,
  ExternalLink,
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  Code2,
  X,
} from 'lucide-react';
import {
  PROFILE,
  EDUCATION,
  NAV_ITEMS,
  SKILL_CATEGORIES,
  PROJECT_FILTERS,
  PROJECTS,
  CERTIFICATIONS,
} from './data/cvData';
import HeroWorkspace3D from './components/HeroWorkspace3D';
import ProjectCard3D from './components/ProjectCard3D';
import CanvasErrorBoundary from './components/CanvasErrorBoundary';
import {
  YoloThresholdSimulator,
  UNetMaskSimulator,
  ExpiryStageSimulator,
  TalentScoreSimulator,
  RagPipelineSimulator,
} from './components/ProjectSimulator';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [selectedProjectCat, setSelectedProjectCat] = useState('all');
  const [selectedSkillCat, setSelectedSkillCat] = useState('all');
  const [copiedKey, setCopiedKey] = useState(null);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  useEffect(() => {
    if (!photoModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setPhotoModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [photoModalOpen]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) {
          setActiveNav(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHeroTileClick = (target) => {
    if (target === 'projects') {
      scrollToSection('projects');
      return;
    }
    setSelectedSkillCat(target);
    scrollToSection('skills');
  };

  const handleCopy = (key, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${senderName || 'Visitor'}`
    );
    const body = encodeURIComponent(message || 'Hi Shashwata,');
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const visibleProjects =
    selectedProjectCat === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedProjectCat);

  const visibleSkillCats =
    selectedSkillCat === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedSkillCat);

  return (
    <div>
      <div className="page-backdrop" />
      <div className="floor-grid" />

      <div className="site-wrapper">
        {/* Top Floating Glass Navbar */}
        <header className="navbar">
          <div className="nav-brand">
            <button
              type="button"
              className="brand-icon"
              onClick={() => setPhotoModalOpen(true)}
              aria-label="View full profile picture"
              title="Click to view full photo"
            >
              <img
                src="/profile.jpg"
                alt={PROFILE.name}
                className="brand-avatar-img"
              />
            </button>
            <a
              href="#home"
              className="brand-name"
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              {PROFILE.firstName} <span>{PROFILE.lastName}</span>
            </a>
          </div>

          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label="Toggle color theme"
            title="Toggle Dark / Light Theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </header>

        {/* HERO SECTION (Matching Reference Image Layout) */}
        <section id="home" className="hero-section">
          <div className="hero-grid">
            {/* Left Column */}
            <div>
              <div className="status-pill">
                <span className="status-dot" />
                <span>{PROFILE.badge}</span>
              </div>

              <h1 className="hero-greeting">Hi, I&apos;m</h1>
              <div className="hero-name">{PROFILE.name}</div>

              <p className="hero-tagline">{PROFILE.headline}</p>
              <p className="hero-desc">{PROFILE.heroSubcopy}</p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="btn-glow"
                  onClick={() => scrollToSection('projects')}
                >
                  <Rocket size={17} />
                  <span>View My Projects</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="/Shashwata_Ranjan_Bhatta_Resume.pdf"
                  download="Shashwata_Ranjan_Bhatta_Resume.pdf"
                  className="btn-outline"
                >
                  <Download size={17} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive 3D Developer Workspace */}
            <div style={{ position: 'relative' }}>
              <CanvasErrorBoundary>
                <HeroWorkspace3D onTileClick={handleHeroTileClick} />
              </CanvasErrorBoundary>
            </div>
          </div>

          {/* Bottom Glass "About Me" Card matching screenshot */}
          <div className="about-strip">
            <div>
              <div className="about-strip-accent" />
              <h2>About Me</h2>
              <p>{PROFILE.aboutSummary}</p>
              <button
                type="button"
                className="btn-pill-sm"
                onClick={() => scrollToSection('about')}
              >
                <span>Learn More</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="about-highlights">
              <div className="highlight-col">
                <GraduationCap
                  size={28}
                  color="#a78bfa"
                  className="highlight-icon"
                />
                <div className="highlight-title">{EDUCATION.status}</div>
                <div className="highlight-sub">{EDUCATION.college}</div>
              </div>

              <div className="highlight-col">
                <Cpu size={28} color="#38bdf8" className="highlight-icon" />
                <div className="highlight-title">AI / ML &amp; GenAI</div>
              </div>

              <div className="highlight-col">
                <Star size={28} color="#fbbf24" className="highlight-icon" />
                <div className="highlight-title">Full-Stack Dev</div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & EDUCATION SECTION */}
        <section id="about" className="content-section">
          <div className="section-header">
            <div className="section-kicker">01 &bull; About &amp; Background</div>
            <h2 className="section-title">About Me &amp; Education</h2>
          </div>

          <div className="two-col-grid">
            <div className="glass-card">
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  marginBottom: 10,
                }}
              >
                Professional Summary
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  fontSize: '0.93rem',
                  marginBottom: 18,
                }}
              >
                {PROFILE.summary}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 10,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                }}
              >
                <Globe size={17} color="#38bdf8" />
                <span>Languages</span>
              </div>
              <div className="skill-tags">
                {PROFILE.languages.map((lang) => (
                  <span key={lang} className="skill-tag">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <GraduationCap size={22} color="#a78bfa" />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                  }}
                >
                  Education
                </h3>
              </div>

              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: '14px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(167, 139, 250, 0.3)',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.08rem',
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {EDUCATION.college}
                </div>
                <div
                  style={{
                    color: 'var(--purple-bright)',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    marginBottom: 2,
                  }}
                >
                  {EDUCATION.status}
                </div>
                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.86rem',
                  }}
                >
                  {EDUCATION.degree}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 10,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                }}
              >
                <Award size={17} color="#fbbf24" />
                <span>Certifications</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.title}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 12px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.35)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.84rem',
                    }}
                  >
                    <span>{cert.title}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--purple-bright)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cert.issuer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="content-section">
          <div className="section-header">
            <div className="section-kicker">02 &bull; Interactive 3D &amp; Full-Stack Demos</div>
            <h2 className="section-title">Featured Projects</h2>
          </div>

          <div className="skill-filter-bar">
            {PROJECT_FILTERS.map((flt) => (
              <button
                key={flt.id}
                type="button"
                className={`filter-pill ${selectedProjectCat === flt.id ? 'active' : ''}`}
                onClick={() => setSelectedProjectCat(flt.id)}
              >
                {flt.label}
              </button>
            ))}
          </div>

          <div className="two-col-grid">
            {visibleProjects.map((project) => (
              <article key={project.id} className="glass-card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.22rem',
                      fontWeight: 700,
                    }}
                  >
                    {project.title}
                  </h3>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill-sm"
                    style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
                  >
                    <span>GitHub</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <div className="skill-tags" style={{ marginTop: 6 }}>
                  {project.stack.map((tech) => (
                    <span key={tech} className="skill-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Live 3D Interactive Project Diorama */}
                <CanvasErrorBoundary>
                  <ProjectCard3D type={project.demoType} />
                </CanvasErrorBoundary>

                <div className="metrics-row">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="metric-chip">
                      <div className="metric-chip-val">{m.value}</div>
                      <div className="metric-chip-lbl">{m.label}</div>
                    </div>
                  ))}
                </div>

                <ul className="bullet-list">
                  {project.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                {project.demoType === 'yolo' && <YoloThresholdSimulator />}
                {project.demoType === 'unet' && <UNetMaskSimulator />}
                {project.demoType === 'expiry' && <ExpiryStageSimulator />}
                {project.demoType === 'talent' && <TalentScoreSimulator />}
                {project.demoType === 'rag' && <RagPipelineSimulator />}
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="content-section">
          <div className="section-header">
            <div className="section-kicker">03 &bull; Technical Stack</div>
            <h2 className="section-title">Technical Skills</h2>
          </div>

          <div className="skill-filter-bar">
            <button
              type="button"
              className={`filter-pill ${selectedSkillCat === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSkillCat('all')}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${selectedSkillCat === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedSkillCat(cat.id)}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="three-col-grid">
            {visibleSkillCats.map((cat) => (
              <div key={cat.id} className="glass-card">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: cat.color,
                        display: 'inline-block',
                      }}
                    />
                    {cat.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: cat.color,
                    }}
                  >
                    {cat.skills.length}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {cat.description}
                </p>
                <div className="skill-tags">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="content-section no-print">
          <div className="section-header">
            <div className="section-kicker">04 &bull; Get In Touch</div>
            <h2 className="section-title">Contact Me</h2>
          </div>

          <div className="two-col-grid">
            <div className="glass-card" style={{ display: 'grid', gap: 12 }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Open to software engineering, machine learning, and AI
                development roles or collaborations. Feel free to reach out
                directly.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.35)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Mail size={17} color="#a78bfa" />
                  <span style={{ fontSize: '0.9rem' }}>{PROFILE.email}</span>
                </div>
                <button
                  type="button"
                  className="btn-pill-sm"
                  onClick={() => handleCopy('email', PROFILE.email)}
                >
                  {copiedKey === 'email' ? (
                    <>
                      <Check size={13} color="#34d399" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy
                    </>
                  )}
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.35)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Phone size={17} color="#38bdf8" />
                  <span style={{ fontSize: '0.9rem' }}>{PROFILE.phone}</span>
                </div>
                <button
                  type="button"
                  className="btn-pill-sm"
                  onClick={() => handleCopy('phone', PROFILE.phone)}
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <Check size={13} color="#34d399" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy
                    </>
                  )}
                </button>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: '10px 18px', fontSize: '0.86rem' }}
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: '10px 18px', fontSize: '0.86rem' }}
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href={PROFILE.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: '10px 18px', fontSize: '0.86rem' }}
                >
                  <Code2 size={16} color="#fbbf24" /> LeetCode
                </a>
              </div>
            </div>

            <form
              className="glass-card"
              onSubmit={handleSendEmail}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                }}
              >
                Send a Quick Message
              </h3>
              <input
                type="text"
                className="input-field"
                placeholder="Your Name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
              <textarea
                rows={4}
                className="input-field"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="btn-glow"
                style={{ justifyContent: 'center' }}
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </section>

        <footer className="footer no-print">
          <span>
            &copy; {new Date().getFullYear()} {PROFILE.name} &bull; {EDUCATION.college}
          </span>
        </footer>
      </div>

      {photoModalOpen && (
        <div
          className="photo-modal-backdrop"
          onClick={() => setPhotoModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full profile picture"
        >
          <div
            className="photo-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="photo-modal-close"
              onClick={() => setPhotoModalOpen(false)}
              aria-label="Close photo"
            >
              <X size={18} />
            </button>
            <img
              src="/profile.jpg"
              alt={PROFILE.name}
              className="photo-modal-img"
            />
            <div className="photo-modal-caption">
              <strong>{PROFILE.name}</strong>
              <span>{EDUCATION.college} &bull; {EDUCATION.status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
