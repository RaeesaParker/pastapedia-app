import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../hooks/useTheme";
import { usePastaStore } from "../../../contexts/PastaContext";
import { FilterTag } from "./FilterTag";
import { FilterBottomSheet } from "./FilterBottomSheet";
import { FilterState } from "../../../types";
import {
  Spacing,
  FontSize,
  FontFamily,
  BorderRadius,
} from "../../../constants";

export default function FilterSection() {
  const { colors } = useTheme();
  const { searchQuery, setSearchQuery, filters, setFilters, filteredPastas } =
    usePastaStore();
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsFilterSheetOpen(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const removeActiveFilter = (category: keyof FilterState, value: string) => {
    const current = filters[category] as string[];
    setFilters({ ...filters, [category]: current.filter((v) => v !== value) });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const removeExcludedEquipment = (value: string) => {
    const current = filters.excludedEquipment;
    setFilters({ ...filters, excludedEquipment: current.filter((v) => v !== value) });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

  const hasActiveFilters = getActiveFilterCount() > 0 || searchQuery.length > 0;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search pasta shapes..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Button */}
      <TouchableOpacity
        style={[
          styles.filterButton,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={handleOpenSheet}
      >
        <Ionicons name="options-outline" size={20} color={colors.text} />
        <Text style={[styles.filterButtonText, { color: colors.text }]}>
          Filter
        </Text>
        {getActiveFilterCount() > 0 && (
          <View
            style={[styles.filterBadge, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.filterBadgeText}>{getActiveFilterCount()}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Active Filters */}
      {hasActiveFilters && (
        <View style={styles.activeFiltersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.types.map((type) => (
              <FilterTag
                key={type}
                label={type}
                onRemove={() => removeActiveFilter("types", type)}
              />
            ))}
            {filters.difficulties.map((diff) => (
              <FilterTag
                key={diff}
                label={diff}
                onRemove={() => removeActiveFilter("difficulties", diff)}
              />
            ))}
            {filters.regions.map((region) => (
              <FilterTag
                key={region}
                label={region}
                onRemove={() => removeActiveFilter("regions", region)}
              />
            ))}
            {filters.equipment.map((eq) => (
              <FilterTag
                key={eq}
                label={eq}
                onRemove={() => removeActiveFilter("equipment", eq)}
              />
            ))}
            {filters.excludedEquipment.map((eq) => (
              <FilterTag
                key={`excluded-${eq}`}
                label={`Not ${eq}`}
                excluded
                onRemove={() => removeExcludedEquipment(eq)}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results Count */}
      <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
        {filteredPastas.length}{" "}
        {filteredPastas.length === 1 ? "shape" : "shapes"} found
      </Text>

      {/* Filter Bottom Sheet */}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.base,
    fontFamily: FontFamily.tertiary.regular,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  filterButtonText: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.tertiary.semibold,
  },
  filterBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBadgeText: {
    color: "#FFFFFF",
    fontSize: FontSize.xs,
    fontFamily: FontFamily.tertiary.bold,
  },
  activeFiltersContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  resultsCount: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.regular,
  },
});
