import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../hooks/useTheme';
import { usePastaById } from '../../hooks/usePasta';
import { useIsCompleted, useProgress } from '../../hooks/useProgress';
import { DifficultyBadge } from '../../components/badges/DifficultyBadge';
import { Button } from '../../components/buttons/Button';
import { Ionicons } from '@expo/vector-icons';
import { Spacing, FontSize, FontFamily, IconSize } from '../../constants';

export default function PastaDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const pasta = usePastaById(id as string);
  const isCompleted = useIsCompleted(id as string);
  const { markPastaAsComplete, removePastaFromComplete } = useProgress();

  if (!pasta) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.errorContainer}>
          <Text style={{ color: colors.text }}>Pasta not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleToggleComplete = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (isCompleted) {
      await removePastaFromComplete(pasta.id);
    } else {
      await markPastaAsComplete(pasta.id);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: pasta.imageUrl }} style={styles.heroImage} />

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
          >
            <Ionicons name="arrow-back" size={IconSize.md} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.name, { color: colors.text }]}>{pasta.name}</Text>
            <Text style={[styles.italianName, { color: colors.textSecondary }]}>
              {pasta.italianName}
            </Text>

            <View style={styles.tags}>
              <DifficultyBadge difficulty={pasta.difficulty} />
              <View style={[styles.regionTag, { backgroundColor: colors.cardElevated, borderColor: colors.border }]}>
                <Ionicons name="location-outline" size={16} color={colors.primary} />
                <Text style={[styles.regionText, { color: colors.textSecondary }]}>
                  {pasta.region}
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <Text style={[styles.description, { color: colors.text }]}>
            {pasta.description}
          </Text>

          {/* Equipment Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Equipment Needed</Text>
            <View style={styles.equipmentList}>
              {pasta.equipment.map((item, index) => (
                <View
                  key={index}
                  style={[styles.equipmentItem, { backgroundColor: colors.cardElevated }]}
                >
                  <Ionicons name="hammer-outline" size={IconSize.sm} color={colors.primary} />
                  <Text style={[styles.equipmentText, { color: colors.text }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Instructions</Text>
            {pasta.instructions.map((step, index) => (
              <View key={index} style={styles.instructionStep}>
                <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: colors.text }]}>{step.title}</Text>
                  <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                    {step.description}
                  </Text>
                  {step.tip && (
                    <View style={[styles.tipBox, { backgroundColor: colors.accent + '40' }]}>
                      <Ionicons name="bulb-outline" size={IconSize.sm} color={colors.primary} />
                      <Text style={[styles.tipText, { color: colors.text }]}>{step.tip}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Sauce Pairings */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sauce Pairings</Text>
            {pasta.saucePairings.map((sauce, index) => (
              <View key={index} style={[styles.sauceItem, { borderColor: colors.border }]}>
                <Text style={[styles.sauceName, { color: colors.text }]}>{sauce.name}</Text>
                <Text style={[styles.sauceDescription, { color: colors.textSecondary }]}>
                  {sauce.description}
                </Text>
              </View>
            ))}
          </View>

          {/* Mark as Made Button */}
          <View style={styles.actionSection}>
            <Button
              title={isCompleted ? '✓ Completed' : 'Mark as Made'}
              onPress={handleToggleComplete}
              variant={isCompleted ? 'outline' : 'primary'}
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.lg,
  },
  titleSection: {
    marginBottom: Spacing.lg,
  },
  name: {
    fontSize: FontSize['4xl'],
    fontFamily: FontFamily.primary.bold,
    marginBottom: Spacing.xs,
  },
  italianName: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.secondary.regular,
    fontStyle: 'italic',
    marginBottom: Spacing.md,
  },
  tags: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  regionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 20,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
  },
  regionText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.tertiary.medium,
  },
  description: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.primary.bold,
    marginBottom: Spacing.md,
  },
  equipmentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 12,
  },
  equipmentText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: FontSize.base,
    fontFamily: FontFamily.tertiary.bold,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.secondary.semibold,
    marginBottom: Spacing.xs,
  },
  stepDescription: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
    lineHeight: 22,
  },
  tipBox: {
    flexDirection: 'row',
    gap: Spacing.xs,
    padding: Spacing.sm,
    borderRadius: 8,
    marginTop: Spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.secondary.regular,
  },
  sauceItem: {
    borderBottomWidth: 1,
    paddingVertical: Spacing.md,
  },
  sauceName: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.secondary.semibold,
    marginBottom: Spacing.xs,
  },
  sauceDescription: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
  },
  actionSection: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
