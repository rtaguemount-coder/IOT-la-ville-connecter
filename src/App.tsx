/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { TimelineSection } from './components/TimelineSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { ConnectivitySection } from './components/ConnectivitySection';
import { DataAiSection } from './components/DataAiSection';
import { SectorsSection } from './components/SectorsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { ChallengesSection } from './components/ChallengesSection';
import { FutureSection } from './components/FutureSection';
import { ConclusionSection } from './components/ConclusionSection';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-[#e5e9f5] flex flex-col font-sans">
      {/* Top Bar adhering strictly to Top Bar Contract */}
      <Navbar onOpenSimulator={() => scrollTo('simulateur')} />

      {/* Hero Section */}
      <Hero onScrollTo={scrollTo} />

      {/* Sticky Quick-Access Chapter Strip */}
      <div className="sticky top-[57px] z-30 bg-[#0b1020]/90 backdrop-blur-md border-b border-[#1f2a4d] px-6 py-2 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center gap-4 text-xs font-medium text-[#9aa6c7] whitespace-nowrap">
          <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-wider shrink-0">
            Sommaire :
          </span>
          <button onClick={() => scrollTo('intro')} className="hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
            1. Intro
          </button>
          <span className="text-[#1f2a4d]">/</span>
          <button onClick={() => scrollTo('histoire')} className="hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
            2. Histoire
          </button>
          <span className="text-[#1f2a4d]">/</span>
          <button onClick={() => scrollTo('architecture')} className="hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
            3. Architecture
          </button>
          <span className="text-[#1f2a4d]">/</span>
          <button onClick={() => scrollTo('reseaux')} className="hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
            4. Réseaux
          </button>
          <span className="text-[#1f2a4d]">/</span>
          <button onClick={() => scrollTo('donnees')} className="hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
            5. Données & IA
          </button>
          <span className="text-[#1f2a4d]">/</span>
          <button onClick={() => scrollTo('usages')} className="hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
            6. Usages
          </button>
          <span className="text-[#1f2a4d]">/</span>
          <button onClick={() => scrollTo('avantages')} className="hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
            7. Avantages
          </button>
          <span className="text-[#1f2a4d]">/</span>
          <button onClick={() => scrollTo('defis')} className="hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
            8. Défis
          </button>
          <span className="text-[#1f2a4d]">/</span>
          <button onClick={() => scrollTo('futur')} className="hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
            9. Avenir
          </button>
          <span className="text-[#1f2a4d]">/</span>
          <button onClick={() => scrollTo('quiz')} className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer shrink-0 font-semibold">
            10. Quiz
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        <IntroSection />
        <TimelineSection />
        <ArchitectureSection />
        <ConnectivitySection />
        <DataAiSection />
        <SectorsSection />
        <BenefitsSection />
        <ChallengesSection />
        <FutureSection />
        <ConclusionSection onScrollToTop={scrollToTop} />
        <QuizSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
