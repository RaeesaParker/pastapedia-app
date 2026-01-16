import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "../../../../hooks/useTheme";
import { FontSize, FontFamily, Spacing } from "../../../../constants";

interface ResultsCountProps {
  count: number;
}

export function ResultsCount({ count }: ResultsCountProps) {
  const { colors } = useTheme();

  return (
    <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
      {count} {count === 1 ? "shape" : "shapes"} found
    </Text>
  );
}

const styles = StyleSheet.create({
  resultsCount: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.regular,
    marginBottom: Spacing.md,
  },
});
