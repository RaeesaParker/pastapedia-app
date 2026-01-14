import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../hooks/useTheme";
import {
  Spacing,
  FontSize,
  FontFamily,
  BorderRadius,
} from "../../../constants";

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

export function FilterTag({ label, onRemove }: FilterTagProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.tag, { backgroundColor: colors.primary + "20" }]}>
      <Text style={[styles.tagText, { color: colors.primary }]}>{label}</Text>
      <TouchableOpacity
        onPress={onRemove}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close-circle" size={16} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.badge,
    gap: Spacing.xs,
    marginRight: Spacing.xs,
  },
  tagText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
    textTransform: "capitalize",
  },
});
