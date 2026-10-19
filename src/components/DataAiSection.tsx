import React, { useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Database, Cloud, Cpu, Activity, Play, CheckCircle2, AlertOctagon } from 'lucide-react';

export const DataAiSection: React.FC = () => {
  const [twinMode, setTwinMode] = useState<'nominal' | 'warning' | 'critical'>('nominal');

  return (
    <section id="donnees" className="py-16 border-b border-[#1f2a4d]/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <Database className="w-4 h-4" />
          <span>Chapitre 05 · Données & Intelligence Artificielle</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Données, cloud, edge et intelligence artificielle
        </h2>
        <p className="text-base text-[#9aa6c7] max-w-3xl mb-8 leading-relaxed">
          La vraie valeur de l'IoT ne tient pas à l'objet lui-même, mais aux données qu'il produit. Un seul capteur génère peu d'informations ; des milliers, mesurant en continu, produisent des volumes massifs qu'il faut collecter, nettoyer, stocker et analyser.
        </p>

        {/* 3 Core Pillars */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Cloud */}
          <div className="p-6 rounded-2xl bg-[#141b34] border border-[#1f2a4d] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Le Cloud Computing</h3>
              <p className="text-xs sm:text-sm text-[#9aa6c7] leading-relaxed">
                Il offre un <strong>stockage et une puissance de calcul à la demande</strong>, idéal pour agréger des téraoctets de données venant de sites multiples et entraîner de volumineux modèles d'apprentissage statistique.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#1f2a4d] text-xs font-mono text-cyan-400">
              Agrégation multi-sites & Big Data
            </div>
          </div>

          {/* Edge Computing */}
          <div className="p-6 rounded-2xl bg-[#141b34] border border-[#1f2a4d] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">L'Edge Computing</h3>
              <p className="text-xs sm:text-sm text-[#9aa6c7] leading-relaxed">
                Traiter les données directement sur l'objet ou sur une passerelle locale <strong>réduit la latence (&lt; 5 ms)</strong>, économise la bande passante télécom et garantit la continuité de service sans connexion internet.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#1f2a4d] text-xs font-mono text-amber-400">
              Temps réel critique & résilience locale
            </div>
          </div>

          {/* AI & Digital Twin */}
          <div className="p-6 rounded-2xl bg-[#141b34] border border-[#1f2a4d] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">L'IA & le Jumeau Numérique</h3>
              <p className="text-xs sm:text-sm text-[#9aa6c7] leading-relaxed">
                L'apprentissage automatique détecte les micro-anomalies et prédit les pannes. Le <strong>jumeau numérique</strong>, réplique virtuelle dynamique d'un équipement alimentée en temps réel, permet de simuler des scénarios avant d'agir.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#1f2a4d] text-xs font-mono text-emerald-400">
              Maintenance prédictive & simulation 3D
            </div>
          </div>
        </div>

        {/* Cloudinary Image & Interactive Digital Twin Demo */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <ImageWithFallback
              src="https://res.cloudinary.com/dr7ekchzr/image/upload/v1792403361/1792403260857_nknyd9.jpg"
              alt="Données, cloud et edge computing"
              caption="Architecture distribuée : orchestration des flux télémétriques entre passerelles de bord et cloud."
              aspectRatio="4/3"
            />
          </div>

          {/* Interactive Digital Twin Simulator */}
          <div className="p-6 rounded-2xl bg-[#141b34] border border-[#1f2a4d]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  Démonstration interactive
                </span>
                <h4 className="text-lg font-bold text-white">
                  Jumeau Numérique & Détection d'Anomalie
                </h4>
              </div>
              <span className="text-xs font-mono text-[#9aa6c7]">
                Capteur : Palier SKF-6205
              </span>
            </div>

            <p className="text-xs text-[#9aa6c7] mb-4">
              Sélectionnez un état mécanique pour visualiser comment le modèle d'IA local interprète les micro-variations du spectre vibratoire.
            </p>

            {/* Mode Selector */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-xs font-medium">
              <button
                onClick={() => setTwinMode('nominal')}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  twinMode === 'nominal'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                    : 'bg-[#0b1020] border-[#1f2a4d] text-[#9aa6c7]'
                }`}
              >
                1. Régime sain
              </button>
              <button
                onClick={() => setTwinMode('warning')}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  twinMode === 'warning'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                    : 'bg-[#0b1020] border-[#1f2a4d] text-[#9aa6c7]'
                }`}
              >
                2. Dérive précoce
              </button>
              <button
                onClick={() => setTwinMode('critical')}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  twinMode === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400'
                    : 'bg-[#0b1020] border-[#1f2a4d] text-[#9aa6c7]'
                }`}
              >
                3. Rupture imminente
              </button>
            </div>

            {/* Visual SVG Waveform Representation */}
            <div className="p-4 rounded-xl bg-[#0b1020] border border-[#1f2a4d] mb-4">
              <div className="flex justify-between items-center text-[11px] text-[#9aa6c7] font-mono mb-2">
                <span>Signal vibratoire FFT (0 - 5 kHz)</span>
                <span className={twinMode === 'nominal' ? 'text-emerald-400' : twinMode === 'warning' ? 'text-amber-400' : 'text-rose-400'}>
                  {twinMode === 'nominal' ? 'RMS: 0.38 g · Conforme ISO 10816' : twinMode === 'warning' ? 'RMS: 2.14 g · Dérive harmonique 120 Hz' : 'RMS: 6.80 g · Seuil danger franchi'}
                </span>
              </div>

              {/* Dynamic waveform based on mode */}
              <svg viewBox="0 0 400 90" className="w-full h-20 overflow-visible">
                <line x1="0" y1="45" x2="400" y2="45" stroke="#1f2a4d" strokeDasharray="3 3" />
                {twinMode === 'nominal' && (
                  <path
                    d="M0,45 Q25,20 50,45 T100,45 T150,45 T200,45 T250,45 T300,45 T350,45 T400,45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                  />
                )}
                {twinMode === 'warning' && (
                  <path
                    d="M0,45 Q15,10 30,55 Q45,25 60,65 Q80,15 100,50 Q130,20 160,70 Q200,10 240,60 Q280,25 320,65 Q360,15 400,45"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                )}
                {twinMode === 'critical' && (
                  <path
                    d="M0,45 Q10,-5 20,95 Q35,-15 50,105 Q70,5 90,85 Q110,-10 130,100 Q160,-20 190,110 Q230,0 270,90 Q310,-15 350,105 Q380,10 400,45"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="3"
                  />
                )}
              </svg>
            </div>

            {/* Diagnostic Message */}
            <div className="p-3 rounded-lg bg-[#0b1020] border border-[#1f2a4d] text-xs">
              {twinMode === 'nominal' && (
                <div className="flex items-start gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Jumeau numérique au repos optimal. Prochaine lubrification programmée dans 2 400 heures.</span>
                </div>
              )}
              {twinMode === 'warning' && (
                <div className="flex items-start gap-2 text-amber-300">
                  <Activity className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Anomalie détectée : micro-écaillage de la bague externe. Remplacement préventif planifié à l'arrêt de nuit sans perte de cadence.</span>
                </div>
              )}
              {twinMode === 'critical' && (
                <div className="flex items-start gap-2 text-rose-300">
                  <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Alerte critique : risque de grippage moteur sous 30 minutes. Arrêt automatique d'urgence déclenché par l'Edge Gateway locale.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
