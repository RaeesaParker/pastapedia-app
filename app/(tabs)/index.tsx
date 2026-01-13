import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../components/layout/Screen';
import { PastaCard } from '../../components/cards/PastaCard';
import { Button } from '../../components/buttons/Button';
import { useTheme } from '../../hooks/useTheme';
import { useProgress, useStats } from '../../hooks/useProgress';
import { usePasta } from '../../hooks/usePasta';
import { Spacing, FontSize, FontFamily } from '../../constants';
import { PASTA_DATABASE } from '../../data/pastaData';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const stats = useStats();
  const { progressEntries } = useProgress();
  const { pastas } = usePasta();

  // Get recently completed pastas
  const recentlyMade = progressEntries
    .slice(0, 5)
    .map(entry => PASTA_DATABASE.find(p => p.id === entry.pastaId))
    .filter(Boolean);

  const completionPercentage = Math.round((stats.uniqueShapes / pastas.length) * 100);

  return (
    <Screen>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>Ciao!</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Let's make some pasta today
          </Text>
        </View>

        {/* Progress Overview */}
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

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {stats.currentStreak}🔥
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Current Streak
            </Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {stats.totalMade}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total Made
            </Text>
          </View>
        </View>

        {/* Recently Made Section */}
        {recentlyMade.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recently Made
              </Text>
            </View>
            <FlatList
              horizontal
              data={recentlyMade}
              renderItem={({ item }) => item && <PastaCard pasta={item} />}
              keyExtractor={(item) => item?.id || ''}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        )}

        {/* Explore Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Explore Pasta Shapes
          </Text>
          <Button
            title="Browse All Shapes"
            onPress={() => router.push('/browse' as any)}
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
    padding: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSize['4xl'],
    fontFamily: FontFamily.primary.bold,
  },
  subtitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.secondary.regular,
    marginTop: Spacing.xs,
  },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: '#8B9556',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.secondary.bold,
  },
  statLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.primary.bold,
  },
  horizontalList: {
    gap: Spacing.md,
  },
});
