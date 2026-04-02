'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const FEATURES = [
  {
    icon: '🧠',
    title: 'Smart Specialist Selection',
    desc: 'AI automatically identifies and assigns the best medical specialists based on your report content.',
  },
  {
    icon: '⚡',
    title: 'Parallel Analysis',
    desc: 'Multiple specialist agents analyze your report simultaneously for fast, comprehensive results.',
  },
  {
    icon: '🔬',
    title: '10+ Specialists',
    desc: 'From cardiologists to neurologists — a full multidisciplinary team at your fingertips.',
  },
  {
    icon: '💬',
    title: 'Follow-Up Chat',
    desc: 'Ask questions about your diagnosis and get context-aware answers from our AI assistant.',
  },
  {
    icon: '📄',
    title: 'PDF Reports',
    desc: 'Download professionally formatted diagnosis reports for sharing with healthcare providers.',
  },
  {
    icon: '🔒',
    title: 'HIPAA-Aware',
    desc: 'Your medical data is handled with strict privacy controls and manual deletion options.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Upload Report',
    desc: 'Upload a medical report (.txt, .pdf, .docx) or paste it directly.',
    color: 'var(--color-primary)',
  },
  {
    num: '02',
    title: 'AI Analyzes',
    desc: 'Our AI selects specialists and runs parallel multi-agent analysis.',
    color: 'var(--color-secondary)',
  },
  {
    num: '03',
    title: 'Get Diagnosis',
    desc: 'Receive a comprehensive diagnosis with actionable recommendations.',
    color: '#8B5CF6',
  },
];

export default function LandingPage() {
  const { login, isAuthenticated } = useAuth();

  return (
    <div className={styles.landing}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLogo}>
            <span className={styles.logoIcon}>🏥</span>
            <span className={styles.logoText}>Cura10.ai</span>
          </div>
          <nav className={styles.headerNav}>
            <a href="#features" className={styles.headerLink}>Features</a>
            <a href="#how-it-works" className={styles.headerLink}>How It Works</a>
            {isAuthenticated ? (
              <a href="/dashboard" className={`btn btn-primary ${styles.headerCta}`}>Dashboard</a>
            ) : (
              <button onClick={login} className={`btn btn-primary ${styles.headerCta}`}>
                Get Started
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Powered by OpenAI GPT-4.1
          </span>
          <h1 className={styles.heroTitle}>
            AI-Powered <br />
            <span className={styles.heroGradient}>Medical Diagnostics</span>
          </h1>
          <p className={styles.heroDesc}>
            Upload a medical report and let our multidisciplinary AI team — cardiologists,
            neurologists, pulmonologists vs more — deliver a comprehensive diagnosis in minutes.
          </p>
          <div className={styles.heroActions}>
            {isAuthenticated ? (
              <a href="/analyze" className="btn btn-primary btn-lg">
                Start Analysis →
              </a>
            ) : (
              <button onClick={login} className="btn btn-primary btn-lg">
                Get Started — It&apos;s Free →
              </button>
            )}
            <a href="#how-it-works" className="btn btn-outline btn-lg">
              See How It Works
            </a>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>10+</span>
              <span className={styles.heroStatLabel}>Specialists</span>
            </div>
            <div className={styles.heroDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>3</span>
              <span className={styles.heroStatLabel}>Diagnoses</span>
            </div>
            <div className={styles.heroDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>&lt;2min</span>
              <span className={styles.heroStatLabel}>Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Features</span>
          <h2 className={styles.sectionTitle}>Everything You Need for AI Diagnostics</h2>
          <p className={styles.sectionDesc}>
            A complete platform for intelligent medical report analysis with multi-specialist AI agents.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.featureCard} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>How It Works</span>
          <h2 className={styles.sectionTitle}>Three Simple Steps</h2>
          <p className={styles.sectionDesc}>
            From report upload to comprehensive diagnosis in minutes.
          </p>
        </div>
        <div className={styles.stepsGrid}>
          {STEPS.map((step, i) => (
            <div key={i} className={styles.stepCard}>
              <span className={styles.stepNum} style={{ color: step.color }}>{step.num}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              {i < STEPS.length - 1 && <div className={styles.stepConnector} />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Ready to Transform Medical Diagnostics?</h2>
          <p className={styles.ctaDesc}>
            Join healthcare professionals using AI-powered analysis for better patient outcomes.
          </p>
          {isAuthenticated ? (
            <a href="/analyze" className="btn btn-primary btn-lg">Go to Dashboard →</a>
          ) : (
            <button onClick={login} className="btn btn-primary btn-lg">
              Start Free Now →
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.logoIcon}>🏥</span>
            <span className={styles.logoText}>Cura10.ai</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/disclaimer">Medical Disclaimer</a>
          </div>
          <p className={styles.footerCopy}>
            &copy; 2026 Cura10.ai. For research and educational purposes only.
            Not intended for clinical use.
          </p>
        </div>
      </footer>
    </div>
  );
}
