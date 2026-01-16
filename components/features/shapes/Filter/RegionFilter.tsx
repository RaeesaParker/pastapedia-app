import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../../hooks/useTheme";
import { FilterCategory } from "../FilterCategory";
import { FilterChip } from "../FilterChip";
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
}

export function RegionFilter({
  regions,
  selectedRegions,
  onToggle,
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
            styles.mapPlaceholder,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.mapText, { color: colors.textSecondary }]}>
            Interactive Italy Map
          </Text>
          <Text style={[styles.mapSubtext, { color: colors.textSecondary }]}>
            Tap regions to filter
          </Text>
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
  mapPlaceholder: {
    height: 200,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  mapText: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.tertiary.semibold,
  },
  mapSubtext: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.regular,
    marginTop: Spacing.xs,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
});
