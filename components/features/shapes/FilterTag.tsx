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
  excluded?: boolean;
  onRemove: () => void;
}

export function FilterTag({
  label,
  excluded = false,
  onRemove,
}: FilterTagProps) {
  const { colors } = useTheme();

  const bgColor = excluded ? "#D97757" + "20" : colors.primary + "20";
  const textColor = excluded ? "#D97757" : colors.primary;

  return (
    <View style={[styles.tag, { backgroundColor: bgColor }]}>
      <Text style={[styles.tagText, { color: textColor }]}>{label}</Text>
      <TouchableOpacity
        onPress={onRemove}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close-circle" size={16} color={textColor} />
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
