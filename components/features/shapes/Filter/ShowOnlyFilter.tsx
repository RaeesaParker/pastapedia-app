import React from "react";
import { View, StyleSheet } from "react-native";
import { FilterCategory } from "../FilterCategory";
import { FilterChip } from "../FilterChip";
import { Spacing } from "../../../../constants";

interface ShowOnlyFilterProps {
  showCompleted: "all" | "completed" | "notCompleted";
  onToggleCompleted: () => void;
  onToggleNotCompleted: () => void;
}

export function ShowOnlyFilter({
  showCompleted,
  onToggleCompleted,
  onToggleNotCompleted,
}: ShowOnlyFilterProps) {
  return (
    <FilterCategory title="SHOW ONLY">
      <View style={styles.grid}>
        <FilterChip
          label="Shapes I've Made ✓"
          selected={showCompleted === "completed"}
          onPress={onToggleCompleted}
        />
        <FilterChip
          label="Shapes Not Yet Tried"
          selected={showCompleted === "notCompleted"}
          onPress={onToggleNotCompleted}
        />
      </View>
    </FilterCategory>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
});
