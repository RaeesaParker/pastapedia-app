import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { usePastaStore } from "../../../contexts/PastaContext";
import { SearchBar } from "./Filter/SearchBar";
import { FilterButton } from "./Filter/FilterButton";
import { ActiveFilters } from "./Filter/ActiveFilters";
import { ResultsCount } from "./Filter/ResultsCount";
import { FilterBottomSheet } from "./FilterBottomSheet";
import { FilterState } from "../../../types";
import { Spacing } from "../../../constants";

export default function FilterSection() {
  const { searchQuery, setSearchQuery, filters, setFilters, filteredPastas } =
    usePastaStore();
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const removeActiveFilter = (category: keyof FilterState, value: string) => {
    const current = filters[category] as string[];
    setFilters({ ...filters, [category]: current.filter((v) => v !== value) });
  };

  const removeExcludedEquipment = (value: string) => {
    const current = filters.excludedEquipment;
    setFilters({
      ...filters,
      excludedEquipment: current.filter((v) => v !== value),
    });
  };

  const getActiveFilterCount = () => {
    return (
      filters.types.length +
      filters.difficulties.length +
      filters.regions.length +
      filters.equipment.length +
      filters.excludedEquipment.length
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <FilterButton
        activeFilterCount={getActiveFilterCount()}
        onPress={() => setIsFilterSheetOpen(true)}
      />

      <ActiveFilters
        filters={filters}
        searchQuery={searchQuery}
        onRemoveFilter={removeActiveFilter}
        onRemoveExcludedEquipment={removeExcludedEquipment}
      />

      <ResultsCount count={filteredPastas.length} />

      <FilterBottomSheet
        visible={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        currentFilters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
});
