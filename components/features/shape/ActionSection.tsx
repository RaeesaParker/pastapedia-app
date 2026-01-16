import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "../../buttons/Button";
import { Spacing } from "../../../constants";

interface ActionSectionProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function ActionSection({
  isCompleted,
  onToggleComplete,
}: ActionSectionProps) {
  return (
    <View style={styles.actionSection}>
      <Button
        title={isCompleted ? "✓ Completed" : "Mark as Made"}
        onPress={onToggleComplete}
        variant={isCompleted ? "outline" : "primary"}
        fullWidth
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionSection: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
});
