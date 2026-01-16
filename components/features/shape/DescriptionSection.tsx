import React from "react";
import { Text, StyleSheet } from "react-native";
import { Spacing, FontSize, FontFamily } from "../../../constants";

interface DescriptionSectionProps {
  description: string;
  textColor: string;
}

export function DescriptionSection({
  description,
  textColor,
}: DescriptionSectionProps) {
  return (
    <Text style={[styles.description, { color: textColor }]}>
      {description}
    </Text>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
});
