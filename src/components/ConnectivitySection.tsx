import React, { useState } from 'react';
import { CONNECTIVITY_PROTOCOLS } from '../data/iotContent';
import { Radio, Filter, HelpCircle, Network, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const ConnectivitySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProtocolId, setActiveProtocolId] = useState<string>('lorawan');

  // Protocol Decision Assistant state
  const [assistantRange, setAssistantRange] = useState<'short' | 'mesh' | 'long' | 'cellular'>('long');
  const [assistantPower, setAssistantPower] = useState<'battery_years' | 'battery_days' | 'mains'>('battery_years');
  const [assistantData, setAssistantData] = useState<'tiny' | 'medium' | 'high'>('tiny');

  const filteredProtocols =
    selectedCategory === 'all'
      ? CONNECTIVITY_PROTOCOLS
      : CONNECTIVITY_PROTOCOLS.filter((p) => p.category === selectedCategory);

  const activeProto = CONNECTIVITY_PROTOCOLS.find((p) => p.id === activeProtocolId) || CONNECTIVITY_PROTOCOLS[0];

  // Helper for recommendation
  const getRecommendation = () => {
    if (assistantRange === 'long' && assistantPower === 'battery_years' && assistantData === 'tiny') {
      return {
        name: 'LoRaWAN',
        reason: 'Parfait pour capteurs distants (5-15 km), sans abonnement télécom coûteux, avec une autonomie record de 5 à 10 ans sur pile.',
      };
    }
    if ((assistantRange === 'long' && assistantData === 'medium') || assistantRange === 'cellular') {
      return {
        name: 'NB-IoT / LTE-M',
        reason: 'Couverture nationale garantie par les antennes des opérateurs, idéale pour les compteurs communicants et le suivi de flottes.',
      };
    }
    if (assistantRange === 'short' && assistantPower === 'battery_years') {
      return {
        name: 'Bluetooth Low Energy (BLE)',
        reason: 'Standard incontournable pour les capteurs corporels ou balises à proximité immédiate d\'un smartphone.',
      };
    }
    if (assistantRange === 'mesh') {
      return {
        name: 'Zigbee / Thread (Matter)',
        reason: 'Réseau maillé auto-cicatrisant pour la domotique résidentielle avec une excellente autonomie et interopérabilité.',
      };
    }
    if (assistantData === 'high' || assistantPower === 'mains') {
      return {
        name: assistantRange === 'short' ? 'Wi-Fi (802.11 ax/be)' : '4G / 5G',
        reason: 'Nécessaire dès que le volume de données inclut du flux vidéo, de l\'audio ou une latence critique en temps réel sous alimentation continue.',
      };
    }
    return {
      name: 'LoRaWAN ou NB-IoT',
      reason: 'Pour les contraintes de longue distance et d\'autonomie sur plusieurs années.',
    };
  };

  const recommendation = getRecommendation();

  return (
    <section id="reseaux" className="py-16 border-b border-[#1f2a4d]/60 bg-[#0d1326]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <Radio className="w-4 h-4" />
          <span>Chapitre 04 · Connectivité & Protocoles</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Connectivité et protocoles
        </h2>
        <p className="text-base text-[#9aa6c7] max-w-3xl mb-8 leading-relaxed">
          Choisir le bon réseau est l'une des décisions les plus importantes d'un projet IoT. Elle dépend de la portée nécessaire, du débit, de la consommation d'énergie et du coût.
        </p>

        {/* Category Filters (Interactive buttons, not pills) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#141b34] rounded-xl border border-[#1f2a4d] mb-6">
          <span className="text-xs text-[#9aa6c7] px-3 font-medium flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Catégorie :
          </span>
          {[
            { id: 'all', label: 'Toutes les technologies' },
            { id: 'Local', label: 'Réseaux locaux' },
            { id: 'Maillé', label: 'Réseaux maillés (Mesh)' },
            { id: 'LPWAN', label: 'LPWAN longue distance' },
            { id: 'Cellulaire', label: 'Cellulaire 4G/5G' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-cyan-400 text-[#0b1020] font-semibold shadow-sm'
                  : 'text-[#9aa6c7] hover:text-white hover:bg-[#1a2344]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Master Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#1f2a4d] bg-[#141b34] mb-8">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1f2a4d] bg-[#0f162c] text-cyan-400 font-mono">
                <th className="p-3.5">Technologie</th>
                <th className="p-3.5">Portée</th>
                <th className="p-3.5">Débit</th>
                <th className="p-3.5">Autonomie typique</th>
                <th className="p-3.5">Usage typique</th>
                <th className="p-3.5 text-right">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2a4d]">
              {filteredProtocols.map((proto) => {
                const isActive = activeProtocolId === proto.id;
                return (
                  <tr
                    key={proto.id}
                    onClick={() => setActiveProtocolId(proto.id)}
                    className={`transition-colors cursor-pointer ${
                      isActive ? 'bg-cyan-500/10' : 'hover:bg-[#1a2344]/50'
                    }`}
                  >
                    <td className="p-3.5 font-bold text-white whitespace-nowrap">
                      {proto.name}
                      <span className="block text-[11px] font-normal text-[#9aa6c7] font-mono">
                        {proto.standard}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#e5e9f5] whitespace-nowrap">{proto.range}</td>
                    <td className="p-3.5 text-cyan-300 font-mono whitespace-nowrap">{proto.throughput}</td>
                    <td className="p-3.5 text-[#e5e9f5]">{proto.batteryLife}</td>
                    <td className="p-3.5 text-[#9aa6c7]">{proto.typicalUse}</td>
                    <td className="p-3.5 text-right">
                      <button
                        className={`text-xs px-2.5 py-1 rounded border cursor-pointer ${
                          isActive
                            ? 'bg-cyan-400 text-[#0b1020] border-cyan-400 font-bold'
                            : 'border-[#1f2a4d] text-[#9aa6c7] hover:text-white'
                        }`}
                      >
                        {isActive ? 'Sélectionné' : 'Examiner'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Protocol Deep-Dive Card */}
        <div className="p-6 rounded-2xl bg-[#141b34] border border-cyan-500/30 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Fiche détaillée · {activeProto.category}
              </span>
              <h3 className="text-xl font-bold text-white">{activeProto.name}</h3>
            </div>
            <div className="text-xs font-mono text-[#9aa6c7]">
              Norme officielle : <span className="text-amber-400">{activeProto.standard}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-[#0b1020] border border-[#1f2a4d]">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                Forces & Atouts majeurs
              </span>
              <ul className="space-y-1.5 text-[#e5e9f5]">
                {activeProto.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#0b1020] border border-[#1f2a4d]">
              <span className="font-semibold text-amber-400 flex items-center gap-1.5 mb-2">
                <Zap className="w-4 h-4" />
                Limites & Points d'attention
              </span>
              <ul className="space-y-1.5 text-[#e5e9f5]">
                {activeProto.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">⚠</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* PROTOCOL DECISION ASSISTANT */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0f152a] border border-[#1f2a4d] mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Assistant de sélection technique</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Quel réseau choisir pour votre déploiement ?
          </h3>
          <p className="text-xs sm:text-sm text-[#9aa6c7] mb-6">
            Définissez les 3 contraintes clés de votre cahier des charges physique pour obtenir la recommandation d'architecture optimale.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6 text-xs">
            {/* Criteria 1: Range */}
            <div className="p-3.5 rounded-xl bg-[#141b34] border border-[#1f2a4d]">
              <label className="font-semibold text-white block mb-2">1. Portée géographique requise</label>
              <div className="space-y-1.5">
                {[
                  { id: 'short', label: 'Courte (intérieur, < 30 m)' },
                  { id: 'mesh', label: 'Maillage bâtiment (Mesh multi-pièces)' },
                  { id: 'long', label: 'Longue distance (> 5 km rurale/ville)' },
                  { id: 'cellular', label: 'Nationale / Internationale (itinérance)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAssistantRange(opt.id as any)}
                    className={`w-full text-left p-2 rounded-lg transition-all cursor-pointer ${
                      assistantRange === opt.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-medium'
                        : 'text-[#9aa6c7] hover:bg-[#1a2344]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria 2: Power */}
            <div className="p-3.5 rounded-xl bg-[#141b34] border border-[#1f2a4d]">
              <label className="font-semibold text-white block mb-2">2. Source d'énergie</label>
              <div className="space-y-1.5">
                {[
                  { id: 'battery_years', label: 'Pile autonome 5 à 10 ans sans maintenance' },
                  { id: 'battery_days', label: 'Batterie rechargeable (recharge hebdomadaire)' },
                  { id: 'mains', label: 'Alimentation secteur 230V permanente' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAssistantPower(opt.id as any)}
                    className={`w-full text-left p-2 rounded-lg transition-all cursor-pointer ${
                      assistantPower === opt.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-medium'
                        : 'text-[#9aa6c7] hover:bg-[#1a2344]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria 3: Data Rate */}
            <div className="p-3.5 rounded-xl bg-[#141b34] border border-[#1f2a4d]">
              <label className="font-semibold text-white block mb-2">3. Volume de données</label>
              <div className="space-y-1.5">
                {[
                  { id: 'tiny', label: 'Quelques octets par heure (température, jauge)' },
                  { id: 'medium', label: 'Trames fréquentes (télématique, GPS continu)' },
                  { id: 'high', label: 'Débit lourd (vidéo, streaming, audio)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAssistantData(opt.id as any)}
                    className={`w-full text-left p-2 rounded-lg transition-all cursor-pointer ${
                      assistantData === opt.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-medium'
                        : 'text-[#9aa6c7] hover:bg-[#1a2344]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-[#141b34] border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Technologie préconisée pour votre cas
              </span>
              <p className="text-lg font-bold text-white">{recommendation.name}</p>
              <p className="text-xs text-[#9aa6c7] mt-1">{recommendation.reason}</p>
            </div>
            <button
              onClick={() => {
                const match = CONNECTIVITY_PROTOCOLS.find((p) => p.name.includes(recommendation.name.split(' ')[0]));
                if (match) setActiveProtocolId(match.id);
              }}
              className="px-4 py-2 text-xs font-semibold text-[#0b1020] bg-cyan-400 hover:bg-cyan-300 rounded-lg cursor-pointer whitespace-nowrap shrink-0 transition-colors"
            >
              Voir la fiche détaillée
            </button>
          </div>
        </div>

        {/* Software Layer: MQTT & CoAP Deep-Dive */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Protocoles logiciels légers : MQTT et CoAP
          </h3>
          <p className="text-sm text-[#9aa6c7] leading-relaxed mb-6">
            Côté logiciel, les objets utilisent des protocoles légers conçus pour les réseaux contraints.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* MQTT Card */}
            <div className="p-6 rounded-2xl bg-[#141b34] border border-[#1f2a4d]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-white">MQTT (Message Queuing Telemetry Transport)</h4>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono text-xs">TCP / IP</span>
              </div>
              <p className="text-xs sm:text-sm text-[#e5e9f5] leading-relaxed mb-4">
                <strong>MQTT</strong> fonctionne sur le principe de la <strong>publication et de l'abonnement (Pub/Sub)</strong> : un capteur publie une mesure sur un « sujet » (ex: <code>usine/moteur3/temperature</code>) et les applications intéressées la reçoivent via un courtier central (Broker).
              </p>
              <div className="p-3 rounded-lg bg-[#0b1020] border border-[#1f2a4d] text-xs font-mono space-y-1 text-[#9aa6c7]">
                <div className="text-cyan-400 font-semibold">Atouts clés pour l'IoT :</div>
                <div>• En-tête fixe minimaliste : seulement 2 octets</div>
                <div>• Trois niveaux de qualité de service (QoS 0, QoS 1, QoS 2)</div>
                <div>• Idéal pour réseaux mobiles instables et microcontrôleurs 32-bits</div>
              </div>
            </div>

            {/* CoAP Card */}
            <div className="p-6 rounded-2xl bg-[#141b34] border border-[#1f2a4d]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-white">CoAP (Constrained Application Protocol)</h4>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-xs">UDP / IP</span>
              </div>
              <p className="text-xs sm:text-sm text-[#e5e9f5] leading-relaxed mb-4">
                <strong>CoAP</strong> est une version allégée du web pour les petits appareils contraints en mémoire. Il transpose le modèle REST (GET, POST, PUT, DELETE) sur le protocole UDP pour s'affranchir de la lourdeur du handshake TCP.
              </p>
              <div className="p-3 rounded-lg bg-[#0b1020] border border-[#1f2a4d] text-xs font-mono space-y-1 text-[#9aa6c7]">
                <div className="text-amber-400 font-semibold">Atouts clés pour l'IoT :</div>
                <div>• Overhead de trame minimal (4 octets d'en-tête)</div>
                <div>• Support natif de la multidiffusion (Multicast)</div>
                <div>• Passerelle directe vers les architectures web HTTP/REST</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
