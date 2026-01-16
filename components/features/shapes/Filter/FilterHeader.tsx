import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../../hooks/useTheme";
import { Spacing, FontSize, FontFamily } from "../../../../constants";

interface FilterHeaderProps {
  onClose: () => void;
}

export function FilterHeader({ onClose }: FilterHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text }]}>Filter Shapes</Text>
      <TouchableOpacity onPress={onClose}>
        <Ionicons name="close" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.primary.bold,
  },
});
