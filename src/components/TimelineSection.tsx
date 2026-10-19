import React, { useState } from 'react';
import { TIMELINE_DATA } from '../data/iotContent';
import { History, Calendar, CheckCircle2 } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(1); // Kevin Ashton 1999 active by default

  const activeItem = TIMELINE_DATA[selectedMilestone];

  return (
    <section id="histoire" className="py-16 border-b border-[#1f2a4d]/60 bg-[#0d1326]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
          <History className="w-4 h-4" />
          <span>Chapitre 02 · Genèse & Évolution</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Une brève histoire de l'IoT
        </h2>
        <p className="text-base text-[#9aa6c7] max-w-2xl mb-10">
          D'une expérience universitaire de distributeur de canettes à l'ère de l'intelligence artificielle embarquée (AIoT) et des standards ouverts.
        </p>

        {/* Chronological Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-[#141b34] rounded-xl border border-[#1f2a4d] mb-8">
          {TIMELINE_DATA.map((item, index) => {
            const isSelected = selectedMilestone === index;
            return (
              <button
                key={item.year}
                onClick={() => setSelectedMilestone(index)}
                className={`px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/15 border border-cyan-400/40 text-white shadow-sm'
                    : 'text-[#9aa6c7] hover:text-white hover:bg-[#1a2344]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-medium mb-1">
                  <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-[#9aa6c7]'}>{item.period}</span>
                </div>
                <p className="text-xs font-medium truncate">{item.title}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Deep-Dive Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141b34] border border-[#1f2a4d] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Repère : {activeItem.year}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeItem.title}
              </h3>
            </div>
            <div className="px-3.5 py-1.5 rounded-md bg-[#0b1020] border border-[#1f2a4d] text-xs font-mono text-amber-400 shrink-0 self-start">
              Époque {activeItem.period}
            </div>
          </div>

          <p className="text-base text-[#e5e9f5] leading-relaxed mb-4">
            {activeItem.details}
          </p>

          <div className="mt-6 pt-6 border-t border-[#1f2a4d] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                Portée historique
              </span>
              <p className="text-sm text-[#9aa6c7] leading-relaxed">
                {activeItem.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Original Summary List for comprehensive reading */}
        <div className="mt-8 space-y-3">
          <span className="text-xs font-semibold text-[#9aa6c7] uppercase tracking-wider">
            Synthèse chronologique complète
          </span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIMELINE_DATA.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedMilestone(idx)}
                className="p-4 rounded-xl bg-[#0b1020] border border-[#1f2a4d] hover:border-cyan-500/30 transition-colors cursor-pointer group"
              >
                <div className="text-xs font-mono text-amber-400 font-semibold mb-1">
                  {item.period}
                </div>
                <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-[#9aa6c7] line-clamp-2">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
