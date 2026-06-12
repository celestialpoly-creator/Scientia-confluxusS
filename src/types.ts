export interface Milestone {
  year: string;
  title: string;
  discoverer: string;
  howObserved: string; // Detail on the observation/experiment context
  description: string;
  details: string; // Elaborate details
  icon: string; // e.g. "lightbulb", "search", "cpu", "globe", "activity", "microscope", "flask", "atom"
  impactScale: number; // 0-100 indicating general breakthrough significance
  imageUrl?: string;
  imageSource?: string;
  imagePrompt?: string;
}

export interface Figure {
  name: string;
  dates: string;
  role: string;
  bio: string;
  contributions: string[];
  imageUrl?: string;
  imageSource?: string;
  imagePrompt?: string;
  autobiography?: string;
  books?: { title: string; description: string }[];
  wikipediaUrl?: string;
}

export interface LabStatus {
  labsAttempting: string[];
  currentNearness: number; // Percentage 0-100 indicating closeness to lab creation, detection or replication
  statusSummary: string;
  achievements2026: string; // Current state as of 2026
  methodologyUsed: string; // Dynamic details about experimental methods (colliders, cryogenics, deep underground)
  futureMilestream: string; // What lies ahead
}

export interface CoreConcept {
  id: string;
  title: string;
  explanation: string;
  svgDiagramHint?: string; // e.g. "atom", "vortex", "wave", "cluster" to choose visual accent
}

export interface AcademicPaper {
  title: string;
  authors: string;
  year: string;
  summary: string;
  difficulty: "Introductory" | "Intermediate" | "Advanced";
  significance: string;
}

export interface Paper {
  id: string;
  title: string;
  journal: string;
  year: number;
  authors: string;
  summary: string;
  tags: string[];
  content: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  citationsCode: string;
  isBookmarked?: boolean;
}

export interface TopicDossier {
  topic: string;
  description: string;
  category: string;
  eraSummary: string; // historical overview overview
  milestones: Milestone[];
  figures: Figure[];
  labStatus: LabStatus;
  concepts: CoreConcept[];
  papers: AcademicPaper[];
  relatedQueries: string[];
  sources?: { title: string; uri: string }[];
}
