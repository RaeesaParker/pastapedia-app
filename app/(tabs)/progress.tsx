import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Screen } from '../../components/layout/Screen';
import { PastaCard } from '../../components/cards/PastaCard';
import { useTheme } from '../../hooks/useTheme';
import { useProgress } from '../../hooks/useProgress';
import { PASTA_DATABASE } from '../../data/pastaData';
import { Spacing, FontSize, FontFamily } from '../../constants';

export default function ProgressScreen() {
  const { colors } = useTheme();
  const { completedPastas, stats } = useProgress();

  const completedPastaObjects = completedPastas
    .map(id => PASTA_DATABASE.find(p => p.id === id))
    .filter(Boolean);

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>

        {/* Stats Card */}
        <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statsTitle, { color: colors.text }]}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {stats.uniqueShapes}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Shapes Made
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {stats.regionsCovered}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Regions
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {stats.currentStreak}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Current Streak
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {stats.totalMade}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Total Made
              </Text>
            </View>
          </View>
        </View>

        {/* Completed Pasta Grid */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Completed Shapes ({completedPastaObjects.length})
        </Text>
        <FlatList
          data={completedPastaObjects}
          renderItem={({ item }) => item && <PastaCard pasta={item} />}
          keyExtractor={(item) => item?.id || ''}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No completed pastas yet. Start making some!
              </Text>
            </View>
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSize['4xl'],
    fontFamily: FontFamily.primary.bold,
    marginBottom: Spacing.lg,
  },
  statsCard: {
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.lg,
  },
  statsTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.primary.bold,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
  },
  statValue: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.secondary.bold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
  },
  sectionTitle: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.primary.bold,
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyState: {
    paddingVertical: Spacing.xxxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.secondary.regular,
  },
});
