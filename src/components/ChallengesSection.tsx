import React, { useState } from 'react';
import { CHALLENGES_DATA } from '../data/iotContent';
import { ImageWithFallback } from './ImageWithFallback';
import { ShieldAlert, Lock, EyeOff, Recycle, Unlink, Wrench, FileCheck, CheckCircle2 } from 'lucide-react';

export const ChallengesSection: React.FC = () => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('cybersecurity');

  const challengeIcons: Record<string, React.ReactNode> = {
    cybersecurity: <Lock className="w-4 h-4 text-rose-400" />,
    privacy: <EyeOff className="w-4 h-4 text-amber-400" />,
    environment: <Recycle className="w-4 h-4 text-emerald-400" />,
    interoperability: <Unlink className="w-4 h-4 text-cyan-400" />,
    'reliability-cost': <Wrench className="w-4 h-4 text-amber-400" />,
  };

  const activeChallenge = CHALLENGES_DATA.find((c) => c.id === selectedChallengeId) || CHALLENGES_DATA[0];

  return (
    <section id="defis" className="py-16 border-b border-[#1f2a4d]/60 bg-[#0d1326]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2">
          <ShieldAlert className="w-4 h-4" />
          <span>Chapitre 08 · Risques & Résilience</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Les défis à relever
        </h2>
        <p className="text-base text-[#9aa6c7] max-w-3xl mb-8 leading-relaxed">
          La prolifération effrénée d'équipements connectés sans sécurité native crée des vulnérabilités systémiques, environnementales et juridiques sans précédent.
        </p>

        {/* Challenge Selection Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-[#141b34] rounded-xl border border-[#1f2a4d] mb-8">
          {CHALLENGES_DATA.map((ch) => {
            const isSelected = selectedChallengeId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChallengeId(ch.id)}
                className={`p-3 rounded-lg text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-500/15 border border-rose-500/40 text-white shadow-sm'
                    : 'text-[#9aa6c7] hover:text-white hover:bg-[#1a2344]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {challengeIcons[ch.id]}
                  <span className="font-semibold text-xs truncate">{ch.title.split(' ')[0]}</span>
                </div>
                <span className="text-[11px] text-[#9aa6c7] line-clamp-1">{ch.summary}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Challenge Interactive Spotlight & Image */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141b34] border border-[#1f2a4d] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
              {challengeIcons[activeChallenge.id]}
              <span>Analyse de risque approfondie</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {activeChallenge.title}
            </h3>

            <p className="text-sm sm:text-base text-[#e5e9f5] leading-relaxed">
              {activeChallenge.content}
            </p>

            <div className="pt-4 border-t border-[#1f2a4d] space-y-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
                Recommandations & Bonnes pratiques :
              </span>
              {activeChallenge.bestPractices.map((bp, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#9aa6c7]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{bp}</span>
                </div>
              ))}
            </div>

            {activeChallenge.regulatoryNote && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
                <FileCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <span className="font-bold block">Cadre Réglementaire :</span>
                  <span>{activeChallenge.regulatoryNote}</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <ImageWithFallback
              src="https://res.cloudinary.com/dr7ekchzr/image/upload/v1792403362/1792403272205_p9mc9s.jpg"
              alt="Sécurité des objets connectés"
              caption="Enjeux de cyber-résilience : sécurisation matérielle des microcontrôleurs et étanchéité des flux."
              aspectRatio="4/3"
            />
          </div>
        </div>

        {/* European Cyber Resilience Act 2024 Spotlight Box */}
        <div className="p-6 rounded-2xl bg-[#0b1020] border-2 border-amber-500/30 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <FileCheck className="w-4 h-4" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Réglementation : Le Cyber Resilience Act (CRA) 2024 de l'UE
              </h4>
            </div>
            <span className="px-3 py-1 rounded bg-[#141b34] text-xs font-mono text-amber-400 border border-[#1f2a4d] self-start sm:self-center">
              Directrice européenne obligatoire
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#e5e9f5] leading-relaxed mb-4">
            L'Union européenne a adopté en 2024 le <strong>règlement sur la cyber-résilience (Cyber Resilience Act)</strong>, qui impose des exigences de sécurité obligatoires aux produits comportant des éléments numériques tout au long de leur cycle de vie.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#141b34] border border-[#1f2a4d]">
              <span className="text-amber-400 font-bold block mb-1">Security by Design</span>
              <span className="text-[#9aa6c7]">Interdiction des mots de passe par défaut et chiffrement natif obligatoire.</span>
            </div>
            <div className="p-3 rounded-lg bg-[#141b34] border border-[#1f2a4d]">
              <span className="text-cyan-400 font-bold block mb-1">Mises à jour 5 ans min.</span>
              <span className="text-[#9aa6c7]">Obligation de fournir des correctifs logiciels de vulnérabilité sans frais.</span>
            </div>
            <div className="p-3 rounded-lg bg-[#141b34] border border-[#1f2a4d]">
              <span className="text-rose-400 font-bold block mb-1">Notification 24h</span>
              <span className="text-[#9aa6c7]">Signalement impératif de toute faille active exploitée à l'ENISA sous 24h.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
