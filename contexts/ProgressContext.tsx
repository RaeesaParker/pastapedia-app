import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProgress, ProgressEntry, Region } from "../types";
import { ACHIEVEMENTS } from "../data/achievementsData";
import { PASTA_DATABASE } from "../data/pastaData";

const PROGRESS_STORAGE_KEY = "@pastapedia_progress";

interface ProgressStore extends UserProgress {
  isLoaded: boolean;

  // Actions
  loadProgress: () => Promise<void>;
  markPastaAsComplete: (
    pastaId: string,
    rating?: number,
    notes?: string
  ) => Promise<void>;
  removePastaFromComplete: (pastaId: string) => Promise<void>;
  updateProgressEntry: (
    pastaId: string,
    data: Partial<ProgressEntry>
  ) => Promise<void>;
  checkAndUnlockAchievements: () => void;
  calculateStats: () => void;
  saveProgress: () => Promise<void>;
}

const initialProgress: UserProgress = {
  completedPastas: [],
  progressEntries: [],
  achievements: ACHIEVEMENTS.map((a) => ({ ...a })),
  stats: {
    totalMade: 0,
    uniqueShapes: 0,
    regionsCovered: 0,
  },
};

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...initialProgress,
  isLoaded: false,

  loadProgress: async () => {
    try {
      const stored = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        parsed.progressEntries = parsed.progressEntries.map((entry: any) => ({
          ...entry,
          completedAt: new Date(entry.completedAt),
        }));
        parsed.achievements = parsed.achievements.map((ach: any) => ({
          ...ach,
          unlockedAt: ach.unlockedAt ? new Date(ach.unlockedAt) : undefined,
        }));
        set({ ...parsed, isLoaded: true });
      } else {
        set({ isLoaded: true });
      }
    } catch (error) {
      console.error("Error loading progress:", error);
      set({ isLoaded: true });
    }
  },

  markPastaAsComplete: async (
    pastaId: string,
    rating?: number,
    notes?: string
  ) => {
    const state = get();

    // Don't add duplicates
    if (state.completedPastas.includes(pastaId)) {
      return;
    }

    const newEntry: ProgressEntry = {
      pastaId,
      completedAt: new Date(),
      rating,
      notes,
    };

    set({
      completedPastas: [...state.completedPastas, pastaId],
      progressEntries: [...state.progressEntries, newEntry],
    });

    get().calculateStats();
    get().checkAndUnlockAchievements();
    await get().saveProgress();
  },

  removePastaFromComplete: async (pastaId: string) => {
    const state = get();

    set({
      completedPastas: state.completedPastas.filter((id) => id !== pastaId),
      progressEntries: state.progressEntries.filter(
        (e) => e.pastaId !== pastaId
      ),
    });

    get().calculateStats();
    await get().saveProgress();
  },

  updateProgressEntry: async (
    pastaId: string,
    data: Partial<ProgressEntry>
  ) => {
    const state = get();

    const updatedEntries = state.progressEntries.map((entry) =>
      entry.pastaId === pastaId ? { ...entry, ...data } : entry
    );

    set({ progressEntries: updatedEntries });
    await get().saveProgress();
  },

  calculateStats: () => {
    const state = get();
    const completedPastas = PASTA_DATABASE.filter((p) =>
      state.completedPastas.includes(p.id)
    );

    const uniqueRegions = new Set(completedPastas.map((p) => p.region));

    // Find favorite region (most completed)
    const regionCounts = completedPastas.reduce((acc, pasta) => {
      acc[pasta.region] = (acc[pasta.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const favoriteRegion = Object.entries(regionCounts).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0] as Region | undefined;

    set({
      stats: {
        totalMade: state.progressEntries.length,
        uniqueShapes: state.completedPastas.length,
        regionsCovered: uniqueRegions.size,
        favoriteRegion,
      },
    });
  },

  checkAndUnlockAchievements: () => {
    const state = get();
    const updatedAchievements = state.achievements.map((achievement) => {
      if (achievement.unlockedAt) return achievement;

      let isUnlocked = false;

      switch (achievement.requirement.type) {
        case "count":
          isUnlocked =
            state.stats.uniqueShapes >=
            (achievement.requirement.target as number);
          break;
        case "region":
          if (typeof achievement.requirement.target === "number") {
            isUnlocked =
              state.stats.regionsCovered >= achievement.requirement.target;
          } else {
            // Specific region achievement
            const regionPastas = PASTA_DATABASE.filter(
              (p) => p.region === achievement.requirement.target
            );
            const completedInRegion = regionPastas.filter((p) =>
              state.completedPastas.includes(p.id)
            );
            isUnlocked = completedInRegion.length === regionPastas.length;
          }
          break;
        case "difficulty":
          const difficultyPastas = PASTA_DATABASE.filter(
            (p) => p.difficulty === achievement.requirement.target
          );
          const completedDifficulty = difficultyPastas.filter((p) =>
            state.completedPastas.includes(p.id)
          );
          isUnlocked = completedDifficulty.length === difficultyPastas.length;
          break;
        case "type":
          const typePastas = PASTA_DATABASE.filter(
            (p) => p.type === achievement.requirement.target
          );
          const completedType = typePastas.filter((p) =>
            state.completedPastas.includes(p.id)
          );
          isUnlocked = completedType.length === typePastas.length;
          break;
      }

      if (isUnlocked) {
        return { ...achievement, unlockedAt: new Date() };
      }
      return achievement;
    });

    set({ achievements: updatedAchievements });
  },

  saveProgress: async () => {
    const state = get();
    const toSave = {
      completedPastas: state.completedPastas,
      progressEntries: state.progressEntries,
      achievements: state.achievements,
      stats: state.stats,
    };

    try {
      await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  },
}));
