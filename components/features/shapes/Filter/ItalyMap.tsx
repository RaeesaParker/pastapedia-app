import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, G, Text as SvgText } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../../hooks/useTheme";
import { Region } from "../../../../types";

interface ItalyMapProps {
  selectedRegions: Region[];
  onToggle: (region: Region) => void;
  onToggleMultiple: (regions: Region[]) => void;
}

// Simplified region groupings matching your image
const REGION_PATHS: Record<
  string,
  {
    path: string;
    label: { x: number; y: number };
    regions: Region[];
    color: string;
  }
> = {
  Sardinia: {
    path: "M140,200 Q190,290 190,370 Q190,400 140,380 Q80,350 80,270 Q80,220 140,200 Z",
    label: { x: 135, y: 290 },
    regions: ["Sardinia"],
    color: "#E8D5C4",
  },
  Sicily: {
    path: "M200,600 Q220,640 280,630 Q300,620 270,600 Q240,580 200,600 Z",
    label: { x: 250, y: 615 },
    regions: ["Sicily"],
    color: "#F4E3D1",
  },
  North: {
    path: "M220,90 L450,90 L450,210 L380,210 L380,240 L260,240 L260,210 L220,210 Z",
    label: { x: 335, y: 145 },
    regions: [
      "Lombardy",
      "Piedmont",
      "Valle d'Aosta",
      "Liguria",
      "Veneto",
      "Trentino-Alto Adige",
      "Friuli-Venezia Giulia",
      "Emilia-Romagna",
    ],
    color: "#D4E3D4",
  },
  Central: {
    path: "M260,240 L380,240 L380,390 L340,450 L270,450 L260,390 Z",
    label: { x: 320, y: 340 },
    regions: ["Tuscany", "Umbria", "Marche", "Lazio", "Abruzzo", "Molise"],
    color: "#E3D9C8",
  },
  South: {
    path: "M270,450 L340,450 L380,540 L340,630 L280,580 L260,540 Z",
    label: { x: 320, y: 520 },
    regions: ["Campania", "Puglia", "Basilicata", "Calabria"],
    color: "#F5E6D3",
  },
};

export function ItalyMap({
  selectedRegions,
  onToggle,
  onToggleMultiple,
}: ItalyMapProps) {
  console.log("Selected Regions:", selectedRegions);
  const { colors, theme } = useTheme();

  const handleRegionPress = (regions: Region[]) => {
    console.log("Region group pressed:", regions);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Pass all regions to be toggled at once
    onToggleMultiple(regions);
  };

  const isRegionGroupSelected = (regions: Region[]) => {
    return regions.some((r) => selectedRegions.includes(r));
  };

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 500 650">
        <G>
          {Object.entries(REGION_PATHS).map(([name, data]) => {
            const isSelected = isRegionGroupSelected(data.regions);
            return (
              <G key={name}>
                <Path
                  d={data.path}
                  fill={
                    isSelected
                      ? colors.primary
                      : theme === "dark"
                      ? colors.card
                      : data.color
                  }
                  stroke={colors.border}
                  strokeWidth={2}
                  onPress={() => {
                    console.log("The label for", name, "was pressed");
                    console.log("Data is:", data);
                    handleRegionPress(data.regions);
                  }}
                />
                <SvgText
                  x={data.label.x}
                  y={data.label.y}
                  fill={isSelected ? colors.background : colors.text}
                  fontSize="18"
                  fontWeight="600"
                  textAnchor="middle"
                  onPress={() => {
                    console.log("The label for", name, "was pressed");
                    console.log("Data is:", data);
                    handleRegionPress(data.regions);
                  }}
                >
                  {name}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 500 / 650,
  },
});
