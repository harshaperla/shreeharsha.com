import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, Terminal, Copyright } from 'lucide-react';
import Navigation from './components/Navigation';
import ProfileSection from './components/ProfileSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import TaiwanDiaries from './components/TaiwanDiaries';
import { SHREEHARSHA_BIO } from './data';
import { BlogType } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [blogSectionInitialType, setBlogSectionInitialType] = useState<BlogType>('tech');
  const [initialTaiwanPlaceId, setInitialTaiwanPlaceId] = useState<string | null>(null);

  // Theme state: defaults to dark or persists user selection
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync with URL hash for shareable links and direct navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('taiwan')) {
        const parts = hash.split('/');
        if (parts[1]) {
          setInitialTaiwanPlaceId(parts[1]);
        }
        setActiveSection('taiwan');
      } else if (hash === 'travel' || hash === 'tech' || hash === 'kannada' || hash === 'contact' || hash === 'profile') {
        setActiveSection(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Triggered from Profile sections or hero shortcuts to jump directly to specific blogs
  const handleNavigateToBlogsSetting = (type: string) => {
    setBlogSectionInitialType(type as BlogType);
    setActiveSection('tech-direct'); // Force a transition key reset
    
    setTimeout(() => {
      // Set active section based on the specific type
      if (type === 'kannada') {
        setActiveSection('kannada');
      } else if (type === 'travel') {
        setActiveSection('travel');
      } else if (type === 'taiwan') {
        setActiveSection('taiwan');
      } else {
        setActiveSection('tech');
      }
    }, 50);
  };

  const handleNavigateToContact = () => {
    setActiveSection('contact');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between selection:bg-zinc-200 selection:text-zinc-900 relative overflow-x-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] left-[10%] w-[40vw] h-[40vw] bg-sky-500/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Grid line pattern overlay */}
      <div className="absolute inset-0 theme-grid-lines bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />
      {/* Modern micro dotted mesh grid for high visual texture */}
      <div className="absolute inset-0 theme-grid-dots bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-[0.25]" />

      {/* Main sticky header navigation panel */}
      <Navigation
        activeSection={activeSection.includes('tech-direct') ? 'tech' : activeSection}
        setActiveSection={(sec) => {
          if (sec === 'tech') {
            setBlogSectionInitialType('tech');
          } else if (sec === 'kannada') {
            setBlogSectionInitialType('kannada');
          } else if (sec === 'travel') {
            setBlogSectionInitialType('travel');
          }
          setActiveSection(sec);
          window.location.hash = sec;
        }}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Immersive core view area with page-change transitions */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          {activeSection === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <ProfileSection 
                onNavigateToBlogs={handleNavigateToBlogsSetting}
                onNavigateToContact={handleNavigateToContact}
              />
            </motion.div>
          )}

          {activeSection === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <BlogSection initialType="tech" />
            </motion.div>
          )}

          {activeSection === 'kannada' && (
            <motion.div
              key="kannada"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <BlogSection initialType="kannada" />
            </motion.div>
          )}

          {activeSection === 'travel' && (
            <motion.div
              key="travel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <BlogSection initialType="travel" />
            </motion.div>
          )}

          {activeSection === 'taiwan' && (
            <motion.div
              key="taiwan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <TaiwanDiaries 
                onNavigateSection={(sec) => {
                  setActiveSection(sec);
                  window.location.hash = sec;
                }}
                initialPlaceId={initialTaiwanPlaceId}
              />
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal, high-craft footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 z-10 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo signature & tech values */}
          <div className="flex flex-col items-center md:items-start space-y-1">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-zinc-500" />
              <span className="font-mono text-xs font-bold text-zinc-100 tracking-tight">
                {SHREEHARSHA_BIO.domain}
              </span>
            </div>
            <p className="font-sans text-[11px] text-zinc-500 text-center md:text-left">
              Systems Architect • Indic Typography & Silicon Verification • Bengaluru, IN
            </p>
          </div>

          {/* Social connections shortcut bar */}
          <div className="flex space-x-4">
            <a
              href={`mailto:harshaperla@gmail.com`}
              className="text-zinc-500 hover:text-white transition-colors p-2 rounded-lg bg-zinc-900/30 border border-zinc-900"
              aria-label="Direct Email"
              id="footer-email-link"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={SHREEHARSHA_BIO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors p-2 rounded-lg bg-zinc-900/30 border border-zinc-900"
              aria-label="Github Repo Handle"
              id="footer-github-link"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={SHREEHARSHA_BIO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors p-2 rounded-lg bg-zinc-900/30 border border-zinc-900"
              aria-label="Linkedin Profile link"
              id="footer-linkedin-link"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={SHREEHARSHA_BIO.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors p-2 rounded-lg bg-zinc-900/30 border border-zinc-900"
              aria-label="Twitter stream handle"
              id="footer-twitter-link"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright badge */}
          <div className="flex items-center space-x-1 font-mono text-[10px] text-zinc-500">
            <Copyright className="w-3.5 h-3.5" />
            <span>2026 {SHREEHARSHA_BIO.domain} • <span className="text-zinc-600 font-light">Shree</span><span className="text-zinc-300">harsha Perla</span>. All Rights Stated.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
