import React from 'react';
import { Menu, X, Code2, BookOpen, Map, Mail, User } from 'lucide-react';
import { SHREEHARSHA_BIO } from '../data';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navigation({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavigationProps) {
  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'tech', label: 'Tech Blog', icon: Code2 },
    { id: 'kannada', label: 'ಕನ್ನಡ ಬ್ಲಾಗ್', icon: BookOpen },
    { id: 'travel', label: 'Travel Blog', icon: Map },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#121215]/80 backdrop-blur-md border-b border-zinc-800/30 transition-all">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Domain */}
          <div 
            onClick={() => setActiveSection('profile')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <span className="font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">⚡</span>
            <span className="font-sans font-extrabold tracking-tight text-lg">
              <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">SHREE</span>
              <span className="text-white">HARSHA</span>
            </span>
          </div>

          {/* Large Screen Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-sans text-sm font-medium transition-all duration-150 relative ${
                    isActive
                      ? 'text-white bg-zinc-900/60 border-b-2 border-zinc-300'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-400 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drop-down dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121215] border-b border-zinc-800/30 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left font-sans text-base font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-zinc-900 border-l-4 border-zinc-200'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
                id={`mobile-nav-item-${item.id}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
