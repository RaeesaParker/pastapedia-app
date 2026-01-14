import { View, Text, StyleSheet, FlatList } from "react-native";
import { Spacing, FontSize, FontFamily } from "../../../constants";
import { useTheme } from "../../../hooks/useTheme";
import { usePasta } from "../../../hooks/usePasta";
import { useStats } from "../../../hooks/useProgress";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import ProgressCircle from "../../progress/ProgressCircle";
import { useRouter } from "expo-router";
import { TransparentButton } from "../../buttons/TransparentButton";

export default function ProgressWidget() {
  const router = useRouter();

  const { colors } = useTheme();
  const stats = useStats();

  const { pastas } = usePasta();

  return (
    <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
      <ProgressCircle />
      <View style={[styles.statsCard]}>
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
        <View style={styles.viewDetails}>
          <TransparentButton
            title="View Details"
            onPress={() => router.push("/progress" as any)}
            iconName="chevron-forward"
            iconSize={24}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressCard: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
    marginLeft: Spacing.lg,
    marginRight: Spacing.lg,
    padding: Spacing.lg,
    gap: Spacing.xxl,
    alignItems: "center",
    borderRadius: 16,
  },
  statsCard: {
    gap: Spacing.md,
  },
  progressText: {
    gap: Spacing.xs,
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
  viewDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewDetailsText: {
    fontSize: FontSize.base,
  },
});
