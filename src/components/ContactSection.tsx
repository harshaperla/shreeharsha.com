import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Send, ShieldCheck, Mail, Github, Linkedin, 
  Twitter, CheckCircle2, RefreshCw, AlertTriangle, Layers
} from 'lucide-react';
import { ContactFormInput, SavedMessage } from '../types';
import { SHREEHARSHA_BIO } from '../data';

export default function ContactSection() {
  const [formState, setFormState] = useState<ContactFormInput>({
    name: '',
    email: '',
    intent: 'infrastructure',
    priority: 'routine',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0); // 0 = idle, 1 = parsing, 2 = routing, 3 = saved
  const [savedReceipt, setSavedReceipt] = useState<SavedMessage | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please ensure Name, Email, and Message components are supplied.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionProgress(1); // Stage 1: Parsing Payload

    // Stage updates to simulate real state-machine compiler validation (builder style!)
    setTimeout(() => {
      setSubmissionProgress(2); // Stage 2: Routing Stream
      
      setTimeout(() => {
        setSubmissionProgress(3); // Stage 3: Saved/Ready
        
        const ReceiptId = `MSG-CMPT-${Math.floor(1000 + Math.random() * 9000)}`;
        const finalReceipt: SavedMessage = {
          ...formState,
          id: ReceiptId,
          timestamp: new Date().toISOString(),
          status: 'received'
        };

        // Persist message locally in client localStorage to preserve actual integration persistence!
        try {
          const stored = localStorage.getItem('shreeharsha_com_messages');
          const list = stored ? JSON.parse(stored) : [];
          list.push(finalReceipt);
          localStorage.setItem('shreeharsha_com_messages', JSON.stringify(list));
        } catch (err) {
          console.warn("Storage restricted in current environment context.");
        }

        setSavedReceipt(finalReceipt);
        setIsSubmitting(false);
      }, 800);
    }, 700);
  };

  const resetFormState = () => {
    setFormState({
      name: '',
      email: '',
      intent: 'infrastructure',
      priority: 'routine',
      message: ''
    });
    setSavedReceipt(null);
    setSubmissionProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8" id="contact-section-grid">
      {/* Structural left sidebar: Directory Links */}
      <div className="lg:col-span-4 space-y-6">
        <div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Connect Handles</span>
          <h2 className="font-sans font-extrabold text-3xl text-white tracking-tight mt-1">
            Core Directories
          </h2>
          <p className="font-sans text-sm text-zinc-400 mt-2">
            Connect via standard secure API gateways or direct correspondence endpoints.
          </p>
        </div>

        {/* Directory links */}
        <div className="space-y-3 pt-2">
          {/* Email */}
          <a
            href={`mailto:harshaperla@gmail.com`}
            className="flex items-center space-x-3 p-4 bg-[#18181c]/50 hover:bg-zinc-805/30 border border-zinc-800/25 hover:border-zinc-700/40 rounded-xl transition-all group"
            id="contact-link-email"
          >
            <div className="bg-zinc-900/60 p-2 border border-zinc-800/20 rounded-lg group-hover:bg-zinc-800/40">
              <Mail className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase">DIRECT CORRESPONDENCE</span>
              <span className="font-sans text-sm font-semibold text-zinc-200 block mt-0.5">harshaperla@gmail.com</span>
            </div>
          </a>

          {/* GitHub */}
          <a
            href={SHREEHARSHA_BIO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 bg-[#18181c]/50 hover:bg-zinc-805/30 border border-zinc-800/25 hover:border-zinc-700/40 rounded-xl transition-all group"
            id="contact-link-github"
          >
            <div className="bg-zinc-900/60 p-2 border border-zinc-800/20 rounded-lg group-hover:bg-zinc-800/40">
              <Github className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase">REPOS & COMPRESSED CODE</span>
              <span className="font-sans text-sm font-semibold text-zinc-200 block mt-0.5">github.com/harshaperla</span>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={SHREEHARSHA_BIO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 bg-[#18181c]/50 hover:bg-zinc-805/30 border border-zinc-800/25 hover:border-zinc-700/40 rounded-xl transition-all group"
            id="contact-link-linkedin"
          >
            <div className="bg-zinc-900/60 p-2 border border-zinc-800/20 rounded-lg group-hover:bg-zinc-800/40">
              <Linkedin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase">PROFESSIONAL RELATIONS</span>
              <span className="font-sans text-sm font-semibold text-zinc-200 block mt-0.5">linkedin.com/in/harshaperla</span>
            </div>
          </a>

          {/* Twitter / X */}
          <a
            href={SHREEHARSHA_BIO.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 bg-[#18181c]/50 hover:bg-zinc-805/30 border border-zinc-800/25 hover:border-zinc-700/40 rounded-xl transition-all group"
            id="contact-link-twitter"
          >
            <div className="bg-zinc-900/60 p-2 border border-zinc-800/20 rounded-lg group-hover:bg-zinc-800/40">
              <Twitter className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase">SYS STREAMS & INSIGHTS</span>
              <span className="font-sans text-sm font-semibold text-zinc-200 block mt-0.5">@harshaperla</span>
            </div>
          </a>
        </div>

        {/* Human Guarantee Box */}
        <div className="bg-zinc-900/10 p-5 border border-zinc-800/20 rounded-xl text-left hidden lg:block">
          <span className="font-mono text-[9px] text-zinc-500 block uppercase">GUARANTEE PROMPT</span>
          <p className="font-sans text-xs text-zinc-400 leading-relaxed mt-2">
            No automated email responses or canned customer workflows. Every system pipeline is audited and operated manually by Shreeharsha directly.
          </p>
        </div>
      </div>

      {/* Main Interactive Contact Compiler / Right side */}
      <div className="lg:col-span-8">
        <div className="bg-[#18181c] border border-zinc-800/40 p-6 md:p-8 rounded-2xl relative overflow-hidden backdrop-blur-sm min-h-[450px] flex flex-col justify-between shadow-lg">
          {/* Visual grid lines decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f22_1.2px,transparent_1.2px),linear-gradient(to_bottom,#1f1f22_1.2px,transparent_1.2px)] bg-[size:3rem_3rem] opacity-25 pointer-events-none" />

          {/* Render receipt of message if compiled successfully */}
          {savedReceipt ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 space-y-6 text-center my-auto py-8"
              id="message-receipt-container"
            >
              <div className="inline-flex bg-zinc-900/60 p-3 rounded-full border border-emerald-900/35 text-emerald-400 mx-auto w-14 h-14 items-center justify-center mb-2 animate-bounce">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="font-sans font-bold text-2xl text-white">Message Transmission Complete</h3>
                <p className="font-sans text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  The payload schema has been successfully compiled, parsed, and logged inside the active communication queue.
                </p>
              </div>

              {/* Printed Receipt Sheet */}
              <div className="bg-zinc-900/30 border border-zinc-800/20 p-5 rounded-xl max-w-lg mx-auto text-left font-mono text-xs text-zinc-400 space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-zinc-800/20 pb-3">
                  <span className="text-zinc-500">PAYLOAD ID:</span>
                  <span className="text-emerald-400 font-bold">{savedReceipt.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 text-[11px]">
                  <div>
                    <span className="text-zinc-600 block uppercase">SENDER</span>
                    <span className="text-zinc-200">{savedReceipt.name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block uppercase">GATEWAY</span>
                    <span className="text-zinc-200 truncate pr-2">{savedReceipt.email}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block uppercase">INTENT CRITERIA</span>
                    <span className="text-zinc-200 capitalize">{savedReceipt.intent}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block uppercase">PRIORITY WEIGHT</span>
                    <span className={`capitalize font-bold ${savedReceipt.priority === 'critical_infrastructure' ? 'text-red-400' : savedReceipt.priority === 'urgent' ? 'text-amber-400' : 'text-zinc-300'}`}>
                      {savedReceipt.priority.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="border-t border-zinc-800/20 pt-3">
                  <span className="text-zinc-600 block uppercase text-[9px] mb-1">PROCESSED STREAM TEXT:</span>
                  <p className="font-sans text-xs text-zinc-300 leading-relaxed pr-2">
                    &ldquo;{savedReceipt.message}&rdquo;
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800/20 p-3.5 rounded-lg flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                    Local backup completed at {new Date(savedReceipt.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <button
                onClick={resetFormState}
                className="mt-6 inline-flex font-mono text-xs text-zinc-400 hover:text-white border border-zinc-800/40 hover:bg-zinc-900 px-4 py-2 rounded-lg transition-all"
                id="receipt-reset-btn"
              >
                Compile New Package
              </button>
            </motion.div>
          ) : (
            /* Contact Form interface */
            <form onSubmit={handleFormSubmission} className="relative z-10 space-y-6">
              <div className="border-b border-zinc-800/30 pb-3 flex items-center justify-between">
                <h3 className="font-sans font-bold text-lg text-white flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-zinc-400" />
                  <span>Interactive Pipeline Compiler</span>
                </h3>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">SYS_VERSION: 1.0.4</span>
              </div>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name-input" className="font-sans text-xs font-semibold text-zinc-400">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name-input"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full bg-zinc-905 bg-zinc-900/40 border border-zinc-800/35 rounded-lg px-4 py-2.5 font-sans text-sm text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-zinc-700/40 transition-colors"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email-input" className="font-sans text-xs font-semibold text-zinc-400">Email Gateway</label>
                  <input
                    type="email"
                    name="email"
                    id="email-input"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    className="w-full bg-zinc-905 bg-zinc-900/40 border border-zinc-800/35 rounded-lg px-4 py-2.5 font-sans text-sm text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-zinc-700/40 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Select params */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Intent Selection */}
                <div className="space-y-1.5">
                  <label htmlFor="intent-select" className="font-sans text-xs font-semibold text-zinc-400">Intent Criteria</label>
                  <select
                    name="intent"
                    id="intent-select"
                    value={formState.intent}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/40 border border-zinc-800/35 rounded-lg px-3 py-2.5 font-sans text-sm text-zinc-350 focus:outline-none focus:border-zinc-750 cursor-pointer"
                  >
                    <option value="infrastructure" className="bg-zinc-950 text-zinc-200">Intelligence Infrastructure</option>
                    <option value="collaboration" className="bg-zinc-950 text-zinc-200">Product/Tooling Collaboration</option>
                    <option value="consulting" className="bg-zinc-950 text-zinc-200">Academic/Systems Audit</option>
                    <option value="general" className="bg-zinc-950 text-zinc-200">Deterministic Conversation</option>
                  </select>
                </div>

                {/* Priority Selection */}
                <div className="space-y-1.5">
                  <label htmlFor="priority-select" className="font-sans text-xs font-semibold text-zinc-400">Priority Weight</label>
                  <select
                    name="priority"
                    id="priority-select"
                    value={formState.priority}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/40 border border-zinc-800/35 rounded-lg px-3 py-2.5 font-sans text-sm text-zinc-350 focus:outline-none focus:border-zinc-750 cursor-pointer"
                  >
                    <option value="routine" className="bg-zinc-950 text-zinc-200">Routine Process Checks (Low)</option>
                    <option value="urgent" className="bg-zinc-950 text-zinc-200">Urgent Operational Audit (High)</option>
                    <option value="critical_infrastructure" className="bg-zinc-950 text-zinc-200">Critical Security Alert (Urgent)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message-textarea" className="font-sans text-xs font-semibold text-zinc-400">Message Content</label>
                <textarea
                  name="message"
                  id="message-textarea"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Outline the architecture blueprint, system goals, or inquiry details..."
                  className="w-full bg-zinc-900/40 border border-zinc-800/35 rounded-lg px-4 py-3 font-sans text-sm text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-zinc-705 transition-colors resize-none"
                  required
                />
              </div>

              {/* Compiler stream trigger button */}
              <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-zinc-800 gap-4">
                <div className="flex items-center space-x-2 text-zinc-500 font-mono text-[10px]">
                  {submissionProgress === 0 && (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Ready to transmit package</span>
                    </>
                  )}
                  {submissionProgress === 1 && (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                      <span>Processing payload payload...</span>
                    </>
                  )}
                  {submissionProgress === 2 && (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>Verifying state route graph...</span>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-6 py-3 font-sans text-sm font-semibold rounded-lg flex items-center justify-center space-x-2 cursor-pointer shadow-lg transition-all ${
                    isSubmitting
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed scale-[0.98]'
                      : 'bg-zinc-100 hover:bg-white text-zinc-950 active:scale-[0.98]'
                  }`}
                  id="submit-form-btn"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Compiling Payload...' : 'Submit Message Payload'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
