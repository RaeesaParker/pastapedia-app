import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../hooks/useTheme";
import { Button } from "../../buttons/Button";
import { FilterCategory } from "./FilterCategory";
import { FilterChip } from "./FilterChip";
import {
  FilterState,
  PastaType,
  Difficulty,
  Equipment,
  Region,
} from "../../../types";
import { PASTA_DATABASE } from "../../../data/pastaData";
import {
  Spacing,
  FontSize,
  FontFamily,
  BorderRadius,
} from "../../../constants";

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
}

// Extract unique values from pasta database
const TYPES = Array.from(
  new Set(PASTA_DATABASE.map((p) => p.type))
) as PastaType[];
const DIFFICULTIES = Array.from(
  new Set(PASTA_DATABASE.map((p) => p.difficulty))
) as Difficulty[];
const REGIONS = Array.from(
  new Set(PASTA_DATABASE.map((p) => p.region))
).sort() as Region[];
const EQUIPMENT_OPTIONS = Array.from(
  new Set(PASTA_DATABASE.flatMap((p) => p.equipment))
).sort() as Equipment[];

export function FilterBottomSheet({
  visible,
  onClose,
  currentFilters,
  onApplyFilters,
}: FilterBottomSheetProps) {
  const { colors } = useTheme();
  const [tempFilters, setTempFilters] = useState(currentFilters);
  const [showMap, setShowMap] = useState(false);
  const [showCompleted, setShowCompleted] = useState<
    "all" | "completed" | "notCompleted"
  >("all");

  const handleClearFilters = () => {
    setTempFilters({
      types: [],
      difficulties: [],
      regions: [],
      equipment: [],
      searchQuery: "",
    });
    setShowCompleted("all");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const toggleFilter = <T extends string>(
    category: keyof FilterState,
    value: T
  ) => {
    const current = tempFilters[category] as T[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setTempFilters({ ...tempFilters, [category]: updated });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleMapVisibility = () => {
    setShowMap(!showMap);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.sheet, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Filter Shapes
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Type Filter */}
            <FilterCategory title="BY TYPE">
              <View style={styles.grid}>
                {TYPES.map((type) => (
                  <FilterChip
                    key={type}
                    label={type}
                    selected={tempFilters.types.includes(type)}
                    onPress={() => toggleFilter("types", type)}
                  />
                ))}
              </View>
            </FilterCategory>

            {/* Difficulty Filter */}
            <FilterCategory title="BY DIFFICULTY">
              <View style={styles.grid}>
                {DIFFICULTIES.map((diff) => (
                  <FilterChip
                    key={diff}
                    label={diff}
                    selected={tempFilters.difficulties.includes(diff)}
                    onPress={() => toggleFilter("difficulties", diff)}
                  />
                ))}
              </View>
            </FilterCategory>

            {/* Equipment Filter */}
            <FilterCategory title="BY EQUIPMENT">
              <View style={styles.grid}>
                {EQUIPMENT_OPTIONS.map((eq) => (
                  <FilterChip
                    key={eq}
                    label={eq}
                    selected={tempFilters.equipment.includes(eq)}
                    onPress={() => toggleFilter("equipment", eq)}
                  />
                ))}
              </View>
            </FilterCategory>

            {/* Region Filter */}
            <FilterCategory title="BY REGION">
              <TouchableOpacity
                style={styles.mapToggle}
                onPress={toggleMapVisibility}
              >
                <Ionicons
                  name={showMap ? "eye-off-outline" : "map-outline"}
                  size={18}
                  color={colors.primary}
                />
                <Text style={[styles.mapToggleText, { color: colors.primary }]}>
                  {showMap ? "Hide Map" : "Show Map"}
                </Text>
              </TouchableOpacity>

              {showMap && (
                <View
                  style={[
                    styles.mapPlaceholder,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[styles.mapText, { color: colors.textSecondary }]}
                  >
                    Interactive Italy Map
                  </Text>
                  <Text
                    style={[styles.mapSubtext, { color: colors.textSecondary }]}
                  >
                    Tap regions to filter
                  </Text>
                </View>
              )}

              <View style={styles.grid}>
                {REGIONS.map((region) => (
                  <FilterChip
                    key={region}
                    label={region}
                    selected={tempFilters.regions.includes(region)}
                    onPress={() => toggleFilter("regions", region)}
                  />
                ))}
              </View>
            </FilterCategory>

            {/* Show Only Filter */}
            <FilterCategory title="SHOW ONLY">
              <View style={styles.grid}>
                <FilterChip
                  label="Shapes I've Made ✓"
                  selected={showCompleted === "completed"}
                  onPress={() =>
                    setShowCompleted(
                      showCompleted === "completed" ? "all" : "completed"
                    )
                  }
                />
                <FilterChip
                  label="Shapes Not Yet Tried"
                  selected={showCompleted === "notCompleted"}
                  onPress={() =>
                    setShowCompleted(
                      showCompleted === "notCompleted" ? "all" : "notCompleted"
                    )
                  }
                />
              </View>
            </FilterCategory>
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <View style={styles.buttons}>
              <Button
                title="Clear All"
                onPress={handleClearFilters}
                variant="outline"
                style={styles.button}
              />
              <Button
                title="Apply Filters"
                onPress={handleApply}
                variant="primary"
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.primary.bold,
  },
  content: {
    padding: Spacing.lg,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  mapToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  mapToggleText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.semibold,
  },
  mapPlaceholder: {
    height: 200,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  mapText: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.tertiary.semibold,
  },
  mapSubtext: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.regular,
    marginTop: Spacing.xs,
  },
  footer: {
    borderTopWidth: 1,
    padding: Spacing.lg,
  },
  buttons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
});
