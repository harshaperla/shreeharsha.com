import React from 'react';
import { Menu, X, Code2, BookOpen, Map, Mail, User, Compass, Sun, Moon } from 'lucide-react';
import { SHREEHARSHA_BIO } from '../data';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
}

export default function Navigation({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  theme = 'dark',
  toggleTheme,
}: NavigationProps) {
  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'tech', label: 'Tech Blog', icon: Code2 },
    { id: 'kannada', label: 'ಕನ್ನಡ ಬ್ಲಾಗ್', icon: BookOpen },
    { id: 'travel', label: 'Travel Blog', icon: Map },
    { id: 'taiwan', label: 'Taiwan Diaries', icon: Compass },
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
            <span className="font-sans tracking-tight text-lg">
              <span className="text-zinc-600 font-light group-hover:text-zinc-500 transition-colors">SHREE</span>
              <span className="text-white font-extrabold">HARSHA PERLA</span>
            </span>
          </div>

          {/* Desktop Navigation Links + Theme Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-md font-sans text-sm font-medium transition-all duration-150 relative cursor-pointer ${
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

            {/* Desktop Theme Switcher */}
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-850/60 text-zinc-300 hover:text-white transition-all text-xs font-mono cursor-pointer ml-1 group"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                id="theme-toggle-btn"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
                    <span className="hidden lg:inline text-zinc-400 group-hover:text-zinc-200">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
                    <span className="hidden lg:inline text-zinc-600 group-hover:text-zinc-800">Dark</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Mobile menu trigger & Quick theme switch */}
          <div className="md:hidden flex items-center space-x-1">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className="p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
                aria-label="Toggle Theme"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-500" />
                )}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-400 hover:text-white p-2 focus:outline-none cursor-pointer"
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

          {/* Mobile Theme Toggle Row */}
          {toggleTheme && (
            <div className="pt-2 border-t border-zinc-800/30 mt-2">
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-left font-sans text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 transition-colors cursor-pointer"
                id="mobile-theme-toggle-btn"
              >
                <span className="flex items-center space-x-3">
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  <span>Appearance</span>
                </span>
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
