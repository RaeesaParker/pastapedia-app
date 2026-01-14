import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Spacing, FontSize, FontFamily } from "../../../constants";

interface FilterCategoryProps {
  title: string;
  children: React.ReactNode;
}

export function FilterCategory({ title, children }: FilterCategoryProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.tertiary.bold,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
});
