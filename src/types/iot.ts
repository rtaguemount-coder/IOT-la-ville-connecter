export interface TimelineItem {
  year: string;
  period: string;
  title: string;
  summary: string;
  details: string;
  impact: string;
}

export interface ArchitectureLayer {
  number: number;
  name: string;
  subtitle: string;
  description: string;
  examples: string[];
  keyChallenges: string;
}

export interface ConnectivityProtocol {
  id: string;
  name: string;
  category: 'Local' | 'Maillé' | 'LPWAN' | 'Cellulaire';
  range: string;
  rangeKm: number;
  throughput: string;
  throughputScore: number; // 1 to 5
  batteryLife: string;
  batteryScore: number; // 1 to 5 (5 = years)
  typicalUse: string;
  pros: string[];
  cons: string[];
  standard: string;
}

export interface SectorItem {
  id: string;
  name: string;
  iconName: string;
  summary: string;
  content: string;
  detailedPoints: string[];
  typicalSensors: string[];
  concreteExample: string;
  image?: string;
  imageAlt?: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  bestPractices: string[];
  regulatoryNote?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
