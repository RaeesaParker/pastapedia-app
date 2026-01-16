import React from "react";
import { View, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { FilterCategory } from "../FilterCategory";
import { FilterChip } from "../FilterChip";
import { PastaType } from "../../../../types";
import { Spacing } from "../../../../constants";

interface TypeFilterProps {
  types: PastaType[];
  selectedTypes: PastaType[];
  onToggle: (type: PastaType) => void;
}

export function TypeFilter({
  types,
  selectedTypes,
  onToggle,
}: TypeFilterProps) {
  const handleToggle = (type: PastaType) => {
    onToggle(type);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <FilterCategory title="BY TYPE">
      <View style={styles.grid}>
        {types.map((type) => (
          <FilterChip
            key={type}
            label={type}
            selected={selectedTypes.includes(type)}
            onPress={() => handleToggle(type)}
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
