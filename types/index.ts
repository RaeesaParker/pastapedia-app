export type ThemeMode = "light" | "dark";

export type PastaType =
  | "long"
  | "short"
  | "filled"
  | "sheet"
  | "soup"
  | "specialty";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Region =
  | "Abruzzo"
  | "Basilicata"
  | "Calabria"
  | "Campania"
  | "Emilia-Romagna"
  | "Friuli-Venezia Giulia"
  | "Lazio"
  | "Liguria"
  | "Lombardy"
  | "Marche"
  | "Molise"
  | "Piedmont"
  | "Puglia"
  | "Sardinia"
  | "Sicily"
  | "Tuscany"
  | "Trentino-Alto Adige"
  | "Umbria"
  | "Valle d'Aosta"
  | "Veneto";

export type Equipment =
  | "Rolling Pin"
  | "Pasta Machine"
  | "Chitarra"
  | "Gnocchi Board"
  | "Ravioli Stamp"
  | "Ferretto"
  | "Fork"
  | "Knife"
  | "None";

export interface PastaInstruction {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
}

export interface SaucePairing {
  name: string;
  description: string;
  compatibility: "excellent" | "good" | "acceptable";
}

export interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  prepTime: number;
  difficulty: Difficulty;
}

export interface NutritionalInfo {
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Pasta {
  id: string;
  name: string;
  italianName: string;
  type: PastaType;
  region: Region;
  difficulty: Difficulty;
  equipment: Equipment[];
  prepTime: number; // in minutes
  description: string;
  history?: string;
  instructions: PastaInstruction[];
  saucePairings: SaucePairing[];
  recipes: Recipe[];
  imageUrl: string;
  thumbnailUrl: string;
  nutritionalInfo?: NutritionalInfo;
  tags?: string[];
}

export interface ProgressEntry {
  pastaId: string;
  completedAt: Date;
  rating?: number; // 1-5 stars
  notes?: string;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedAt?: Date;
  requirement: {
    type: "count" | "region" | "difficulty" | "type";
    target: number | string;
  };
}

export interface UserProgress {
  completedPastas: string[]; // Array of pasta IDs
  progressEntries: ProgressEntry[];
  achievements: Achievement[];
  stats: {
    totalMade: number;
    uniqueShapes: number;
    regionsCovered: number;
    favoriteRegion?: Region;
  };
}

export interface FilterState {
  types: PastaType[];
  difficulties: Difficulty[];
  regions: Region[];
  equipment: Equipment[];
  searchQuery: string;
}

export interface RegionMapData {
  region: Region;
  coordinates: string; // SVG path coordinates
  labelPosition: { x: number; y: number };
}
