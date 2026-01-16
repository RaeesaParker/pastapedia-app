import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DifficultyBadge } from "../../badges/DifficultyBadge";
import { RegionBadge } from "../../badges/RegionBadge";
import { Spacing, FontSize, FontFamily } from "../../../constants";
import { Difficulty } from "../../../types";

interface TitleSectionProps {
  name: string;
  italianName: string;
  difficulty: Difficulty;
  region: string;
  textColor: string;
  textSecondaryColor: string;
}

export function TitleSection({
  name,
  italianName,
  difficulty,
  region,
  textColor,
  textSecondaryColor,
}: TitleSectionProps) {
  return (
    <View style={styles.titleSection}>
      <Text style={[styles.name, { color: textColor }]}>{name}</Text>
      <Text style={[styles.italianName, { color: textSecondaryColor }]}>
        {italianName}
      </Text>

      <View style={styles.tags}>
        <DifficultyBadge difficulty={difficulty} />
        <RegionBadge region={region} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleSection: {
    marginBottom: Spacing.lg,
  },
  name: {
    fontSize: FontSize["4xl"],
    fontFamily: FontFamily.primary.bold,
    marginBottom: Spacing.xs,
  },
  italianName: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.secondary.regular,
    fontStyle: "italic",
    marginBottom: Spacing.md,
  },
  tags: {
    flexDirection: "row",
    gap: Spacing.sm,
    flexWrap: "wrap",
  },
});
