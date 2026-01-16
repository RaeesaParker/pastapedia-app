import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../../hooks/useTheme";
import { FilterCategory } from "../FilterCategory";
import { FilterChip } from "../FilterChip";
import { Equipment } from "../../../../types";
import { Spacing, FontSize, FontFamily } from "../../../../constants";

interface EquipmentFilterProps {
  equipmentOptions: Equipment[];
  selectedEquipment: Equipment[];
  excludedEquipment: Equipment[];
  onToggle: (equipment: Equipment) => void;
}

export function EquipmentFilter({
  equipmentOptions,
  selectedEquipment,
  excludedEquipment,
  onToggle,
}: EquipmentFilterProps) {
  const { colors } = useTheme();

  const getEquipmentState = (
    equipment: Equipment
  ): "none" | "include" | "exclude" => {
    if (selectedEquipment.includes(equipment)) return "include";
    if (excludedEquipment.includes(equipment)) return "exclude";
    return "none";
  };

  const handleToggle = (equipment: Equipment) => {
    onToggle(equipment);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <FilterCategory title="BY EQUIPMENT">
      <View style={styles.equipmentHeader}>
        <Text style={[styles.helperText, { color: colors.textSecondary }]}>
          Tap to cycle: Include → Exclude → Clear
        </Text>
      </View>
      <View style={styles.equipmentLegend}>
        <View style={styles.legendItem}>
          <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>
            Must have
          </Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="close-circle" size={14} color="#D97757" />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>
            Must not have
          </Text>
        </View>
      </View>
      <View style={styles.grid}>
        {equipmentOptions.map((eq) => {
          const state = getEquipmentState(eq);
          return (
            <FilterChip
              key={eq}
              label={eq}
              selected={state === "include"}
              excluded={state === "exclude"}
              onPress={() => handleToggle(eq)}
            />
          );
        })}
      </View>
    </FilterCategory>
  );
}

const styles = StyleSheet.create({
  equipmentHeader: {
    marginBottom: Spacing.sm,
  },
  helperText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.tertiary.regular,
    fontStyle: "italic",
  },
  equipmentLegend: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  legendText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.tertiary.regular,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
});
