import { View, Text, StyleSheet, FlatList } from "react-native";
import { Spacing, FontSize, FontFamily } from "../../../constants";
import { useTheme } from "../../../hooks/useTheme";
import { usePasta } from "../../../hooks/usePasta";
import { useStats } from "../../../hooks/useProgress";

export default function ProgressWidget() {
  const { colors } = useTheme();
  const stats = useStats();

  const { pastas } = usePasta();
  const completionPercentage = Math.round(
    (stats.uniqueShapes / pastas.length) * 100
  );

  return (
    <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
      <View style={styles.progressCircle}>
        <Text style={[styles.progressPercentage, { color: colors.primary }]}>
          {completionPercentage}%
        </Text>
      </View>
      <View style={styles.progressText}>
        <Text style={[styles.progressTitle, { color: colors.text }]}>
          Your Journey
        </Text>
        <Text style={[styles.progressStats, { color: colors.textSecondary }]}>
          {stats.uniqueShapes} of {pastas.length} shapes made
        </Text>
        <Text style={[styles.progressStats, { color: colors.textSecondary }]}>
          {stats.regionsCovered} regions explored
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: 16,
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
    marginLeft: Spacing.lg,
    marginRight: Spacing.lg,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "#8B9556",
    alignItems: "center",
    justifyContent: "center",
  },
  progressPercentage: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.secondary.bold,
  },
  progressText: {
    flex: 1,
  },
  progressTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.primary.bold,
    marginBottom: Spacing.xs,
  },
  progressStats: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.secondary.regular,
    marginTop: 2,
  },
});
