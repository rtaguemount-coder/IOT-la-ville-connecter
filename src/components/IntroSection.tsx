import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Network, ArrowRight } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <section id="intro" className="py-16 border-b border-[#1f2a4d]/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Network className="w-4 h-4" />
              <span>Chapitre 01 · Définition fondamentale</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Introduction
            </h2>

            <p className="text-base sm:text-lg text-[#e5e9f5] leading-relaxed">
              L'<strong>Internet des objets</strong>, ou <strong>IoT</strong> (Internet of Things), désigne l'ensemble des objets physiques équipés de capteurs, de logiciels et d'une connexion réseau, capables de collecter des données et de les échanger avec d'autres systèmes. Un thermostat qui apprend vos habitudes, une montre qui mesure votre rythme cardiaque, un tracteur qui ajuste seul son semis ou une machine d'usine qui signale une usure avant la panne : tous relèvent de l'IoT.
            </p>

            <p className="text-base text-[#9aa6c7] leading-relaxed">
              Cette technologie fait le lien entre le monde physique et le monde numérique. Là où Internet reliait des ordinateurs, l'IoT relie des choses : il transforme des phénomènes réels (chaleur, mouvement, pression, position) en données exploitables, puis en actions concrètes.
            </p>

            {/* Loop Transformation Box */}
            <div className="p-4 rounded-xl bg-[#141b34] border border-[#1f2a4d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-center sm:text-left">
                <span className="text-[#9aa6c7]">Monde physique</span>
                <p className="font-semibold text-white mt-0.5">Chaleur, pression, flux</p>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />
              <div className="text-center sm:text-left">
                <span className="text-[#9aa6c7]">Monde numérique</span>
                <p className="font-semibold text-cyan-400 mt-0.5">Télémétrie & données</p>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 hidden sm:block" />
              <div className="text-center sm:text-left">
                <span className="text-[#9aa6c7]">Monde réel</span>
                <p className="font-semibold text-amber-400 mt-0.5">Action & automatisation</p>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div>
            <ImageWithFallback
              src="https://res.cloudinary.com/dr7ekchzr/image/upload/v1792403360/1792403251888_amg7wa.jpg"
              alt="Ville connectée et objets reliés"
              caption="Interconnexion des équipements urbains, capteurs environnementaux et réseaux distribués."
              aspectRatio="4/3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
