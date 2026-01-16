import { create } from "zustand";
import {
  Pasta,
  PastaType,
  Difficulty,
  Region,
  Equipment,
  FilterState,
} from "../types";
import { PASTA_DATABASE } from "../data/pastaData";

interface PastaStore {
  pastas: Pasta[];
  filteredPastas: Pasta[];
  filters: FilterState;
  searchQuery: string;

  // Actions
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
  getPastaById: (id: string) => Pasta | undefined;
  applyFilters: () => void;
}

const initialFilters: FilterState = {
  types: [],
  difficulties: [],
  regions: [],
  equipment: [],
  excludedEquipment: [],
  searchQuery: "",
};

export const usePastaStore = create<PastaStore>((set, get) => ({
  pastas: PASTA_DATABASE,
  filteredPastas: PASTA_DATABASE,
  filters: initialFilters,
  searchQuery: "",

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setFilters: (newFilters: Partial<FilterState>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().applyFilters();
  },

  clearFilters: () => {
    set({ filters: initialFilters, searchQuery: "" });
    get().applyFilters();
  },

  getPastaById: (id: string) => {
    return get().pastas.find((p) => p.id === id);
  },

  applyFilters: () => {
    const { pastas, filters, searchQuery } = get();

    let filtered = [...pastas];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.italianName.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.region.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter((p) => filters.types.includes(p.type));
    }

    // Difficulty filter
    if (filters.difficulties.length > 0) {
      filtered = filtered.filter((p) =>
        filters.difficulties.includes(p.difficulty)
      );
    }

    // Region filter
    if (filters.regions.length > 0) {
      filtered = filtered.filter((p) => filters.regions.includes(p.region));
    }

    // Equipment filter (pasta must have at least one of the selected equipment)
    if (filters.equipment.length > 0) {
      filtered = filtered.filter((p) =>
        p.equipment.some((eq) => filters.equipment.includes(eq))
      );
    }

    // Excluded equipment filter (pasta must not have any of the excluded equipment)
    if (filters.excludedEquipment.length > 0) {
      filtered = filtered.filter(
        (p) => !p.equipment.some((eq) => filters.excludedEquipment.includes(eq))
      );
    }

    set({ filteredPastas: filtered });
  },
}));
