import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    beginner: {
      label: "Beginner",
      color: "#2E7D32",
    },
    intermediate: {
      label: "Intermediate",
      color: "#E65100",
    },
    advanced: {
      label: "Advanced",
      color: "#C62828",
    },
  };

  const config = difficultyConfig[difficulty];
  const isSmall = size === "small";

  return (
    <View style={[styles.badge, isSmall && styles.badgeSmall]}>
      <Ionicons name="ellipse" size={isSmall ? 12 : 16} color={config.color} />
      <Text
        style={[
          styles.text,
          { color: config.color },
          isSmall && styles.textSmall,
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    alignSelf: "flex-start",
  },
  badgeSmall: {
    gap: 4,
  },
  text: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.tertiary.semibold,
  },
  textSmall: {
    fontSize: 10,
  },
});
