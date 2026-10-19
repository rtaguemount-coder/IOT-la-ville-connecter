import React from 'react';
import { FUTURE_TRENDS } from '../data/iotContent';
import { Sparkles, BrainCircuit, Signal, BatteryCharging, Box, Globe, Shield } from 'lucide-react';

export const FutureSection: React.FC = () => {
  const icons = [
    <BrainCircuit key="1" className="w-5 h-5 text-cyan-400" />,
    <Signal key="2" className="w-5 h-5 text-amber-400" />,
    <BatteryCharging key="3" className="w-5 h-5 text-emerald-400" />,
    <Box key="4" className="w-5 h-5 text-cyan-400" />,
    <Globe key="5" className="w-5 h-5 text-amber-400" />,
    <Shield key="6" className="w-5 h-5 text-cyan-400" />,
  ];

  return (
    <section id="futur" className="py-16 border-b border-[#1f2a4d]/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Chapitre 09 · Perspectives & Horizons</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Quel avenir pour l'IoT ?
        </h2>
        <p className="text-base text-[#9aa6c7] max-w-2xl mb-10 leading-relaxed">
          Vers une convergence intime entre intelligence artificielle distribuée, récolte d'énergie autonome et écosystèmes ouverts.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUTURE_TRENDS.map((trend, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#141b34] border border-[#1f2a4d] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0b1020] border border-[#1f2a4d] flex items-center justify-center mb-4">
                  {icons[index]}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{trend.title}</h3>
                <p className="text-xs sm:text-sm text-[#9aa6c7] leading-relaxed">
                  {trend.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1f2a4d] text-xs font-mono text-cyan-400">
                Tendance clé 2026+
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
