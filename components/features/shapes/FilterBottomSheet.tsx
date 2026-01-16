import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../hooks/useTheme";
import { FilterHeader } from "./Filter/FilterHeader";
import { TypeFilter } from "./Filter/TypeFilter";
import { DifficultyFilter } from "./Filter/DifficultyFilter";
import { EquipmentFilter } from "./Filter/EquipmentFilter";
import { RegionFilter } from "./Filter/RegionFilter";
import { ShowOnlyFilter } from "./Filter/ShowOnlyFilter";
import { FilterFooter } from "./Filter/FilterFooter";
import {
  FilterState,
  PastaType,
  Difficulty,
  Equipment,
  Region,
} from "../../../types";
import { PASTA_DATABASE } from "../../../data/pastaData";

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
}

// Extract unique values from pasta database
const TYPES = Array.from(
  new Set(PASTA_DATABASE.map((p) => p.type))
) as PastaType[];
const DIFFICULTIES = Array.from(
  new Set(PASTA_DATABASE.map((p) => p.difficulty))
) as Difficulty[];
const REGIONS = Array.from(
  new Set(PASTA_DATABASE.map((p) => p.region))
).sort() as Region[];
const EQUIPMENT_OPTIONS = Array.from(
  new Set(PASTA_DATABASE.flatMap((p) => p.equipment))
).sort() as Equipment[];

export function FilterBottomSheet({
  visible,
  onClose,
  currentFilters,
  onApplyFilters,
}: FilterBottomSheetProps) {
  const { colors } = useTheme();
  const [tempFilters, setTempFilters] = useState(currentFilters);
  const [showCompleted, setShowCompleted] = useState<
    "all" | "completed" | "notCompleted"
  >("all");

  const handleClearFilters = () => {
    setTempFilters({
      types: [],
      difficulties: [],
      regions: [],
      equipment: [],
      excludedEquipment: [],
      searchQuery: "",
    });
    setShowCompleted("all");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const toggleFilter = <T extends string>(
    category: keyof FilterState,
    value: T
  ) => {
    const current = tempFilters[category] as T[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setTempFilters({ ...tempFilters, [category]: updated });
  };

  const toggleEquipmentFilter = (equipment: Equipment) => {
    let newFilters = { ...tempFilters };
    const isIncluded = tempFilters.equipment.includes(equipment);
    const isExcluded = tempFilters.excludedEquipment.includes(equipment);

    if (!isIncluded && !isExcluded) {
      // None -> Include
      newFilters.equipment = [...tempFilters.equipment, equipment];
    } else if (isIncluded) {
      // Include -> Exclude
      newFilters.equipment = tempFilters.equipment.filter(
        (eq) => eq !== equipment
      );
      newFilters.excludedEquipment = [
        ...tempFilters.excludedEquipment,
        equipment,
      ];
    } else {
      // Exclude -> None
      newFilters.excludedEquipment = tempFilters.excludedEquipment.filter(
        (eq) => eq !== equipment
      );
    }

    setTempFilters(newFilters);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.sheet, { backgroundColor: colors.background }]}>
          <FilterHeader onClose={onClose} />

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <TypeFilter
              types={TYPES}
              selectedTypes={tempFilters.types}
              onToggle={(type) => toggleFilter("types", type)}
            />

            <DifficultyFilter
              difficulties={DIFFICULTIES}
              selectedDifficulties={tempFilters.difficulties}
              onToggle={(diff) => toggleFilter("difficulties", diff)}
            />

            <EquipmentFilter
              equipmentOptions={EQUIPMENT_OPTIONS}
              selectedEquipment={tempFilters.equipment}
              excludedEquipment={tempFilters.excludedEquipment}
              onToggle={toggleEquipmentFilter}
            />

            <RegionFilter
              regions={REGIONS}
              selectedRegions={tempFilters.regions}
              onToggle={(region) => toggleFilter("regions", region)}
            />

            <ShowOnlyFilter
              showCompleted={showCompleted}
              onToggleCompleted={() =>
                setShowCompleted(
                  showCompleted === "completed" ? "all" : "completed"
                )
              }
              onToggleNotCompleted={() =>
                setShowCompleted(
                  showCompleted === "notCompleted" ? "all" : "notCompleted"
                )
              }
            />
          </ScrollView>

          <FilterFooter onClear={handleClearFilters} onApply={handleApply} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
  },
  content: {
    padding: 16,
  },
});
