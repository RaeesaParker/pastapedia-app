import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spacing, FontSize, FontFamily, IconSize } from "../../../constants";

interface Instruction {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
}

interface InstructionsSectionProps {
  instructions: Instruction[];
  textColor: string;
  textSecondaryColor: string;
  primaryColor: string;
  accentColor: string;
}

export function InstructionsSection({
  instructions,
  textColor,
  textSecondaryColor,
  primaryColor,
  accentColor,
}: InstructionsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Instructions
      </Text>
      {instructions.map((step, index) => (
        <View key={index} style={styles.instructionStep}>
          <View style={[styles.stepNumber, { backgroundColor: primaryColor }]}>
            <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: textColor }]}>
              {step.title}
            </Text>
            <Text
              style={[styles.stepDescription, { color: textSecondaryColor }]}
            >
              {step.description}
            </Text>
            {step.tip && (
              <View
                style={[styles.tipBox, { backgroundColor: accentColor + "40" }]}
              >
                <Ionicons
                  name="bulb-outline"
                  size={IconSize.sm}
                  color={primaryColor}
                />
                <Text style={[styles.tipText, { color: textColor }]}>
                  {step.tip}
                </Text>
              </View>
            )}
          </View>
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
  instructionStep: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: FontSize.base,
    fontFamily: FontFamily.tertiary.bold,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.secondary.semibold,
    marginBottom: Spacing.xs,
  },
  stepDescription: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
    lineHeight: 22,
  },
  tipBox: {
    flexDirection: "row",
    gap: Spacing.xs,
    padding: Spacing.sm,
    borderRadius: 8,
    marginTop: Spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.secondary.regular,
  },
});
