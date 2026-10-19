import React from 'react';
import { ArrowDown, Radio, Layers, ShieldCheck, HelpCircle } from 'lucide-react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  return (
    <section className="relative pt-16 pb-12 px-6 border-b border-[#1f2a4d]/60 bg-gradient-to-b from-[#0e152c] to-[#0b1020]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Unboxed Metadata with Typographic Separators (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-cyan-400/90 mb-4 tracking-wide">
          <span>Guide de référence & Ingénierie</span>
          <span aria-hidden="true" className="text-[#1f2a4d]">·</span>
          <span>10 chapitres thématiques</span>
          <span aria-hidden="true" className="text-[#1f2a4d]">·</span>
          <span>Architecture & Sécurité CRA 2024</span>
          <span aria-hidden="true" className="text-[#1f2a4d]">·</span>
          <span className="text-amber-400">Simulateur interactif inclus</span>
        </div>

        {/* Display Headline with Strict Type Scale & Balance */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 [text-wrap:balance]">
          L'Internet des objets
        </h1>

        <p className="text-lg sm:text-xl text-[#9aa6c7] max-w-2xl mx-auto mb-8 font-normal leading-relaxed [text-wrap:balance]">
          Fonctionnement, chaîne d'architecture, protocoles de connectivité, cas d'usage industriels et perspectives de l'AIoT.
        </p>

        {/* Interactive Quick-Navigation Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          <button
            onClick={() => onScrollTo('intro')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#141b34] hover:bg-[#1a2344] border border-[#1f2a4d] hover:border-cyan-500/40 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lire l'introduction</span>
          </button>
          <button
            onClick={() => onScrollTo('architecture')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#141b34] hover:bg-[#1a2344] border border-[#1f2a4d] hover:border-cyan-500/40 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architecture 4 couches</span>
          </button>
          <button
            onClick={() => onScrollTo('reseaux')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#141b34] hover:bg-[#1a2344] border border-[#1f2a4d] hover:border-cyan-500/40 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>Matrice des protocoles</span>
          </button>
          <button
            onClick={() => onScrollTo('defis')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#141b34] hover:bg-[#1a2344] border border-[#1f2a4d] hover:border-cyan-500/40 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Cybersécurité & Défis</span>
          </button>
          <button
            onClick={() => onScrollTo('quiz')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#141b34] hover:bg-[#1a2344] border border-[#1f2a4d] hover:border-amber-400/40 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Quiz d'évaluation</span>
          </button>
        </div>
      </div>
    </section>
  );
};
