import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import {
  Spacing,
  FontSize,
  FontFamily,
  BorderRadius,
} from "../../../constants";

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: colors.card,
          borderColor: selected ? colors.primary : colors.border,
        },
        selected && { backgroundColor: colors.primary + "20" },
      ]}
      onPress={onPress}
      disabled={selected}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.chipText,
          { color: selected ? colors.primary : colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.badge,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
    textTransform: "capitalize",
  },
});
