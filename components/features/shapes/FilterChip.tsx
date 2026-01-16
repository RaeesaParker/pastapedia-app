import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
  excluded?: boolean;
  onPress: () => void;
}

export function FilterChip({
  label,
  selected,
  excluded = false,
  onPress,
}: FilterChipProps) {
  const { colors } = useTheme();

  const getChipStyle = () => {
    if (excluded) {
      return {
        backgroundColor: "#D97757" + "20",
        borderColor: "#D97757",
      };
    }
    if (selected) {
      return {
        backgroundColor: colors.primary + "20",
        borderColor: colors.primary,
      };
    }
    return {
      backgroundColor: colors.card,
      borderColor: colors.border,
    };
  };

  const getTextColor = () => {
    if (excluded) return "#D97757";
    if (selected) return colors.primary;
    return colors.text;
  };

  return (
    <TouchableOpacity
      style={[styles.chip, getChipStyle()]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {selected && (
        <Ionicons
          name="checkmark-circle"
          size={16}
          color={colors.primary}
          style={styles.icon}
        />
      )}
      {excluded && (
        <Ionicons
          name="close-circle"
          size={16}
          color="#D97757"
          style={styles.icon}
        />
      )}
      <Text style={[styles.chipText, { color: getTextColor() }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.badge,
    borderWidth: 1.5,
    gap: Spacing.xs,
  },
  icon: {
    marginRight: 2,
  },
  chipText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
    textTransform: "capitalize",
  },
});
