import React from "react";
import { View, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { FilterCategory } from "../FilterCategory";
import { FilterChip } from "../FilterChip";
import { Difficulty } from "../../../../types";
import { Spacing } from "../../../../constants";

interface DifficultyFilterProps {
  difficulties: Difficulty[];
  selectedDifficulties: Difficulty[];
  onToggle: (difficulty: Difficulty) => void;
}

export function DifficultyFilter({
  difficulties,
  selectedDifficulties,
  onToggle,
}: DifficultyFilterProps) {
  const handleToggle = (difficulty: Difficulty) => {
    onToggle(difficulty);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <FilterCategory title="BY DIFFICULTY">
      <View style={styles.grid}>
        {difficulties.map((diff) => (
          <FilterChip
            key={diff}
            label={diff}
            selected={selectedDifficulties.includes(diff)}
            onPress={() => handleToggle(diff)}
          />
        ))}
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
