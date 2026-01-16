import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { FilterTag } from "../FilterTag";
import { FilterState } from "../../../../types";
import { Spacing } from "../../../../constants";

interface ActiveFiltersProps {
  filters: FilterState;
  searchQuery: string;
  onRemoveFilter: (category: keyof FilterState, value: string) => void;
  onRemoveExcludedEquipment: (value: string) => void;
}

export function ActiveFilters({
  filters,
  searchQuery,
  onRemoveFilter,
  onRemoveExcludedEquipment,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    filters.types.length +
      filters.difficulties.length +
      filters.regions.length +
      filters.equipment.length +
      filters.excludedEquipment.length >
      0 || searchQuery.length > 0;

  if (!hasActiveFilters) return null;

  const handleRemoveFilter = (category: keyof FilterState, value: string) => {
    onRemoveFilter(category, value);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleRemoveExcluded = (value: string) => {
    onRemoveExcludedEquipment(value);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {filters.types.map((type) => (
        <FilterTag
          key={type}
          label={type}
          onRemove={() => handleRemoveFilter("types", type)}
        />
      ))}
      {filters.difficulties.map((diff) => (
        <FilterTag
          key={diff}
          label={diff}
          onRemove={() => handleRemoveFilter("difficulties", diff)}
        />
      ))}
      {filters.regions.map((region) => (
        <FilterTag
          key={region}
          label={region}
          onRemove={() => handleRemoveFilter("regions", region)}
        />
      ))}
      {filters.equipment.map((eq) => (
        <FilterTag
          key={eq}
          label={eq}
          onRemove={() => handleRemoveFilter("equipment", eq)}
        />
      ))}
      {filters.excludedEquipment.map((eq) => (
        <FilterTag
          key={`excluded-${eq}`}
          label={`Not ${eq}`}
          excluded
          onRemove={() => handleRemoveExcluded(eq)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
