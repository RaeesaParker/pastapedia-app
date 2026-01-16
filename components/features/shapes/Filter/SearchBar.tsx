import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../../hooks/useTheme";
import {
  Spacing,
  FontSize,
  FontFamily,
  BorderRadius,
} from "../../../../constants";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.searchContainer,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Ionicons
        name="search"
        size={20}
        color={colors.textSecondary}
        style={styles.searchIcon}
      />
      <TextInput
        style={[styles.searchInput, { color: colors.text }]}
        placeholder="Search pasta shapes..."
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons
            name="close-circle"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.base,
    fontFamily: FontFamily.tertiary.regular,
  },
});
