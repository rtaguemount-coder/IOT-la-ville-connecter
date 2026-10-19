import React, { useEffect, useState } from 'react';
import { Cpu, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSimulator }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-amber-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Top Bar strictly conforming to the Top Bar Contract (Section 2) */}
      <header className="sticky top-0 z-40 bg-[#0b1020]/95 backdrop-blur-md border-b border-[#1f2a4d]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#e5e9f5] hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/60 transition-colors">
              <Cpu className="w-4 h-4" />
            </div>
            <span>IoT Explorer</span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#9aa6c7]">
            <a href="#intro" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Introduction
            </a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Architecture
            </a>
            <a href="#reseaux" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Connectivité
            </a>
            <a href="#donnees" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Données & IA
            </a>
            <a href="#usages" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Usages
            </a>
            <a href="#defis" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Défis
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSimulator}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0b1020] bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm hover:shadow-cyan-400/20 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Simulateur Télémétrie</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
