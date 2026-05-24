import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Cpu, RefreshCw, ChevronRight, Layers, Award, Radio, 
  ChefHat, Tv, Sparkles, Users, Briefcase, Building2, Play, Terminal, 
  ArrowRight, Workflow, ExternalLink, HardDrive, CheckCircle2, AlertTriangle, 
  Settings, PlayCircle, Eye, Network, Code2
} from 'lucide-react';
import { 
  SHREEHARSHA_BIO, 
  SYSTEM_MINDSETS, 
  PROJECTS_DATABASE, 
  ROOTENT_COMPANY, 
  PERSONAL_SECTIONS 
} from '../data';

interface ProfileSectionProps {
  onNavigateToBlogs: (type: string) => void;
  onNavigateToContact: () => void;
}

export default function ProfileSection({ onNavigateToBlogs, onNavigateToContact }: ProfileSectionProps) {
  // Architect's Tensions State
  const [activeTension, setActiveTension] = useState<'rigor' | 'heuristics' | 'isolation'>('rigor');

  // Stagger animation helpers
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-16 max-w-6xl mx-auto px-4 py-8 md:py-12"
      id="profile-section-container"
    >
      {/* 2-Column Hero Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Bio Highlights / Left Column */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-zinc-800/30 px-3.5 py-1.5 rounded-full select-none">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase">Active Operator Node</span>
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
            I&apos;m <span className="font-mono tracking-tight font-extrabold uppercase"><span className="text-zinc-400">SHREE</span><span className="text-white">HARSHA</span></span>.
          </h1>

          <p className="font-sans font-medium text-xl sm:text-2xl text-zinc-300 leading-relaxed max-w-2xl italic border-l-2 border-emerald-500/80 pl-4">
            &ldquo;{SHREEHARSHA_BIO.tagline}&rdquo;
          </p>

          <p className="font-sans text-base text-zinc-400 leading-relaxed max-w-2xl">
            {SHREEHARSHA_BIO.philosophy}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onNavigateToContact}
              className="bg-zinc-100 text-zinc-950 font-sans font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2 cursor-pointer shadow-lg shadow-emerald-950/20"
              id="hero-contact-btn"
            >
              <span>Initialize Connection</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToBlogs('tech')}
              className="bg-zinc-900/40 text-zinc-300 border border-zinc-800/30 font-sans font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg hover:text-white hover:bg-zinc-850/50 transition-all cursor-pointer"
              id="hero-tech-blog-btn"
            >
              Examine Logbook (Blogs)
            </button>
          </div>
        </motion.div>

        {/* The Builder's Tensions / Right Column */}
        <motion.div variants={itemVariants} className="lg:col-span-5">
          <div className="bg-[#18181c] border border-zinc-800/30 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl">
            {/* Ambient indicator lights */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="border-b border-zinc-800/30 pb-3.5">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800/20">
                    Architect&apos;s Tension Map
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <h3 className="font-sans font-extrabold text-xl text-white mt-1.5 leading-tight">
                  The Systems Builder&apos;s Paradoxes
                </h3>
                <p className="font-sans text-xs text-zinc-400 mt-1">
                  Three internal cognitive friction loops that shape how I design software.
                </p>
              </div>

              {/* Selector Tabs */}
              <div className="flex flex-col gap-1.5 p-1 bg-zinc-900/40 rounded-xl border border-zinc-800/30">
                <button
                  onClick={() => setActiveTension('rigor')}
                  className={`flex justify-between items-center px-3 py-2 rounded-lg font-sans text-xs transition-all duration-150 cursor-pointer ${
                    activeTension === 'rigor'
                      ? 'bg-zinc-800/50 text-white font-semibold shadow-md'
                      : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/20'
                  }`}
                >
                  <span>1. Rigor vs. Velocity</span>
                  <span className="font-mono text-[10px] text-zinc-500">85% / 15%</span>
                </button>
                <button
                  onClick={() => setActiveTension('heuristics')}
                  className={`flex justify-between items-center px-3 py-2 rounded-lg font-sans text-xs transition-all duration-150 cursor-pointer ${
                    activeTension === 'heuristics'
                      ? 'bg-zinc-800/50 text-white font-semibold shadow-md'
                      : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/20'
                  }`}
                >
                  <span>2. DB Logic vs. Fuzzy AI</span>
                  <span className="font-mono text-[10px] text-zinc-500">70% / 30%</span>
                </button>
                <button
                  onClick={() => setActiveTension('isolation')}
                  className={`flex justify-between items-center px-3 py-2 rounded-lg font-sans text-xs transition-all duration-150 cursor-pointer ${
                    activeTension === 'isolation'
                      ? 'bg-zinc-800/50 text-white font-semibold shadow-md'
                      : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/20'
                  }`}
                >
                  <span>3. Solitude vs. Guild Hubs</span>
                  <span className="font-mono text-[10px] text-zinc-500">60% / 40%</span>
                </button>
              </div>

              {/* Visual Duality Bar */}
              <div className="space-y-1.5 bg-zinc-900/20 p-4 mx-0.5 border border-zinc-800/30 rounded-xl">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-zinc-500">
                    {activeTension === 'rigor' && 'FIRST-PRINCIPLES SPEC'}
                    {activeTension === 'heuristics' && 'DETERMINISTIC CONSTRAINTS'}
                    {activeTension === 'isolation' && 'DEEP-WORK ASYNCHRONY'}
                  </span>
                  <span className="text-emerald-400 font-semibold text-right">
                    {activeTension === 'rigor' && 'REAL-WORLD VELOCITY'}
                    {activeTension === 'heuristics' && 'MODEL HEURISTICS'}
                    {activeTension === 'isolation' && 'GUILD COUPLING'}
                  </span>
                </div>
                
                {/* Duality Scale visual slider */}
                <div className="h-2 w-full bg-zinc-850 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-zinc-400 transition-all duration-500" 
                    style={{ 
                      width: activeTension === 'rigor' ? '85%' : activeTension === 'heuristics' ? '70%' : '60%' 
                    }} 
                  />
                  <div 
                    className="bg-emerald-555 bg-emerald-500/80 transition-all duration-500 flex-1 animate-pulse" 
                  />
                </div>
              </div>

              {/* Dynamic Narrative Statement */}
              <div className="bg-zinc-900/30 font-sans text-xs text-zinc-300 rounded-xl p-4.5 border border-zinc-800/30 leading-relaxed space-y-3 min-h-[145px] flex flex-col justify-between">
                <div>
                  {activeTension === 'rigor' && (
                    <p>
                      I constantly battle the urge to engineer flawless, generalized meta-compilers before shipping the first line of code. I break this gridlock with a personal ruleset: <strong className="text-white">any abstraction that hasn&apos;t saved me from manual labor twice is a distraction.</strong> I schema-design rigorously, then bootstrap and ship immediate working loops.
                    </p>
                  )}
                  {activeTension === 'heuristics' && (
                    <p>
                      LLM code generation can construct beautiful visual facades, but they disintegrate under load. I refuse to ship unanchored software. <strong className="text-white">We pipe intelligence inside strict state enclosures.</strong> Models are permitted to map data, but our compilers and database schemas must completely bound system drifts.
                    </p>
                  )}
                  {activeTension === 'isolation' && (
                    <p>
                      High-assurance systems are compiled in sustained periods of focused solitude, debugging traces and postgres indexes. But isolated brains lose system grounding. I force myself out of the darkroom to anchor Bengaluru&apos;s dev networks—nurturing literature, sourdough chemistry, and local developer hubs.
                    </p>
                  )}
                </div>

                <div className="border-t border-zinc-800/30 pt-3 flex items-center space-x-2 text-[10px] font-mono text-zinc-500 select-none">
                  <Terminal className="w-3.5 h-3.5 text-zinc-650 shrink-0" />
                  <span className="truncate">
                    {activeTension === 'rigor' && 'SYSTEM_BYLAW: rigor_sanity_check.sh'}
                    {activeTension === 'heuristics' && 'SYSTEM_BYLAW: schema_assertion_compiler'}
                    {activeTension === 'isolation' && 'SYSTEM_BYLAW: bengaluru_node_coupling'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rootent Company Focus Section */}
      <motion.div variants={itemVariants} className="space-y-6 border-t border-zinc-800/40 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-emerald-950/20 border border-emerald-900/30 px-2.5 py-0.5 rounded text-emerald-400 font-mono text-[9px] tracking-wider uppercase mb-1">
              <Building2 className="w-3 h-3" />
              <span>Incorporated Venture</span>
            </div>
            <h2 className="font-sans font-bold text-3xl text-white tracking-tight">
              {ROOTENT_COMPANY.name}
            </h2>
            <p className="font-sans text-sm text-zinc-400 max-w-2xl mt-1">
              My flagship boutique software operations and high-assurance developer tooling studio.
            </p>
          </div>
          <div className="font-mono text-xs text-zinc-500 bg-[#1a1a1f] px-3 py-1.5 rounded-lg border border-zinc-800/40">
            {ROOTENT_COMPANY.role} • {ROOTENT_COMPANY.timeline}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
          {/* Company Narrative & Focus Areas */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="bg-zinc-900/10 border border-zinc-800/30 p-6 rounded-2xl relative overflow-hidden flex-1 flex flex-col justify-center">
              <p className="font-sans text-zinc-300 text-md leading-relaxed">
                {ROOTENT_COMPANY.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ROOTENT_COMPANY.focusAreas.map((area, idx) => (
                <div key={idx} className="bg-zinc-900/5 border border-zinc-800/20 p-4 rounded-xl space-y-1">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">Focus {idx+1}</span>
                  <h4 className="font-sans font-bold text-sm text-zinc-200">{area.title}</h4>
                  <p className="font-sans text-xs text-zinc-400 leading-normal">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Metrics & SVG Flowchart */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#18181c] border border-zinc-800/40 p-6 rounded-2xl space-y-6">
            <h4 className="font-sans font-bold text-xs uppercase text-zinc-400 tracking-wider border-b border-zinc-800/30 pb-2 flex items-center space-x-2">
              <Workflow className="w-4 h-4 text-emerald-400" />
              <span>Continuous Synthesis Pipeline Overlay</span>
            </h4>

            {/* Custom high-craft representation of the Rootent operational model */}
            <div className="bg-zinc-900/30 rounded-xl p-3.5 border border-zinc-800/30 font-mono text-[9.5px] text-zinc-400 flex flex-col justify-center space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">[1] ER SPECIFICATION</span>
                <span className="text-zinc-650">----- yaml -----</span>
              </div>
              
              <div className="flex justify-center flex-col items-center py-1">
                <div className="w-0.5 h-4 bg-zinc-800/40" />
                <div className="bg-zinc-900/60 text-emerald-400 px-3 py-1 rounded border border-emerald-900/25 flex items-center space-x-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-spin opacity-80" />
                  <span className="font-semibold text-[10px]">ROOTENT META-COMPILER</span>
                </div>
                <div className="w-0.5 h-4 bg-zinc-800/40" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-[9px] font-mono">
                <div className="bg-zinc-900/30 p-1.5 border border-zinc-800/30 rounded">
                  <span className="text-zinc-400 block font-semibold">Postgres Relational DB API</span>
                  <span className="text-neutral-500 text-[8px]">Type-Safe Schema</span>
                </div>
                <div className="bg-zinc-900/30 p-1.5 border border-zinc-800/30 rounded">
                  <span className="text-zinc-400 block font-semibold">TypeScript Client Panel</span>
                  <span className="text-neutral-500 text-[8px]">100% Deterministic Code</span>
                </div>
              </div>

              <div className="border-t border-zinc-800/30 pt-2 text-[8px] text-center text-zinc-500">
                OUTPUT ENTIRELY GUARANTEED BY GRAPH CARDINALITY CHECKS
              </div>
            </div>

            {/* Business/Operations Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center border-t border-zinc-800/30 pt-4">
              {ROOTENT_COMPANY.stats.map((st, i) => (
                <div key={i} className="space-y-0.5">
                  <span className="font-mono text-xs text-zinc-500 block uppercase max-md:text-[9px]">{st.label}</span>
                  <span className="font-mono text-[16px] font-black text-white">{st.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Focus & Intersection */}
      <motion.div variants={itemVariants} className="space-y-6 border-t border-zinc-800/40 pt-10">
        <div>
          <h2 className="font-sans font-bold text-2xl text-white tracking-tight">Foundational Mindsets</h2>
          <p className="font-sans text-sm text-zinc-400">The architecture principles that prevent UI complexity from structural collapse.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SYSTEM_MINDSETS.map((mindset, index) => (
            <div
              key={index}
              className="bg-[#18181c]/60 border border-zinc-800/25 hover:border-zinc-700/40 p-5 rounded-xl hover:bg-zinc-800/20 transition-all duration-150 space-y-3"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/20">
                  {index === 0 && <Shield className="w-5 h-5 text-sky-400" />}
                  {index === 1 && <Cpu className="w-5 h-5 text-amber-500" />}
                  {index === 2 && <RefreshCw className="w-5 h-5 text-emerald-400" />}
                </div>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">{mindset.label}</span>
              </div>
              <h4 className="font-sans font-bold text-base text-zinc-100">{mindset.value}</h4>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">{mindset.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Personal Section: Beyond the Abstraction */}
      <motion.div variants={itemVariants} className="space-y-6 border-t border-zinc-900 pt-10">
        <div>
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block font-semibold mb-1">Human Operability</span>
          <h2 className="font-sans font-bold text-3.5xl text-white tracking-tight">Beyond the Abstraction</h2>
          <p className="font-sans text-sm text-zinc-400">Where the systemic mindset exits the keyboard and structures the physical layer of living.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cooking Box */}
          <div className="bg-[#18181c]/40 border border-zinc-800/25 p-6 rounded-2xl hover:border-zinc-700/40 hover:bg-zinc-800/20 transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center space-x-2.5">
                  <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/20 text-amber-400">
                    <ChefHat className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-sans font-bold text-lg text-zinc-100">{PERSONAL_SECTIONS.cooking.title}</h4>
                </div>
                <span className="font-mono text-[9px] text-zinc-500 bg-zinc-905 bg-zinc-900/40 px-2 py-1 rounded border border-zinc-800/20 uppercase">
                  {PERSONAL_SECTIONS.cooking.metric}
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {PERSONAL_SECTIONS.cooking.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/20 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>PARAMETER: HYDROLOGIC SOURDOUGH DOUGH</span>
              <span className="text-emerald-400">READY TO BAKE</span>
            </div>
          </div>

          {/* Watching Box */}
          <div className="bg-[#18181c]/40 border border-zinc-800/25 p-6 rounded-2xl hover:border-zinc-700/40 hover:bg-zinc-800/20 transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center space-x-2.5">
                  <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/20 text-sky-400">
                    <Tv className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-sans font-bold text-lg text-zinc-100">{PERSONAL_SECTIONS.watching.title}</h4>
                </div>
                <span className="font-mono text-[9px] text-zinc-500 bg-zinc-905 bg-zinc-900/40 px-2 py-1 rounded border border-zinc-800/20 uppercase">
                  {PERSONAL_SECTIONS.watching.metric}
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {PERSONAL_SECTIONS.watching.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/20 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>ABSTRACTION: NEURAL GHOST NETWORKS</span>
              <span className="text-indigo-400">SYNCHRONIZED</span>
            </div>
          </div>

          {/* Magic Box */}
          <div className="bg-[#18181c]/40 border border-zinc-800/25 p-6 rounded-2xl hover:border-zinc-700/40 hover:bg-zinc-800/20 transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center space-x-2.5">
                  <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/20 text-violet-400">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-sans font-bold text-lg text-zinc-100">{PERSONAL_SECTIONS.magic.title}</h4>
                </div>
                <span className="font-mono text-[9px] text-zinc-500 bg-zinc-905 bg-zinc-900/40 px-2 py-1 rounded border border-zinc-800/20 uppercase">
                  {PERSONAL_SECTIONS.magic.metric}
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {PERSONAL_SECTIONS.magic.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/20 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>ALGORITHM: RECURSIVE SHUFFLE PASS</span>
              <span className="text-purple-400">ZERO LATENCY</span>
            </div>
          </div>

          {/* Social Box */}
          <div className="bg-[#18181c]/40 border border-zinc-800/25 p-6 rounded-2xl hover:border-zinc-700/40 hover:bg-zinc-800/20 transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center space-x-2.5">
                  <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/20 text-emerald-400">
                    <Users className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-sans font-bold text-lg text-zinc-100">{PERSONAL_SECTIONS.social.title}</h4>
                </div>
                <span className="font-mono text-[9px] text-zinc-500 bg-zinc-905 bg-zinc-900/40 px-2 py-1 rounded border border-zinc-800/20 uppercase">
                  {PERSONAL_SECTIONS.social.metric}
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {PERSONAL_SECTIONS.social.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/20 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>LOCAL HUB: BENGALURU OPERATOR MAPS</span>
              <span className="text-emerald-400">ACTIVE CONTRIB</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Production Case Studies Section (Real Products) */}
      <motion.div variants={itemVariants} className="space-y-6 border-t border-zinc-800/40 pt-10">
        <div>
          <h2 className="font-sans font-bold text-2xl text-white tracking-tight">Engineered Architectures</h2>
          <p className="font-sans text-sm text-zinc-400">Core operational software products I have designed and deployed representing systemic logic over quick tricks.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS_DATABASE.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#18181c]/60 border border-zinc-800/25 hover:border-zinc-700/40 p-6 rounded-xl flex flex-col justify-between hover:bg-zinc-800/25 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">{proj.type}</span>
                    <h4 className="font-sans font-bold text-lg text-white group-hover:text-zinc-100 transition-colors mt-1">
                      {proj.title}
                    </h4>
                  </div>
                  <span className="font-sans text-xs font-semibold px-2.5 py-1 rounded bg-zinc-800/40 text-zinc-300">
                    {proj.role}
                  </span>
                </div>

                <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-4">
                  {proj.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/20 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="font-mono text-[9px] text-zinc-400 bg-zinc-900/40 border border-zinc-800/20 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-1.5 text-zinc-500 font-mono text-[10px]">
                  <Radio className="w-3.5 h-3.5 text-emerald-405 text-emerald-500" />
                  <span>METRIC: {proj.stats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* The Crucial Paradigm Transition Shift Visual */}
      <motion.div variants={itemVariants} className="bg-zinc-900/10 border border-zinc-800/30 p-6 rounded-2xl md:p-8 space-y-6">
        <h3 className="font-sans font-bold text-xl text-neutral-100 flex items-center space-x-2">
          <Award className="w-5 h-5 text-zinc-400" />
          <span>Strategic Trajectory Shift</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 space-y-2">
            <span className="font-mono text-[10px] text-red-400 tracking-wider block uppercase">Yesterday (The Old Ceiling)</span>
            <h4 className="font-sans font-bold text-lg text-zinc-200">Workflow Automation & Simple SaaS</h4>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              Standard SaaS models, customer support bots, basic CRUD platforms, and simple workflow triggers. Building wrappers that simply pipe text from A to B.
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col items-center justify-center py-2">
            <span className="font-mono text-zinc-500 text-xs hidden md:block">SHIFT</span>
            <div className="w-8 h-8 rounded-full bg-zinc-800/60 border border-zinc-800/30 flex items-center justify-center text-zinc-300 font-bold my-1 max-md:rotate-90">
              →
            </div>
            <span className="font-mono text-emerald-400 text-xs tracking-wider font-bold">INTELLIGENCE</span>
          </div>

          <div className="md:col-span-5 space-y-2 text-right max-md:text-left">
            <span className="font-mono text-[10px] text-emerald-400 tracking-wider block uppercase">Future Core Vector</span>
            <h4 className="font-sans font-bold text-lg text-zinc-100">Foundational Intelligence Infrastructure</h4>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              World models, multi-agent simulation frameworks, corporate intelligence engines, and generative compilers that construct zero-bug structural code bases from mathematical systems designs.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/20 p-4 rounded-xl text-center">
          <span className="font-sans text-xs text-zinc-300 font-medium">
            &ldquo;You’re moving toward a platform category creator — building the fundamental layers others construct upon.&rdquo;
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
