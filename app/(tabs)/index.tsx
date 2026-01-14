import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/layout/Screen";
import { Button } from "../../components/buttons/Button";
import { useTheme } from "../../hooks/useTheme";
import { useProgress } from "../../hooks/useProgress";
import { Spacing, FontSize, FontFamily } from "../../constants";
import { PASTA_DATABASE } from "../../data/pastaData";
import ProgressWidget from "../../components/features/home/ProgressWidget";
import RecentlyMadeWidget from "../../components/features/home/RecentlyMadeWidget";
import FeaturedPastaWidget from "../../components/features/home/FeaturedPastaWidget";
import { Pasta } from "../../types";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { progressEntries } = useProgress();

  // Get recently completed pastas
  const recentlyMade = React.useMemo(() => {
    return (
      progressEntries
        .slice(0, 5)
        .map((entry) => PASTA_DATABASE.find((p) => p.id === entry.pastaId))
        .filter((pasta): pasta is Pasta => pasta != null) || []
    );
  }, [progressEntries]);

  return (
    <Screen>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.card }]}>
          <Text style={[styles.greeting, { color: colors.text }]}>Ciao!</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Let's make some pasta today
          </Text>
        </View>

        <FeaturedPastaWidget />

        <ProgressWidget />

        {recentlyMade.length > 0 ? (
          <RecentlyMadeWidget recentlyMade={recentlyMade} />
        ) : null}

        {/* Explore Section */}
        <View style={styles.section}>
          <Button
            title="Browse All Shapes"
            onPress={() => router.push("/browse" as any)}
            fullWidth
          />
          <Button
            title="View My Collection"
            onPress={() => router.push("/progress" as any)}
            variant="outline"
            fullWidth
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: 16,
    gap: Spacing.sm,
  },
  greeting: {
    fontSize: FontSize["4xl"],
    fontFamily: FontFamily.primary.bold,
  },
  subtitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.secondary.regular,
    marginTop: Spacing.xs,
  },
  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: 16,
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
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
  quickStats: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: FontSize["2xl"],
    fontFamily: FontFamily.secondary.bold,
  },
  statLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.lg,
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize["2xl"],
    fontFamily: FontFamily.primary.bold,
  },
  horizontalList: {
    gap: Spacing.md,
  },
});
