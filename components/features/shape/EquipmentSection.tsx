import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spacing, FontSize, FontFamily, IconSize } from "../../../constants";

interface EquipmentSectionProps {
  equipment: string[];
  textColor: string;
  cardElevatedColor: string;
  primaryColor: string;
}

export function EquipmentSection({
  equipment,
  textColor,
  cardElevatedColor,
  primaryColor,
}: EquipmentSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Equipment Needed
      </Text>
      <View style={styles.equipmentList}>
        {equipment.map((item, index) => (
          <View
            key={index}
            style={[
              styles.equipmentItem,
              { backgroundColor: cardElevatedColor },
            ]}
          >
            <Ionicons
              name="hammer-outline"
              size={IconSize.sm}
              color={primaryColor}
            />
            <Text style={[styles.equipmentText, { color: textColor }]}>
              {item}
            </Text>
          </View>
        ))}
      </View>
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
  equipmentList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  equipmentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 12,
  },
  equipmentText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
  },
});
