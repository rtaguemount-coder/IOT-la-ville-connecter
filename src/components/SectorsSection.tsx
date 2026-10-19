import React, { useState } from 'react';
import { SECTORS_DATA } from '../data/iotContent';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Briefcase,
  Home,
  HeartPulse,
  Factory,
  Sprout,
  Building2,
  Truck,
  Zap,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const SectorsSection: React.FC = () => {
  const [activeSectorId, setActiveSectorId] = useState<string>('industry');

  const sectorIcons: Record<string, React.ReactNode> = {
    'smart-home': <Home className="w-4 h-4" />,
    health: <HeartPulse className="w-4 h-4" />,
    industry: <Factory className="w-4 h-4" />,
    agriculture: <Sprout className="w-4 h-4" />,
    'smart-city': <Building2 className="w-4 h-4" />,
    transport: <Truck className="w-4 h-4" />,
    energy: <Zap className="w-4 h-4" />,
  };

  const activeSector = SECTORS_DATA.find((s) => s.id === activeSectorId) || SECTORS_DATA[0];

  return (
    <section id="usages" className="py-16 border-b border-[#1f2a4d]/60 bg-[#0d1326]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <Briefcase className="w-4 h-4" />
          <span>Chapitre 06 · Applications métier</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Des usages dans tous les secteurs
        </h2>
        <p className="text-base text-[#9aa6c7] max-w-3xl mb-8 leading-relaxed">
          De l'intimité du foyer à la gestion d'une mégalopole ou d'un complexe industriel lourd, l'IoT infuse l'ensemble des branches économiques.
        </p>

        {/* Sector Tabs (Interactive buttons, not pills) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#141b34] rounded-xl border border-[#1f2a4d] mb-8 overflow-x-auto">
          {SECTORS_DATA.map((sector) => {
            const isSelected = activeSectorId === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => setActiveSectorId(sector.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-400 text-[#0b1020] font-semibold shadow-sm'
                    : 'text-[#9aa6c7] hover:text-white hover:bg-[#1a2344]'
                }`}
              >
                <span>{sectorIcons[sector.id]}</span>
                <span>{sector.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Showcase */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141b34] border border-[#1f2a4d] mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Sector Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                {sectorIcons[activeSector.id]}
                <span>Secteur spécialisé</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeSector.name}
              </h3>
              <p className="text-sm sm:text-base text-[#e5e9f5] leading-relaxed">
                {activeSector.content}
              </p>

              {/* Concrete Example Box */}
              <div className="p-3.5 rounded-xl bg-[#0b1020] border border-cyan-500/20 text-xs text-[#9aa6c7]">
                <span className="font-semibold text-cyan-400 block mb-1">
                  Exemple concret sur le terrain :
                </span>
                <p className="leading-relaxed">{activeSector.concreteExample}</p>
              </div>

              {/* Key Sensors */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-amber-400 block mb-2">
                  Capteurs et instruments déployés :
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSector.typicalSensors.map((sensor, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono text-[#9aa6c7] bg-[#0b1020] px-2.5 py-1 rounded border border-[#1f2a4d]"
                    >
                      {sensor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sector Image or Illustration */}
            <div>
              {activeSector.image ? (
                <ImageWithFallback
                  src={activeSector.image}
                  alt={activeSector.imageAlt || activeSector.name}
                  caption={`Application IoT concrète : ${activeSector.name}`}
                  aspectRatio="4/3"
                />
              ) : (
                <div className="p-8 rounded-2xl bg-[#0b1020] border border-[#1f2a4d] text-center flex flex-col items-center justify-center min-h-[260px]">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{activeSector.name}</h4>
                  <p className="text-xs text-[#9aa6c7] max-w-sm">
                    {activeSector.summary}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Complete Overview of all sectors (verbatim original content) */}
        <div className="mt-12 space-y-8">
          <span className="text-xs font-semibold text-[#9aa6c7] uppercase tracking-wider block">
            Détails exhaustifs de tous les domaines
          </span>

          <div className="grid md:grid-cols-2 gap-6">
            {SECTORS_DATA.map((sec) => (
              <div
                key={sec.id}
                onClick={() => setActiveSectorId(sec.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeSectorId === sec.id
                    ? 'bg-[#141b34] border-cyan-400/60 ring-1 ring-cyan-400/20'
                    : 'bg-[#0f152a] border-[#1f2a4d] hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    {sectorIcons[sec.id]}
                  </div>
                  <h4 className="text-lg font-bold text-white">{sec.name}</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#9aa6c7] leading-relaxed mb-4">
                  {sec.content}
                </p>
                <div className="space-y-1.5 border-t border-[#1f2a4d] pt-3 text-xs">
                  {sec.detailedPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#e5e9f5]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
