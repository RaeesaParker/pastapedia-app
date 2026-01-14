import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import { BorderRadius, Spacing, FontSize, FontFamily } from "../../constants";

interface RegionBadgeProps {
  region: string;
  size?: "small" | "medium";
}

export function RegionBadge({ region, size = "medium" }: RegionBadgeProps) {
  const { colors } = useTheme();
  const isSmall = size === "small";

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.cardElevated, borderColor: colors.border },
        isSmall && styles.badgeSmall,
      ]}
    >
      <Ionicons
        name="location-outline"
        size={isSmall ? 14 : 16}
        color={colors.primary}
      />
      <Text
        style={[
          styles.text,
          { color: colors.textSecondary },
          isSmall && styles.textSmall,
        ]}
      >
        {region}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: BorderRadius.badge,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
  },
  badgeSmall: {
    paddingVertical: 2,
    paddingHorizontal: Spacing.xs,
  },
  text: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.tertiary.medium,
  },
  textSmall: {
    fontSize: 10,
  },
});
