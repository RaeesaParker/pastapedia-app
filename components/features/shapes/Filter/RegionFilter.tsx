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
  REGION_GROUPS,
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
  const { colors, theme } = useTheme();
  const [showMap, setShowMap] = useState(false);

  const toggleMapVisibility = () => {
    setShowMap(!showMap);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleToggle = (region: Region) => {
    onToggle(region);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleGroupToggle = (groupRegions: Region[]) => {
    onToggleMultiple(groupRegions);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const isGroupSelected = (groupRegions: Region[]) => {
    return groupRegions.some((r) => selectedRegions.includes(r));
  };

  const getGroupSelectionCount = (groupRegions: Region[]) => {
    const availableRegions = groupRegions.filter((r) => regions.includes(r));
    const selectedCount = availableRegions.filter((r) =>
      selectedRegions.includes(r)
    ).length;
    return { selected: selectedCount, total: availableRegions.length };
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

      {Object.entries(REGION_GROUPS).map(([groupName, groupData]) => {
        const availableRegions = groupData.regions.filter((r) =>
          regions.includes(r)
        );
        if (availableRegions.length === 0) return null;

        const { selected, total } = getGroupSelectionCount(groupData.regions);
        const isSelected = isGroupSelected(groupData.regions);

        return (
          <View key={groupName} style={styles.regionGroup}>
            <TouchableOpacity
              style={[
                styles.groupHeader,
                {
                  backgroundColor:
                    theme === "dark"
                      ? colors.card
                      : isSelected
                      ? groupData.color
                      : groupData.lightColor,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => handleGroupToggle(groupData.regions)}
            >
              <Text
                style={[
                  styles.groupTitle,
                  { color: isSelected ? colors.text : colors.textSecondary },
                ]}
              >
                {groupName}
              </Text>
              <View style={styles.groupHeaderRight}>
                {selected > 0 && (
                  <Text
                    style={[
                      styles.groupCount,
                      { color: isSelected ? colors.text : colors.textTertiary },
                    ]}
                  >
                    {selected}/{total}
                  </Text>
                )}
                <Ionicons
                  name={
                    selected === total && selected > 0
                      ? "checkbox"
                      : selected > 0
                      ? "checkbox-outline"
                      : "square-outline"
                  }
                  size={20}
                  color={isSelected ? colors.primary : colors.textTertiary}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.grid}>
              {availableRegions.map((region) => (
                <FilterChip
                  key={region}
                  label={region}
                  selected={selectedRegions.includes(region)}
                  onPress={() => handleToggle(region)}
                />
              ))}
            </View>
          </View>
        );
      })}
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
  regionGroup: {
    marginBottom: Spacing.lg,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  groupTitle: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.tertiary.semibold,
  },
  groupHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  groupCount: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
});
