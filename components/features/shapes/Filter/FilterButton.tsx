import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../../hooks/useTheme";
import {
  Spacing,
  FontSize,
  FontFamily,
  BorderRadius,
} from "../../../../constants";

interface FilterButtonProps {
  activeFilterCount: number;
  onPress: () => void;
}

export function FilterButton({
  activeFilterCount,
  onPress,
}: FilterButtonProps) {
  const { colors } = useTheme();

  const handlePress = () => {
    onPress();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={handlePress}
    >
      <Ionicons name="options-outline" size={20} color={colors.text} />
      <Text style={[styles.filterButtonText, { color: colors.text }]}>
        Filter
      </Text>
      {activeFilterCount > 0 && (
        <View style={[styles.filterBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  filterButtonText: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.tertiary.semibold,
  },
  filterBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBadgeText: {
    color: "#FFFFFF",
    fontSize: FontSize.xs,
    fontFamily: FontFamily.tertiary.bold,
  },
});
