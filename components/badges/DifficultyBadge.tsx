import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Difficulty } from "../../types";
import { Colors } from "../../constants/colors";
import { BorderRadius, Spacing, FontSize, FontFamily } from "../../constants";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  size?: "small" | "medium";
}

export function DifficultyBadge({
  difficulty,
  size = "medium",
}: DifficultyBadgeProps) {
  const difficultyConfig = {
    beginner: { label: "Beginner", color: Colors.difficulty.beginner },
    intermediate: {
      label: "Intermediate",
      color: Colors.difficulty.intermediate,
    },
    advanced: { label: "Advanced", color: Colors.difficulty.advanced },
  };

  const config = difficultyConfig[difficulty];
  const isSmall = size === "small";

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: config.color },
        isSmall && styles.badgeSmall,
      ]}
    >
      <Text style={[styles.text, isSmall && styles.textSmall]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: BorderRadius.badge,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    alignSelf: "flex-start",
  },
  badgeSmall: {
    paddingVertical: Spacing.xs / 2,
    paddingHorizontal: Spacing.sm,
  },
  text: {
    color: "#FFFFFF",
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.semibold,
  },
  textSmall: {
    fontSize: FontSize.xs,
  },
});
