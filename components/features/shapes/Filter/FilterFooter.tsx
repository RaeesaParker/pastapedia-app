import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../../../hooks/useTheme";
import { Button } from "../../../buttons/Button";
import { Spacing } from "../../../../constants";

interface FilterFooterProps {
  onClear: () => void;
  onApply: () => void;
}

export function FilterFooter({ onClear, onApply }: FilterFooterProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.footer, { borderTopColor: colors.border }]}>
      <View style={styles.buttons}>
        <Button
          title="Clear All"
          onPress={onClear}
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Apply Filters"
          onPress={onApply}
          variant="primary"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    padding: Spacing.lg,
  },
  buttons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
});
