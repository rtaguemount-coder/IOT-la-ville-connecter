import React from 'react';
import { ADVANTAGES_DATA } from '../data/iotContent';
import { CheckCircle2, TrendingUp, ShieldCheck, Coins, Sparkles, Sliders } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const icons = [
    <TrendingUp key="1" className="w-5 h-5 text-cyan-400" />,
    <Coins key="2" className="w-5 h-5 text-amber-400" />,
    <CheckCircle2 key="3" className="w-5 h-5 text-cyan-400" />,
    <ShieldCheck key="4" className="w-5 h-5 text-emerald-400" />,
    <Sparkles key="5" className="w-5 h-5 text-cyan-400" />,
    <Sliders key="6" className="w-5 h-5 text-amber-400" />,
  ];

  return (
    <section id="avantages" className="py-16 border-b border-[#1f2a4d]/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Chapitre 07 · Bénéfices quantifiables</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Les avantages de l'IoT
        </h2>
        <p className="text-base text-[#9aa6c7] max-w-2xl mb-10 leading-relaxed">
          En transformant des signaux physiques en intelligence décisionnelle continue, l'Internet des objets apporte des gains mesurables sur tous les axes d'exploitation.
        </p>

        {/* 6 Advantages Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES_DATA.map((adv, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#141b34] border border-[#1f2a4d] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0b1020] border border-[#1f2a4d] flex items-center justify-center mb-4">
                  {icons[index]}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{adv.title}</h3>
                <p className="text-xs sm:text-sm text-[#9aa6c7] leading-relaxed">
                  {adv.description}
                </p>
              </div>

              {/* Quantitative Metric Callout */}
              <div className="mt-6 pt-4 border-t border-[#1f2a4d]/80 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold font-mono text-cyan-400 tabular-nums">
                  {adv.metric}
                </span>
                <span className="text-[11px] text-[#9aa6c7] text-right max-w-[150px]">
                  {adv.metricLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
