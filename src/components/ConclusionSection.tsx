import React from 'react';
import { BookmarkCheck, ArrowUp } from 'lucide-react';

interface ConclusionSectionProps {
  onScrollToTop: () => void;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({ onScrollToTop }) => {
  return (
    <section id="conclusion" className="py-16 border-b border-[#1f2a4d]/60 bg-[#0d1326]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
          <BookmarkCheck className="w-4 h-4" />
          <span>Chapitre 10 · Synthèse finale</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
          Conclusion
        </h2>

        <div className="p-8 rounded-2xl bg-[#141b34] border border-[#1f2a4d] relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <p className="text-base sm:text-lg text-[#e5e9f5] leading-relaxed">
            L'<strong>Internet des objets</strong> transforme en profondeur la manière dont nous vivons, produisons et gérons nos ressources. De la maison à l'usine, des champs aux villes, il apporte efficacité, économies et nouveaux services en rendant le monde physique mesurable et pilotable.
          </p>

          <p className="text-base sm:text-lg text-[#e5e9f5] leading-relaxed">
            Mais cette puissance a un prix : <strong>sécurité des appareils, protection de la vie privée, sobriété matérielle et interopérabilité</strong> doivent être pensées dès la conception. L'IoT tiendra ses promesses si l'on construit des objets utiles, sûrs, durables et respectueux de leurs utilisateurs.
          </p>

          <div className="pt-6 border-t border-[#1f2a4d] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-[#9aa6c7]">
              Fin du parcours de lecture · 10 chapitres complétés
            </span>
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0b1020] hover:bg-[#1a2344] border border-[#1f2a4d] rounded-lg transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Retour au début</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
