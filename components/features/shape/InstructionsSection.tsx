import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
  const [isMainExpanded, setIsMainExpanded] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSteps(newExpanded);
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity
        onPress={() => setIsMainExpanded(!isMainExpanded)}
        style={styles.mainHeader}
        activeOpacity={0.7}
      >
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Instructions
        </Text>
        <Ionicons
          name={isMainExpanded ? "chevron-up" : "chevron-down"}
          size={IconSize.md}
          color={textColor}
        />
      </TouchableOpacity>
      {isMainExpanded && (
        <View style={styles.instructionsContent}>
          {instructions.map((step, index) => {
            const isExpanded = expandedSteps.has(index);
            return (
              <View key={index} style={styles.instructionStep}>
                <View
                  style={[styles.stepNumber, { backgroundColor: primaryColor }]}
                >
                  <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
                </View>
                <View style={styles.stepContent}>
                  <TouchableOpacity
                    onPress={() => toggleStep(index)}
                    style={styles.stepHeader}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.stepTitle, { color: textColor }]}>
                      {step.title}
                    </Text>
                    <Ionicons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={IconSize.sm}
                      color={textColor}
                    />
                  </TouchableOpacity>
                  {isExpanded && (
                    <>
                      <Text
                        style={[
                          styles.stepDescription,
                          { color: textSecondaryColor },
                        ]}
                      >
                        {step.description}
                      </Text>
                      {step.tip && (
                        <View
                          style={[
                            styles.tipBox,
                            { backgroundColor: accentColor + "40" },
                          ]}
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
                    </>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.lg,
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.primary.bold,
  },
  instructionsContent: {
    marginTop: Spacing.md,
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
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.secondary.semibold,
    marginBottom: Spacing.xs,
    flex: 1,
  },
  stepDescription: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
    lineHeight: 22,
    marginTop: Spacing.xs,
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
