import React, { useState } from 'react';
import { ARCHITECTURE_LAYERS } from '../data/iotContent';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Layers,
  Cpu,
  Radio,
  Server,
  LayoutDashboard,
  Play,
  RotateCcw,
  Zap,
  Gauge,
  Check,
  AlertTriangle,
} from 'lucide-react';

interface SimulationState {
  sensor: 'dht22' | 'vibration' | 'pir' | 'gps' | 'co2';
  protocol: 'lorawan' | 'wifi' | 'ble' | '5g' | 'zigbee';
  target: 'edge' | 'cloud';
  isAnomaly: boolean;
  transmitting: boolean;
  lastPacket: {
    timestamp: string;
    payloadJson: string;
    latencyMs: number;
    rssi: number;
    batteryCost: string;
    actionResult: string;
  } | null;
}

const SENSORS = [
  { id: 'dht22', name: 'Température & Humidité (DHT22)', unit: '°C / %', normalVal: '21.4°C, 48%', anomalyVal: '44.8°C (Surchauffe)' },
  { id: 'vibration', name: 'Vibration triaxiale (Moteur)', unit: 'g / mm/s', normalVal: '0.42 g RMS (Nominal)', anomalyVal: '5.87 g (Défaut palier)' },
  { id: 'co2', name: 'Qualité de l\'air CO2 (NDIR)', unit: 'ppm', normalVal: '480 ppm (Air sain)', anomalyVal: '1850 ppm (Seuil alerte)' },
  { id: 'pir', name: 'Détecteur présence (PIR)', unit: 'État', normalVal: 'Inoccupé (Veille)', anomalyVal: 'Intrusion détectée' },
  { id: 'gps', name: 'Traqueur conteneur (GNSS)', unit: 'Coordonnées', normalVal: '48.8566 N, 2.3522 E (Sur route)', anomalyVal: 'Hors zone autorisée' },
] as const;

export const ArchitectureSection: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);
  const [sim, setSim] = useState<SimulationState>({
    sensor: 'dht22',
    protocol: 'lorawan',
    target: 'edge',
    isAnomaly: false,
    transmitting: false,
    lastPacket: null,
  });

  const layerIcons = [
    <Cpu key="1" className="w-5 h-5" />,
    <Radio key="2" className="w-5 h-5" />,
    <Server key="3" className="w-5 h-5" />,
    <LayoutDashboard key="4" className="w-5 h-5" />,
  ];

  const handleTransmit = (anomaly: boolean = false) => {
    setSim((prev) => ({ ...prev, transmitting: true, isAnomaly: anomaly }));

    setTimeout(() => {
      const currentSensor = SENSORS.find((s) => s.id === sim.sensor)!;
      const value = anomaly ? currentSensor.anomalyVal : currentSensor.normalVal;

      let latency = 5;
      if (sim.target === 'cloud') {
        latency = sim.protocol === '5g' ? 22 : sim.protocol === 'wifi' ? 45 : 120;
      } else {
        latency = sim.protocol === 'ble' ? 4 : 8;
      }

      let action = 'Régulation normale : données enregistrées';
      if (anomaly) {
        if (sim.sensor === 'dht22') action = 'DÉCLENCHÉ : Vanne de refroidissement activée & alerte envoyée';
        else if (sim.sensor === 'vibration') action = 'DÉCLENCHÉ : Ralentissement d\'urgence du moteur & ordre GMAO émis';
        else if (sim.sensor === 'co2') action = 'DÉCLENCHÉ : Ventilation mécanique forcée à 100%';
        else if (sim.sensor === 'pir') action = 'DÉCLENCHÉ : Éclairage de sécurité activé & enregistrement caméra';
        else action = 'DÉCLENCHÉ : Alerte rupture géofencing transmise à l\'exploitant';
      }

      const samplePacket = {
        timestamp: new Date().toLocaleTimeString('fr-FR'),
        payloadJson: JSON.stringify(
          {
            devId: `NODE-${sim.sensor.toUpperCase()}-087`,
            val: value,
            proto: sim.protocol.toUpperCase(),
            dest: sim.target === 'edge' ? 'LOCAL_GATEWAY' : 'CLOUD_BROKER_MQTT',
            status: anomaly ? 'WARNING' : 'NOMINAL',
          },
          null,
          2
        ),
        latencyMs: latency,
        rssi: Math.floor(Math.random() * 25) - 85,
        batteryCost: sim.protocol === 'lorawan' ? '0.002 mAh (Ultra faible)' : sim.protocol === 'wifi' ? '0.15 mAh (Élevée)' : '0.01 mAh',
        actionResult: action,
      };

      setSim((prev) => ({
        ...prev,
        transmitting: false,
        lastPacket: samplePacket,
      }));
    }, 600);
  };

  return (
    <section id="architecture" className="py-16 border-b border-[#1f2a4d]/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <Layers className="w-4 h-4" />
          <span>Chapitre 03 · Architecture système</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Comment fonctionne un système IoT ?
        </h2>
        <p className="text-base text-[#9aa6c7] max-w-3xl mb-8 leading-relaxed">
          Un système IoT repose sur une chaîne de quatre grandes couches qui transforment un phénomène physique en décision.
        </p>

        {/* 4 Layers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ARCHITECTURE_LAYERS.map((layer, index) => {
            const isSelected = selectedLayer === index;
            return (
              <div
                key={layer.number}
                onClick={() => setSelectedLayer(index)}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#141b34] border-cyan-400 shadow-md ring-1 ring-cyan-400/20'
                    : 'bg-[#0f152a] border-[#1f2a4d] hover:border-cyan-500/40 text-[#9aa6c7]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? 'bg-cyan-400 text-[#0b1020]' : 'bg-[#141b34] text-cyan-400'}`}>
                    {layerIcons[index]}
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#9aa6c7]">
                    0{layer.number}
                  </span>
                </div>
                <h3 className={`text-base font-bold mb-1 ${isSelected ? 'text-white' : 'text-[#e5e9f5]'}`}>
                  {layer.name}
                </h3>
                <p className="text-xs text-cyan-400 font-medium mb-2">
                  {layer.subtitle}
                </p>
                <p className="text-xs text-[#9aa6c7] line-clamp-3">
                  {layer.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Layer Technical Detail Card */}
        <div className="p-6 rounded-2xl bg-[#141b34] border border-[#1f2a4d] mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-medium">
              Couche 0{ARCHITECTURE_LAYERS[selectedLayer].number}
            </span>
            <h3 className="text-xl font-bold text-white">
              {ARCHITECTURE_LAYERS[selectedLayer].name}
            </h3>
          </div>
          <p className="text-sm text-[#e5e9f5] mb-4 leading-relaxed">
            {ARCHITECTURE_LAYERS[selectedLayer].description}
          </p>

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-[#1f2a4d] text-xs">
            <div>
              <span className="font-semibold text-cyan-400 block mb-1.5">Composants & Technologies typiques :</span>
              <ul className="space-y-1 text-[#9aa6c7]">
                {ARCHITECTURE_LAYERS[selectedLayer].examples.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-amber-400 block mb-1.5">Défis & Contraintes techniques :</span>
              <p className="text-[#9aa6c7] leading-relaxed">
                {ARCHITECTURE_LAYERS[selectedLayer].keyChallenges}
              </p>
            </div>
          </div>
        </div>

        {/* Original Hardware Tradeoff Note & Image */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="p-6 rounded-2xl bg-[#0f152a] border border-[#1f2a4d]">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
              <Zap className="w-4 h-4" />
              <span>Le dilemme fondamental de l'ingénieur IoT</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3">
              Le compromis Puissance vs Autonomie vs Portée vs Coût
            </h4>
            <p className="text-sm text-[#9aa6c7] leading-relaxed mb-4">
              Les objets sont généralement pilotés par un <strong>microcontrôleur à très faible consommation</strong>, parfois alimenté par pile pendant plusieurs années. La conception d'un objet IoT est donc toujours un compromis d'ingénierie rigoureux :
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#141b34] border border-[#1f2a4d]">
                <span className="text-cyan-400 font-bold block mb-0.5">Puissance calcul</span>
                <span className="text-[#9aa6c7]">MCU 8/32 bits (16-160 MHz)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141b34] border border-[#1f2a4d]">
                <span className="text-amber-400 font-bold block mb-0.5">Autonomie</span>
                <span className="text-[#9aa6c7]">Piles lithium (jusqu'à 10 ans)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141b34] border border-[#1f2a4d]">
                <span className="text-cyan-400 font-bold block mb-0.5">Portée radio</span>
                <span className="text-[#9aa6c7]">10 m (BLE) à 15 km (LoRaWAN)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141b34] border border-[#1f2a4d]">
                <span className="text-amber-400 font-bold block mb-0.5">Coût unitaire</span>
                <span className="text-[#9aa6c7]">0,80 € à 15 € la puce</span>
              </div>
            </div>
          </div>

          <ImageWithFallback
            src="https://res.cloudinary.com/dr7ekchzr/image/upload/v1792403360/1792403257971_lyznir.jpg"
            alt="Chaîne capteur, réseau, cloud, application"
            caption="Illustration de la chaîne complète de transformation : du capteur à l'action métier."
            aspectRatio="16/9"
          />
        </div>

        {/* INTERACTIVE TELEMETRY SIMULATOR */}
        <div id="simulateur" className="p-6 sm:p-8 rounded-2xl bg-[#0b1020] border-2 border-cyan-500/30 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1f2a4d]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <Gauge className="w-4 h-4" />
                <span>Simulateur en direct · Télémétrie 4 couches</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Banc d'essai télémétrique interactif
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTransmit(false)}
                disabled={sim.transmitting}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0b1020] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-lg cursor-pointer transition-all shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{sim.transmitting ? 'Transmission...' : 'Émettre trame nominale'}</span>
              </button>
              <button
                onClick={() => handleTransmit(true)}
                disabled={sim.transmitting}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 disabled:opacity-50 rounded-lg cursor-pointer transition-all shadow-sm"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simuler alerte critique</span>
              </button>
            </div>
          </div>

          {/* Interactive Controls Row */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-[#9aa6c7] mb-2">1. Capteur de départ</label>
              <select
                value={sim.sensor}
                onChange={(e) => setSim({ ...sim, sensor: e.target.value as any })}
                className="w-full px-3 py-2 bg-[#141b34] border border-[#1f2a4d] rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {SENSORS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9aa6c7] mb-2">2. Protocole radio</label>
              <select
                value={sim.protocol}
                onChange={(e) => setSim({ ...sim, protocol: e.target.value as any })}
                className="w-full px-3 py-2 bg-[#141b34] border border-[#1f2a4d] rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="lorawan">LoRaWAN (LPWAN longue portée)</option>
                <option value="wifi">Wi-Fi (Haut débit local)</option>
                <option value="ble">Bluetooth Low Energy (Court rayon)</option>
                <option value="5g">5G (Cellulaire temps réel)</option>
                <option value="zigbee">Zigbee / Thread (Maillage domotique)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9aa6c7] mb-2">3. Cible d'analyse</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSim({ ...sim, target: 'edge' })}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    sim.target === 'edge'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-[#141b34] border-[#1f2a4d] text-[#9aa6c7]'
                  }`}
                >
                  Edge Gateway (&lt; 5 ms)
                </button>
                <button
                  type="button"
                  onClick={() => setSim({ ...sim, target: 'cloud' })}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    sim.target === 'cloud'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-[#141b34] border-[#1f2a4d] text-[#9aa6c7]'
                  }`}
                >
                  Cloud Central (Big Data)
                </button>
              </div>
            </div>
          </div>

          {/* Simulator Transmission Visualizer */}
          <div className="p-4 rounded-xl bg-[#141b34] border border-[#1f2a4d]">
            <div className="flex items-center justify-between text-xs text-[#9aa6c7] mb-3">
              <span className="font-semibold text-white">Trajet du paquet télémétrique :</span>
              {sim.transmitting && (
                <span className="text-cyan-400 font-mono animate-pulse">Transmission en cours sur le bus radio...</span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs mb-4">
              <div className={`p-2.5 rounded-lg border ${sim.transmitting ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-[#1f2a4d] bg-[#0b1020] text-[#9aa6c7]'}`}>
                <span className="block font-semibold">1. Capteur</span>
                <span className="text-[10px] text-cyan-400">{sim.sensor.toUpperCase()}</span>
              </div>
              <div className={`p-2.5 rounded-lg border ${sim.transmitting ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-[#1f2a4d] bg-[#0b1020] text-[#9aa6c7]'}`}>
                <span className="block font-semibold">2. Radio</span>
                <span className="text-[10px] text-cyan-400">{sim.protocol.toUpperCase()}</span>
              </div>
              <div className={`p-2.5 rounded-lg border ${sim.transmitting ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-[#1f2a4d] bg-[#0b1020] text-[#9aa6c7]'}`}>
                <span className="block font-semibold">3. Traitement</span>
                <span className="text-[10px] text-amber-400">{sim.target.toUpperCase()}</span>
              </div>
              <div className={`p-2.5 rounded-lg border ${sim.lastPacket ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-300' : 'border-[#1f2a4d] bg-[#0b1020] text-[#9aa6c7]'}`}>
                <span className="block font-semibold">4. Décision</span>
                <span className="text-[10px]">{sim.lastPacket ? 'Exécutée' : 'En attente'}</span>
              </div>
            </div>

            {/* Packet Log Output */}
            {sim.lastPacket ? (
              <div className="p-3 rounded-lg bg-[#0b1020] border border-[#1f2a4d] text-xs font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[#9aa6c7] mb-2 border-b border-[#1f2a4d] pb-2">
                  <span>Horodatage : {sim.lastPacket.timestamp}</span>
                  <span className="text-cyan-400">Latence mesurée : {sim.lastPacket.latencyMs} ms</span>
                  <span>Signal RSSI : {sim.lastPacket.rssi} dBm</span>
                  <span>Coût énergétique : {sim.lastPacket.batteryCost}</span>
                </div>
                <pre className="text-cyan-300 overflow-x-auto text-[11px] mb-2">{sim.lastPacket.payloadJson}</pre>
                <div className={`p-2 rounded text-xs font-semibold ${sim.isAnomaly ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                  {sim.lastPacket.actionResult}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-lg bg-[#0b1020] border border-[#1f2a4d] text-center text-xs text-[#9aa6c7]">
                Cliquez sur « Émettre trame nominale » ou « Simuler alerte critique » pour injecter un paquet de données physique et observer la chaîne de décision en temps réel.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
