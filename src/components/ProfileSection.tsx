import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Cpu, RefreshCw, ChevronRight, Layers, Award, Radio, 
  Sparkles, Users, Briefcase, Building2, Play, Terminal, 
  ArrowRight, Workflow, ExternalLink, HardDrive, CheckCircle2, AlertTriangle, 
  Settings, PlayCircle, Eye, Network, Code2, Binary, Type, Languages, ShieldCheck,
  Landmark, Newspaper, ArrowUpRight, ShieldAlert, Bot
} from 'lucide-react';
import { 
  SHREEHARSHA_BIO, 
  SYSTEM_MINDSETS, 
  PROJECTS_DATABASE, 
  ROOTENT_COMPANY, 
  PERSONAL_SECTIONS,
  VLSI_BACKGROUND,
  INDIC_FONT_EXPERIENCE,
  CONVERSATIONAL_AI_BACKGROUND,
  ACCOMPLISHMENTS_AND_PRESS 
} from '../data';

interface ProfileSectionProps {
  onNavigateToBlogs: (type: string) => void;
  onNavigateToContact: () => void;
}

export default function ProfileSection({ onNavigateToBlogs, onNavigateToContact }: ProfileSectionProps) {
  // Architect's Tensions State
  const [activeTension, setActiveTension] = useState<'rigor' | 'heuristics' | 'isolation'>('rigor');
  
  // Specialized Engineering Domain Tab
  const [activeDomainTab, setActiveDomainTab] = useState<'vlsi' | 'indic' | 'conversational'>('vlsi');

  // Interactive VLSI Verification stepper
  const [vlsiStep, setVlsiStep] = useState<number>(1);

  // Interactive Indic ligature demo index
  const [indicLigatureIdx, setIndicLigatureIdx] = useState<number>(0);

  // Interactive Rasa NLU demo index
  const [activeNluIdx, setActiveNluIdx] = useState<number>(0);

  // Project Category Filter
  const [projectFilter, setProjectFilter] = useState<string>('all');

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
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-zinc-800/30 px-3.5 py-1.5 rounded-full select-none">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase">Active Operator Node</span>
            </div>
            <a
              href="https://x.com/harshaperla"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-amber-950/25 hover:bg-amber-900/40 border border-amber-800/30 hover:border-amber-700/50 px-3 py-1.5 rounded-full text-amber-300 font-mono text-[10px] transition-all group"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Followed by PM @narendramodi: in X</span>
              <ArrowUpRight className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <a
              href="#accomplishments-section"
              className="inline-flex items-center space-x-1.5 bg-zinc-900/40 hover:bg-zinc-800/50 border border-zinc-800/30 px-3 py-1.5 rounded-full text-zinc-400 hover:text-white font-mono text-[10px] transition-colors"
            >
              <Newspaper className="w-3 h-3 text-sky-400" />
              <span>Featured in The Hindu &amp; Scroll</span>
              <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
            </a>
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
            I&apos;m <span className="font-mono tracking-tight uppercase"><span className="text-zinc-600 font-light select-none">SHREE</span><span className="text-white font-extrabold">HARSHA PERLA</span></span>.
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
                  Three internal cognitive friction loops that shape how I design software and silicon.
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
                  <span>1. Silicon Rigor vs. Velocity</span>
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
                  <span>2. Determinism vs. Fuzzy AI</span>
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
                  <span>3. Solitude vs. Indic Guild Nodes</span>
                  <span className="font-mono text-[10px] text-zinc-500">60% / 40%</span>
                </button>
              </div>

              {/* Visual Duality Bar */}
              <div className="space-y-1.5 bg-zinc-900/20 p-4 mx-0.5 border border-zinc-800/30 rounded-xl">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-zinc-500">
                    {activeTension === 'rigor' && 'FIRST-PRINCIPLES SPEC & SVA'}
                    {activeTension === 'heuristics' && 'DETERMINISTIC CONSTRAINTS'}
                    {activeTension === 'isolation' && 'DEEP-WORK ASYNCHRONY'}
                  </span>
                  <span className="text-emerald-400 font-semibold text-right">
                    {activeTension === 'rigor' && 'REAL-WORLD VELOCITY'}
                    {activeTension === 'heuristics' && 'MODEL HEURISTICS'}
                    {activeTension === 'isolation' && 'INDIC GUILD COUPLING'}
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
                      Trained in hardware verification where bugs mean multimillion-dollar tape-out re-spins, I battle the urge to engineer flawless meta-compilers before shipping. I reconcile this with an operator rule: <strong className="text-white">any abstraction that hasn&apos;t saved manual labor twice is a distraction.</strong> Design schemas with silicon-grade rigor, then ship immediate working loops.
                    </p>
                  )}
                  {activeTension === 'heuristics' && (
                    <p>
                      Stochastic models create plausible facades that crumble under boundary conditions. I refuse unanchored software. <strong className="text-white">We pipe generative intelligence inside formal state enclosures.</strong> Models may propose transitions, but our schemas, AST validators, and database constraints completely bound drift.
                    </p>
                  )}
                  {activeTension === 'isolation' && (
                    <p>
                      High-assurance architectures require sustained periods of focused solitude—analyzing wave dumps, postgres execution plans, and OpenType ligature tables. But isolation loses real-world grounding. I anchor myself in Bengaluru&apos;s dev networks, Kannada linguistic conservation, and Indian transliteration systems (indic.top).
                    </p>
                  )}
                </div>

                <div className="border-t border-zinc-800/30 pt-3 flex items-center space-x-2 text-[10px] font-mono text-zinc-500 select-none">
                  <Terminal className="w-3.5 h-3.5 text-zinc-650 shrink-0" />
                  <span className="truncate">
                    {activeTension === 'rigor' && 'SYSTEM_BYLAW: silicon_assertion_pass.sv'}
                    {activeTension === 'heuristics' && 'SYSTEM_BYLAW: schema_assertion_compiler'}
                    {activeTension === 'isolation' && 'SYSTEM_BYLAW: bengaluru_indic_node_coupling'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Specialized Dual Engineering Pillars: Silicon Verification & Indic Typography */}
      <motion.div variants={itemVariants} className="space-y-6 border-t border-zinc-800/40 pt-10" id="specialized-domains-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-sky-950/30 border border-sky-800/30 px-2.5 py-0.5 rounded text-sky-400 font-mono text-[9px] tracking-wider uppercase mb-1">
              <Binary className="w-3 h-3 text-sky-400" />
              <span>Specialized Technical Foundations</span>
            </div>
            <h2 className="font-sans font-bold text-3xl text-white tracking-tight">
              Hardware Verification, Pre-LLM AI &amp; Indic Computing
            </h2>
            <p className="font-sans text-sm text-zinc-400 max-w-2xl mt-1">
              The foundational specialized disciplines that anchor my systems thinking: hardware-grade determinism from VLSI, zero-hallucination conversational AI with Rasa NLU at anokhi.ai, and complex state-machine typography for Indian scripts.
            </p>
          </div>

          {/* Interactive Domain Switcher */}
          <div className="flex flex-wrap p-1 bg-zinc-900/60 border border-zinc-800/40 rounded-xl gap-1 shrink-0">
            <button
              onClick={() => setActiveDomainTab('vlsi')}
              className={`flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-sans text-xs font-semibold transition-all cursor-pointer ${
                activeDomainTab === 'vlsi'
                  ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>Silicon Verification (VLSI)</span>
            </button>
            <button
              onClick={() => setActiveDomainTab('indic')}
              className={`flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-sans text-xs font-semibold transition-all cursor-pointer ${
                activeDomainTab === 'indic'
                  ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>Indic &amp; Kannada Typography</span>
            </button>
            <button
              onClick={() => setActiveDomainTab('conversational')}
              className={`flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-sans text-xs font-semibold transition-all cursor-pointer ${
                activeDomainTab === 'conversational'
                  ? 'bg-zinc-800 text-white shadow-md border border-purple-700/50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Conversational AI (anokhi.ai / Rasa)</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeDomainTab === 'vlsi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Narrative & Key Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="bg-[#18181c]/70 border border-zinc-800/40 p-6 rounded-2xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800/30 pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span className="font-mono text-xs uppercase tracking-wider text-sky-300 font-semibold">
                      {VLSI_BACKGROUND.subtitle}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] bg-sky-950/40 text-sky-400 px-2 py-0.5 rounded border border-sky-900/30">
                    Zero-Defect Standard
                  </span>
                </div>

                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  {VLSI_BACKGROUND.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {VLSI_BACKGROUND.highlights.map((h, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-800/30 p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center space-x-1.5 text-zinc-200 font-sans font-bold text-xs">
                        <Cpu className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{h.title}</span>
                      </div>
                      <p className="font-sans text-[11px] text-zinc-400 leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Metrics row */}
              <div className="bg-zinc-900/30 border border-zinc-800/30 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {VLSI_BACKGROUND.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="font-mono text-[9.5px] text-zinc-400 bg-[#121215] border border-zinc-800/40 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 shrink-0 text-center border-t md:border-t-0 md:border-l border-zinc-800/30 pt-2 md:pt-0 md:pl-4">
                  {VLSI_BACKGROUND.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <span className="font-mono text-[9px] text-zinc-500 uppercase block">{m.label}</span>
                      <span className="font-mono text-sm font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Hardware Verification & SVA Console */}
            <div className="lg:col-span-5 bg-[#18181c] border border-zinc-800/40 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl">
              <div className="border-b border-zinc-800/30 pb-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span className="font-mono text-xs font-semibold text-zinc-200">
                    Cycle-Accurate Assertion Log
                  </span>
                </div>
                <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/30">
                  Synopsys VCS Flow
                </span>
              </div>

              {/* Cycle Stepper Selector */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-900/60 rounded-lg font-mono text-[10px]">
                {[
                  { step: 1, label: '01: RESET' },
                  { step: 2, label: '02: RANDOM' },
                  { step: 3, label: '03: SVA CHK' },
                  { step: 4, label: '04: COV 100%' },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setVlsiStep(s.step)}
                    className={`py-1.5 px-1 rounded transition-all text-center cursor-pointer ${
                      vlsiStep === s.step
                        ? 'bg-sky-950/60 text-sky-300 font-bold border border-sky-800/50'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Interactive Waveform / Log Simulation Display */}
              <div className="bg-[#101013] border border-zinc-800/50 rounded-xl p-4 font-mono text-[11px] space-y-2.5 shadow-inner">
                {vlsiStep === 1 && (
                  <div className="space-y-1.5">
                    <span className="text-zinc-500 block text-[9.5px]">// T=0ns: POR (Power-On-Reset) Sequence</span>
                    <div className="text-sky-300 font-bold">CLK &lt;= 0; RST_N &lt;= 0; FSM_STATE &lt;= S_RESET;</div>
                    <div className="text-zinc-400 text-[10px]">Assertions armed: property p_reset_state_valid;</div>
                    <div className="text-emerald-400 flex items-center space-x-1.5 text-[10px] pt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Zero bus contention. All registers initialized to known states.</span>
                    </div>
                  </div>
                )}
                {vlsiStep === 2 && (
                  <div className="space-y-1.5">
                    <span className="text-zinc-500 block text-[9.5px]">// T=25ns: UVM Constrained-Random Driver</span>
                    <div className="text-amber-300 font-bold">uvm_do_with(req_pkt, &#123; pkt_len in [64:1518]; &#125;);</div>
                    <div className="text-zinc-400 text-[10px]">Interface bus driven over clock domain crossing (CDC).</div>
                    <div className="text-sky-400 flex items-center space-x-1.5 text-[10px] pt-1">
                      <CheckCircle2 className="w-3 h-3 text-sky-400" />
                      <span>FSM transition: S_IDLE → S_CAPTURE_PAYLOAD verified.</span>
                    </div>
                  </div>
                )}
                {vlsiStep === 3 && (
                  <div className="space-y-1.5">
                    <span className="text-zinc-500 block text-[9.5px]">// T=45ns: SystemVerilog Assertions (SVA) Validation</span>
                    <div className="text-emerald-300 font-bold">assert property (@(posedge clk) req |-&gt; ##[1:3] ack);</div>
                    <div className="text-zinc-400 text-[10px]">Synopsys VCS formal verification engine: PASS.</div>
                    <div className="text-emerald-400 flex items-center space-x-1.5 text-[10px] pt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Zero protocol violations detected over 10M test vectors.</span>
                    </div>
                  </div>
                )}
                {vlsiStep === 4 && (
                  <div className="space-y-1.5">
                    <span className="text-zinc-500 block text-[9.5px]">// T=120ns: Cross-Coverage Closure</span>
                    <div className="text-emerald-300 font-bold">COVERGROUP cg_protocol_matrix: 100.0% COVERED</div>
                    <div className="text-zinc-400 text-[10px]">All corner cases, FIFO overflows &amp; error injections hit.</div>
                    <div className="text-emerald-400 flex items-center space-x-1.5 text-[10px] pt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Silicon tape-out ready. Determinism carried into software.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Legacy Note on electroSofts */}
              <div className="border-t border-zinc-800/30 pt-3 flex items-start space-x-2 text-[10px] text-zinc-400 font-sans">
                <Radio className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  Author of tutorials on <strong className="text-white">electroSofts.com</strong>, which helped over 1,000,000 engineering students and VLSI professionals master Verilog, VHDL, and digital design.
                </span>
              </div>
            </div>
          </div>
        )}

        {activeDomainTab === 'indic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Narrative & Key Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="bg-[#18181c]/70 border border-zinc-800/40 p-6 rounded-2xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800/30 pb-3">
                  <div className="flex items-center space-x-2">
                    <Type className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                      {INDIC_FONT_EXPERIENCE.subtitle}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/30">
                    OpenType &amp; CTL Standard
                  </span>
                </div>

                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  {INDIC_FONT_EXPERIENCE.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {INDIC_FONT_EXPERIENCE.highlights.map((h, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-800/30 p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center space-x-1.5 text-zinc-200 font-sans font-bold text-xs">
                        <Languages className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{h.title}</span>
                      </div>
                      <p className="font-sans text-[11px] text-zinc-400 leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Metrics row */}
              <div className="bg-zinc-900/30 border border-zinc-800/30 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {INDIC_FONT_EXPERIENCE.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="font-mono text-[9.5px] text-zinc-400 bg-[#121215] border border-zinc-800/40 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 shrink-0 text-center border-t md:border-t-0 md:border-l border-zinc-800/30 pt-2 md:pt-0 md:pl-4">
                  {INDIC_FONT_EXPERIENCE.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <span className="font-mono text-[9px] text-zinc-500 uppercase block">{m.label}</span>
                      <span className="font-mono text-sm font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Kannada Glyph Shaping & OpenType GSUB Inspector */}
            <div className="lg:col-span-5 bg-[#18181c] border border-zinc-800/40 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl">
              <div className="border-b border-zinc-800/30 pb-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Languages className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs font-semibold text-zinc-200">
                    OpenType GSUB/GPOS Shaping Engine
                  </span>
                </div>
                <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/30">
                  HarfBuzz / Uniscribe
                </span>
              </div>

              {/* Ligature Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-900/60 rounded-lg font-mono text-[10px]">
                {[
                  { idx: 0, label: 'ಕ್ಷ (ksha)', desc: 'Dual Conjunct' },
                  { idx: 1, label: 'ಸ್ತ (sta)', desc: 'Sub-base Vattu' },
                  { idx: 2, label: 'ಕ್ಷ್ಮ (kshma)', desc: 'Triple Cluster' },
                ].map((l) => (
                  <button
                    key={l.idx}
                    onClick={() => setIndicLigatureIdx(l.idx)}
                    className={`py-1.5 px-2 rounded transition-all text-center cursor-pointer ${
                      indicLigatureIdx === l.idx
                        ? 'bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-800/50'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <div className="font-sans text-sm font-bold">{l.label}</div>
                    <div className="text-[8px] opacity-75">{l.desc}</div>
                  </button>
                ))}
              </div>

              {/* Glyph Shaping Decomposition Display */}
              <div className="bg-[#101013] border border-zinc-800/50 rounded-xl p-4 space-y-3 shadow-inner">
                {indicLigatureIdx === 0 && (
                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                      <span>[1] UNICODE INPUT STREAM</span>
                      <span>UTF-8 ENCODED</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-zinc-900/40 p-2 rounded border border-zinc-800/30 font-sans text-zinc-200">
                      <span className="bg-zinc-800 px-2 py-1 rounded text-white font-bold">ಕ (0x0C95)</span>
                      <span className="text-zinc-500">+</span>
                      <span className="bg-zinc-800 px-2 py-1 rounded text-amber-300 font-bold">್ (0x0CCD)</span>
                      <span className="text-zinc-500">+</span>
                      <span className="bg-zinc-800 px-2 py-1 rounded text-white font-bold">ಷ (0x0CB7)</span>
                    </div>

                    <div className="border-t border-zinc-800/30 pt-2 flex items-center justify-between">
                      <span className="text-zinc-400 text-[10px]">GSUB Feature: &apos;akhn&apos; (Akhand Ligature)</span>
                      <span className="text-emerald-400 font-bold text-xs">Lookup → SubTable 1</span>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-800/30 p-2.5 rounded text-center">
                      <span className="text-zinc-400 text-[10px] block font-mono">SYNTHESIZED OPENTYPE GLYPH</span>
                      <span className="font-sans text-3xl font-extrabold text-white tracking-wider">ಕ್ಷ</span>
                      <span className="text-emerald-400 block text-[9px] mt-0.5">GlyphID: 0x02AB • Accurate Baseline Offset</span>
                    </div>
                  </div>
                )}

                {indicLigatureIdx === 1 && (
                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                      <span>[1] UNICODE INPUT STREAM</span>
                      <span>SUB-BASE VATTHU</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-zinc-900/40 p-2 rounded border border-zinc-800/30 font-sans text-zinc-200">
                      <span className="bg-zinc-800 px-2 py-1 rounded text-white font-bold">ಸ (0x0CB8)</span>
                      <span className="text-zinc-500">+</span>
                      <span className="bg-zinc-800 px-2 py-1 rounded text-amber-300 font-bold">್ (0x0CCD)</span>
                      <span className="text-zinc-500">+</span>
                      <span className="bg-zinc-800 px-2 py-1 rounded text-white font-bold">ತ (0x0CA4)</span>
                    </div>

                    <div className="border-t border-zinc-800/30 pt-2 flex items-center justify-between">
                      <span className="text-zinc-400 text-[10px]">GPOS Feature: &apos;blws&apos; (Below-base Substitution)</span>
                      <span className="text-emerald-400 font-bold text-xs">Anchor: BaseBottom - SubTop</span>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-800/30 p-2.5 rounded text-center">
                      <span className="text-zinc-400 text-[10px] block font-mono">SYNTHESIZED OPENTYPE GLYPH</span>
                      <span className="font-sans text-3xl font-extrabold text-white tracking-wider">ಸ್ತ</span>
                      <span className="text-emerald-400 block text-[9px] mt-0.5">GlyphID: 0x01EF (Base &apos;ಸ&apos; + Sub-base &apos;ತ-ವತ್ತು&apos;)</span>
                    </div>
                  </div>
                )}

                {indicLigatureIdx === 2 && (
                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                      <span>[1] UNICODE INPUT STREAM</span>
                      <span>RECURSIVE CONJUNCT</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-zinc-900/40 p-2 rounded border border-zinc-800/30 font-sans text-zinc-200 text-xs">
                      <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">ಕ</span>
                      <span className="text-zinc-500">+</span>
                      <span className="text-amber-400 font-bold">್</span>
                      <span className="text-zinc-500">+</span>
                      <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">ಷ</span>
                      <span className="text-zinc-500">+</span>
                      <span className="text-amber-400 font-bold">್</span>
                      <span className="text-zinc-500">+</span>
                      <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-white font-bold">ಮ</span>
                    </div>

                    <div className="border-t border-zinc-800/30 pt-2 flex items-center justify-between">
                      <span className="text-zinc-400 text-[10px]">Pipeline: &apos;akhn&apos; (ಕ್ಷ) + &apos;blws&apos; (ಮ-ವತ್ತು)</span>
                      <span className="text-emerald-400 font-bold text-xs">Multi-Tier Positioning</span>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-800/30 p-2.5 rounded text-center">
                      <span className="text-zinc-400 text-[10px] block font-mono">SYNTHESIZED OPENTYPE GLYPH</span>
                      <span className="font-sans text-3xl font-extrabold text-white tracking-wider">ಕ್ಷ್ಮ</span>
                      <span className="text-emerald-400 block text-[9px] mt-0.5">High-Precision Complex Cluster Positioning</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Legacy Font Conversion Note */}
              <div className="border-t border-zinc-800/30 pt-3 flex items-start space-x-2 text-[10px] text-zinc-400 font-sans">
                <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Author of bidirectional converters for <strong className="text-white">Nudi &amp; Baraha ASCII encodings</strong> to Unicode UTF-8, preserving decades of historical Kannada digital literature.
                </span>
              </div>
            </div>
          </div>
        )}

        {activeDomainTab === 'conversational' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Narrative & Key Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="bg-[#18181c]/70 border border-purple-900/30 p-6 rounded-2xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800/30 pb-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-purple-400" />
                    <span className="font-mono text-xs uppercase tracking-wider text-purple-300 font-semibold">
                      {CONVERSATIONAL_AI_BACKGROUND.subtitle}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] bg-purple-950/40 text-purple-400 px-2 py-0.5 rounded border border-purple-900/30 font-semibold">
                    Zero-Hallucination Standard
                  </span>
                </div>

                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  {CONVERSATIONAL_AI_BACKGROUND.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {CONVERSATIONAL_AI_BACKGROUND.highlights.map((h, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-800/30 p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center space-x-1.5 text-zinc-200 font-sans font-bold text-xs">
                        <Workflow className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{h.title}</span>
                      </div>
                      <p className="font-sans text-[11px] text-zinc-400 leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Metrics row */}
              <div className="bg-zinc-900/30 border border-zinc-800/30 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {CONVERSATIONAL_AI_BACKGROUND.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="font-mono text-[9.5px] text-zinc-400 bg-[#121215] border border-zinc-800/40 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 shrink-0 text-center border-t md:border-t-0 md:border-l border-zinc-800/30 pt-2 md:pt-0 md:pl-4">
                  {CONVERSATIONAL_AI_BACKGROUND.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <span className="font-mono text-[9px] text-zinc-500 uppercase block">{m.label}</span>
                      <span className="font-mono text-sm font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Rasa NLU & State Machine Inspector */}
            <div className="lg:col-span-5 bg-[#141418] border border-purple-900/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/30 pb-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span className="font-mono text-xs text-zinc-200 font-bold uppercase tracking-wider">
                    Rasa NLU Pipeline (anokhi.ai)
                  </span>
                </div>
                <span className="font-mono text-[9px] text-purple-400 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/30">
                  DIET &amp; FormAction FSM
                </span>
              </div>

              {/* Sample Utterance Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-900/60 rounded-lg font-mono text-[10px]">
                {[
                  { idx: 0, label: 'Reschedule', desc: 'Slot Collection' },
                  { idx: 1, label: 'Cancellation', desc: 'Regex / Policy' },
                  { idx: 2, label: 'Interruption', desc: 'Context Switch' },
                ].map((s) => (
                  <button
                    key={s.idx}
                    onClick={() => setActiveNluIdx(s.idx)}
                    className={`py-1.5 px-2 rounded transition-all text-center cursor-pointer ${
                      activeNluIdx === s.idx
                        ? 'bg-purple-950/60 text-purple-300 font-bold border border-purple-800/50'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <div className="font-sans text-xs font-bold">{s.label}</div>
                    <div className="text-[8px] opacity-75">{s.desc}</div>
                  </button>
                ))}
              </div>

              {/* NLU Pipeline Stage Inspector */}
              <div className="bg-[#101013] border border-zinc-800/50 rounded-xl p-4 space-y-3.5 shadow-inner">
                {activeNluIdx === 0 && (
                  <div className="space-y-2.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                      <span>[1] INGESTED USER UTTERANCE</span>
                      <span className="text-purple-400">RAW TEXT</span>
                    </div>
                    <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/40 font-sans text-zinc-200 text-xs italic">
                      &ldquo;Reschedule my policy review meeting to Friday at 4pm with Dr. Rao&rdquo;
                    </div>

                    <div className="border-t border-zinc-800/30 pt-2 flex items-center justify-between text-[10px]">
                      <span className="text-zinc-400">DIET CLASSIFIER INTENT:</span>
                      <span className="text-emerald-400 font-bold">reschedule_appointment (98.4%)</span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-zinc-500 text-[9px] block">EXTRACTED ENTITIES &amp; SLOTS:</span>
                      <div className="grid grid-cols-1 gap-1 text-[10px]">
                        <div className="bg-zinc-900/40 px-2 py-1 rounded flex justify-between">
                          <span className="text-zinc-400">event_type:</span>
                          <span className="text-purple-300 font-semibold">&ldquo;policy review meeting&rdquo; (CRF)</span>
                        </div>
                        <div className="bg-zinc-900/40 px-2 py-1 rounded flex justify-between">
                          <span className="text-zinc-400">date_time:</span>
                          <span className="text-purple-300 font-semibold">Friday 4pm → 2026-11-06T16:00 (Duckling)</span>
                        </div>
                        <div className="bg-zinc-900/40 px-2 py-1 rounded flex justify-between">
                          <span className="text-zinc-400">person:</span>
                          <span className="text-purple-300 font-semibold">&ldquo;Dr. Rao&rdquo; (SpacyEntity)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-950/20 border border-purple-800/30 p-2.5 rounded text-center space-y-0.5">
                      <span className="text-zinc-400 text-[9px] block">ACTIVE DIALOGUE POLICY</span>
                      <span className="font-mono text-xs font-bold text-white block">FormAction: AppointmentBookingForm</span>
                      <span className="text-emerald-400 text-[9px] block">Slots Completed → DB Commit (Zero Hallucination)</span>
                    </div>
                  </div>
                )}

                {activeNluIdx === 1 && (
                  <div className="space-y-2.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                      <span>[1] INGESTED USER UTTERANCE</span>
                      <span className="text-purple-400">REGULATED FLOW</span>
                    </div>
                    <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/40 font-sans text-zinc-200 text-xs italic">
                      &ldquo;Cancel policy POL-88219 and issue immediate refund to my UPI&rdquo;
                    </div>

                    <div className="border-t border-zinc-800/30 pt-2 flex items-center justify-between text-[10px]">
                      <span className="text-zinc-400">DIET CLASSIFIER INTENT:</span>
                      <span className="text-emerald-400 font-bold">cancel_policy_refund (99.1%)</span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-zinc-500 text-[9px] block">EXTRACTED ENTITIES &amp; SLOTS:</span>
                      <div className="grid grid-cols-1 gap-1 text-[10px]">
                        <div className="bg-zinc-900/40 px-2 py-1 rounded flex justify-between">
                          <span className="text-zinc-400">policy_id:</span>
                          <span className="text-purple-300 font-semibold">&ldquo;POL-88219&rdquo; (Regex: ^[A-Z]{3}-[0-9]{5}$)</span>
                        </div>
                        <div className="bg-zinc-900/40 px-2 py-1 rounded flex justify-between">
                          <span className="text-zinc-400">channel:</span>
                          <span className="text-purple-300 font-semibold">&ldquo;UPI&rdquo; (Predefined Lookup Table)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-950/20 border border-purple-800/30 p-2.5 rounded text-center space-y-0.5">
                      <span className="text-zinc-400 text-[9px] block">ACTIVE DIALOGUE POLICY</span>
                      <span className="font-mono text-xs font-bold text-white block">RulePolicy (Strict Compliance)</span>
                      <span className="text-emerald-400 text-[9px] block">Eligibility Guard Passed → 2FA Trigger</span>
                    </div>
                  </div>
                )}

                {activeNluIdx === 2 && (
                  <div className="space-y-2.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                      <span>[1] INGESTED USER UTTERANCE</span>
                      <span className="text-purple-400">MULTI-TURN CHAT</span>
                    </div>
                    <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/40 font-sans text-zinc-200 text-xs italic">
                      &ldquo;Transfer 5000 to account 4091. Wait, what is my current balance first?&rdquo;
                    </div>

                    <div className="border-t border-zinc-800/30 pt-2 flex items-center justify-between text-[10px]">
                      <span className="text-zinc-400">COMPOUND INTENT:</span>
                      <span className="text-amber-400 font-bold">check_balance (Interrupt)</span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-zinc-500 text-[9px] block">SLOT BUFFERING IN DIALOGUE TRACKER:</span>
                      <div className="grid grid-cols-1 gap-1 text-[10px]">
                        <div className="bg-zinc-900/40 px-2 py-1 rounded flex justify-between">
                          <span className="text-zinc-400">buffered_amount:</span>
                          <span className="text-zinc-300 font-semibold">&ldquo;5000 INR&rdquo; (Buffered in Tracker)</span>
                        </div>
                        <div className="bg-zinc-900/40 px-2 py-1 rounded flex justify-between">
                          <span className="text-zinc-400">buffered_account:</span>
                          <span className="text-zinc-300 font-semibold">&ldquo;4091&rdquo; (Held in Slot)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-950/20 border border-purple-800/30 p-2.5 rounded text-center space-y-0.5">
                      <span className="text-zinc-400 text-[9px] block">ACTIVE DIALOGUE POLICY</span>
                      <span className="font-mono text-xs font-bold text-white block">TEDPolicy (Transformer Dialogue)</span>
                      <span className="text-purple-300 text-[9px] block">Suspend Transfer Form → Reply Balance → Resume Form</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Conversational Paradigm Footnote */}
              <div className="border-t border-zinc-800/30 pt-3 flex items-start space-x-2 text-[10px] text-zinc-400 font-sans">
                <Workflow className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>
                  At <strong className="text-white">anokhi.ai</strong>, we proved that production conversational AI in high-stakes enterprise must combine formal state tracking with NLU pipelines—eliminating unconstrained hallucination risks.
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

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

      {/* Public Impact, Accomplishments & Press Coverage Section */}
      <motion.div variants={itemVariants} className="space-y-6 border-t border-zinc-800/40 pt-10" id="accomplishments-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-amber-950/25 border border-amber-800/30 px-2.5 py-0.5 rounded text-amber-300 font-mono text-[9px] tracking-wider uppercase mb-1">
              <Award className="w-3 h-3 text-amber-400" />
              <span>Public Impact &amp; Recognition</span>
            </div>
            <h2 className="font-sans font-bold text-3xl text-white tracking-tight">
              Accomplishments &amp; News Coverage
            </h2>
            <p className="font-sans text-sm text-zinc-400 max-w-2xl mt-1">
              National cybersecurity audits, executive digital governance platforms, and social recognition from the Head of Government.
            </p>
          </div>

          <div className="font-mono text-xs text-zinc-500 bg-[#18181c] px-3 py-1.5 rounded-lg border border-zinc-800/40 shrink-0">
            Public Influence Track Record
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {ACCOMPLISHMENTS_AND_PRESS.map((item) => {
            const isModi = item.iconType === 'modi';
            const isSecurity = item.iconType === 'security';

            return (
              <div
                key={item.id}
                className={`bg-[#18181c]/70 border rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all hover:bg-zinc-800/20 group relative overflow-hidden ${
                  isModi 
                    ? 'border-amber-900/30 hover:border-amber-700/50' 
                    : isSecurity 
                    ? 'border-red-900/30 hover:border-red-700/50' 
                    : 'border-sky-900/30 hover:border-sky-700/50'
                }`}
              >
                {/* Ambient glow accent */}
                <div 
                  className={`absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl pointer-events-none ${
                    isModi 
                      ? 'bg-amber-500/5' 
                      : isSecurity 
                      ? 'bg-red-500/5' 
                      : 'bg-sky-500/5'
                  }`} 
                />

                <div className="space-y-4 relative z-10">
                  {/* Category and Date Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800/30 pb-3">
                    <div className="flex items-center space-x-2">
                      {isModi && <Landmark className="w-4 h-4 text-amber-400" />}
                      {isSecurity && <ShieldAlert className="w-4 h-4 text-red-400" />}
                      {!isModi && !isSecurity && <Newspaper className="w-4 h-4 text-sky-400" />}
                      <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-zinc-300">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-zinc-500 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800/30">
                      {item.date}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <span 
                      className={`font-mono text-[9px] uppercase tracking-widest block font-bold mb-1 ${
                        isModi 
                          ? 'text-amber-400' 
                          : isSecurity 
                          ? 'text-red-400' 
                          : 'text-sky-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                    <h3 className="font-sans font-bold text-lg text-white leading-snug group-hover:text-zinc-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-zinc-400 mt-1 italic">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Key Highlights / Bullets */}
                  <div className="space-y-2 pt-1 border-t border-zinc-800/20">
                    {item.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2 text-[11px] font-sans text-zinc-400">
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          isModi ? 'text-amber-400/80' : isSecurity ? 'text-red-400/80' : 'text-sky-400/80'
                        }`} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pull Quote if available */}
                  {item.quote && (
                    <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/30 font-sans text-[11px] text-zinc-300 italic border-l-2 border-emerald-500/60">
                      &ldquo;{item.quote}&rdquo;
                      {item.quoteAuthor && (
                        <span className="block not-italic font-mono text-[9px] text-zinc-500 mt-1">
                          —{' '}
                          {(item.quoteUrl || item.url) ? (
                            <a
                              href={item.quoteUrl || item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-zinc-400 hover:text-emerald-400 underline decoration-zinc-700 hover:decoration-emerald-400 transition-colors inline-flex items-center space-x-0.5 group/quote"
                            >
                              <span>{item.quoteAuthor}</span>
                              <ArrowUpRight className="w-2.5 h-2.5 inline opacity-70 group-hover/quote:opacity-100 group-hover/quote:translate-x-0.5 group-hover/quote:-translate-y-0.5 transition-transform" />
                            </a>
                          ) : (
                            item.quoteAuthor
                          )}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Link / Source */}
                <div className="pt-4 border-t border-zinc-800/30 relative z-10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>SOURCE CITED</span>
                    <span className="text-zinc-300 font-semibold truncate max-w-[170px]">{item.source}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                          isModi
                            ? 'bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/40'
                            : isSecurity
                            ? 'bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40'
                            : 'bg-sky-950/40 hover:bg-sky-900/50 text-sky-300 border border-sky-800/40'
                        }`}
                      >
                        <span>{isModi ? 'View on X' : 'Read News Report'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {item.secondaryUrl && (
                      <a
                        href={item.secondaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/60 text-zinc-300 border border-zinc-800/40 transition-all"
                      >
                        <span>The Hindu Coverage</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Transliteration Box (indic.top) */}
          <div className="bg-[#18181c]/40 border border-zinc-800/25 p-6 rounded-2xl hover:border-emerald-500/30 hover:bg-zinc-800/20 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center space-x-2.5">
                  <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/20 text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                    <Languages className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-sans font-bold text-lg text-zinc-100">{PERSONAL_SECTIONS.transliteration.title}</h4>
                </div>
                <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/30 uppercase font-semibold">
                  {PERSONAL_SECTIONS.transliteration.metric}
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {PERSONAL_SECTIONS.transliteration.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/20 flex items-center justify-between text-[10px] font-mono">
              <span className="text-zinc-500">PLATFORM: MULTI-SCRIPT AST</span>
              <a
                href={PERSONAL_SECTIONS.transliteration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 inline-flex items-center space-x-1 font-semibold group/link"
              >
                <span>OPEN INDIC.TOP</span>
                <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
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
                <span className="font-mono text-[9px] text-zinc-500 bg-zinc-900/40 px-2 py-1 rounded border border-zinc-800/20 uppercase">
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
                  <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/20 text-sky-400">
                    <Users className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-sans font-bold text-lg text-zinc-100">{PERSONAL_SECTIONS.social.title}</h4>
                </div>
                <span className="font-mono text-[9px] text-zinc-500 bg-zinc-900/40 px-2 py-1 rounded border border-zinc-800/20 uppercase">
                  {PERSONAL_SECTIONS.social.metric}
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {PERSONAL_SECTIONS.social.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/20 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>COMMUNITY: BENGALURU & INDIC DEV</span>
              <span className="text-sky-400">ACTIVE CONTRIBUTOR</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Production Case Studies Section (Real Products) */}
      <motion.div variants={itemVariants} className="space-y-6 border-t border-zinc-800/40 pt-10" id="engineered-architectures-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div>
            <h2 className="font-sans font-bold text-2xl text-white tracking-tight">Engineered Architectures & Systems</h2>
            <p className="font-sans text-sm text-zinc-400">Core hardware verification environments, Indic font systems, and platforms deployed representing systemic rigor.</p>
          </div>

          {/* Project Category Filter Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-zinc-900/60 border border-zinc-800/40 rounded-xl font-sans text-xs shrink-0">
            {[
              { id: 'all', label: 'All Systems' },
              { id: 'vlsi', label: 'Silicon & VLSI' },
              { id: 'indic', label: 'Indic & Typography' },
              { id: 'systems', label: 'Enterprise Engines' },
              { id: 'ai', label: 'Agentic Platforms' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setProjectFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                  projectFilter === tab.id
                    ? 'bg-zinc-800 text-white shadow font-semibold border border-zinc-700/50'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATABASE.filter(proj => projectFilter === 'all' || (proj as any).category === projectFilter).map((proj) => (
            <div
              key={proj.id}
              className="bg-[#18181c]/60 border border-zinc-800/25 hover:border-zinc-700/40 p-6 rounded-xl flex flex-col justify-between hover:bg-zinc-800/25 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">{proj.type}</span>
                    <h4 className="font-sans font-bold text-lg text-white group-hover:text-zinc-100 transition-colors mt-1 flex items-center space-x-1.5">
                      {proj.url ? (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-400 transition-colors inline-flex items-center space-x-1 group/title"
                        >
                          <span>{proj.title}</span>
                          <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-80 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all shrink-0" />
                        </a>
                      ) : (
                        <span>{proj.title}</span>
                      )}
                    </h4>
                  </div>
                  <span className="font-sans text-xs font-semibold px-2.5 py-1 rounded bg-zinc-800/40 text-zinc-300 shrink-0 ml-2">
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
                <div className="flex items-center justify-between text-zinc-500 font-mono text-[10px]">
                  <div className="flex items-center space-x-1.5">
                    <Radio className="w-3.5 h-3.5 text-emerald-500" />
                    <span>METRIC: {proj.stats}</span>
                  </div>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1 uppercase tracking-wider group/link"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
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
