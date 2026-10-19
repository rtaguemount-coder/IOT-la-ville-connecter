import React from 'react';
import { Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-[#1f2a4d] bg-[#0b1020] text-center text-xs text-[#9aa6c7]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#e5e9f5] font-semibold">
          <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span>Internet des Objets (IoT)</span>
        </div>

        <p className="text-[#9aa6c7]">
          Article de référence sur l'Internet des objets — Fonctionnement, usages, défis et perspectives
        </p>

        <div className="flex items-center gap-4">
          <a href="#intro" className="hover:text-cyan-400 transition-colors">Début</a>
          <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>
          <a href="#reseaux" className="hover:text-cyan-400 transition-colors">Réseaux</a>
          <a href="#quiz" className="hover:text-cyan-400 transition-colors">Quiz</a>
        </div>
      </div>
    </footer>
  );
};
