import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Spacing, FontSize, FontFamily } from "../../../constants";

interface SaucePairing {
  name: string;
  description: string;
}

interface SaucePairingsSectionProps {
  saucePairings: SaucePairing[];
  textColor: string;
  textSecondaryColor: string;
  borderColor: string;
}

export function SaucePairingsSection({
  saucePairings,
  textColor,
  textSecondaryColor,
  borderColor,
}: SaucePairingsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Sauce Pairings
      </Text>
      {saucePairings.map((sauce, index) => (
        <View
          key={index}
          style={[styles.sauceItem, { borderColor: borderColor }]}
        >
          <Text style={[styles.sauceName, { color: textColor }]}>
            {sauce.name}
          </Text>
          <Text
            style={[styles.sauceDescription, { color: textSecondaryColor }]}
          >
            {sauce.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.primary.bold,
    marginBottom: Spacing.md,
  },
  sauceItem: {
    borderBottomWidth: 1,
    paddingVertical: Spacing.md,
  },
  sauceName: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.secondary.semibold,
    marginBottom: Spacing.xs,
  },
  sauceDescription: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
  },
});
