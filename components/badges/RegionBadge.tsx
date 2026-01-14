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
    <View style={[styles.badge, isSmall && styles.badgeSmall]}>
      <Ionicons
        name="location"
        size={isSmall ? 12 : 16}
        color={colors.primaryDark}
      />
      <Text
        style={[
          styles.text,
          { color: colors.primaryDark },
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
    gap: Spacing.xs,
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
