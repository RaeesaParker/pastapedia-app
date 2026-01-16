import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../../hooks/useTheme";
import { FilterCategory } from "../FilterCategory";
import { FilterChip } from "../FilterChip";
import { ItalyMap } from "./ItalyMap";
import { Region } from "../../../../types";
import {
  Spacing,
  FontSize,
  FontFamily,
  BorderRadius,
} from "../../../../constants";

interface RegionFilterProps {
  regions: Region[];
  selectedRegions: Region[];
  onToggle: (region: Region) => void;
  onToggleMultiple: (regions: Region[]) => void;
}

export function RegionFilter({
  regions,
  selectedRegions,
  onToggle,
  onToggleMultiple,
}: RegionFilterProps) {
  const { colors } = useTheme();
  const [showMap, setShowMap] = useState(false);

  const toggleMapVisibility = () => {
    setShowMap(!showMap);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleToggle = (region: Region) => {
    onToggle(region);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <FilterCategory title="BY REGION">
      <TouchableOpacity style={styles.mapToggle} onPress={toggleMapVisibility}>
        <Ionicons
          name={showMap ? "eye-off-outline" : "map-outline"}
          size={18}
          color={colors.primary}
        />
        <Text style={[styles.mapToggleText, { color: colors.primary }]}>
          {showMap ? "Hide Map" : "Show Map"}
        </Text>
      </TouchableOpacity>

      {showMap && (
        <View
          style={[
            styles.mapContainer,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <ItalyMap
            selectedRegions={selectedRegions}
            onToggle={onToggle}
            onToggleMultiple={onToggleMultiple}
          />
        </View>
      )}

      <View style={styles.grid}>
        {regions.map((region) => (
          <FilterChip
            key={region}
            label={region}
            selected={selectedRegions.includes(region)}
            onPress={() => handleToggle(region)}
          />
        ))}
      </View>
    </FilterCategory>
  );
}

const styles = StyleSheet.create({
  mapToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  mapToggleText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.semibold,
  },
  mapContainer: {
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
});
