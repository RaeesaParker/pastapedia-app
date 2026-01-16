import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../hooks/useTheme";
import { usePastaById } from "../../hooks/usePasta";
import { useIsCompleted, useProgress } from "../../hooks/useProgress";
import { HeroSection } from "../../components/features/shape/HeroSection";
import { TitleSection } from "../../components/features/shape/TitleSection";
import { DescriptionSection } from "../../components/features/shape/DescriptionSection";
import { EquipmentSection } from "../../components/features/shape/EquipmentSection";
import { InstructionsSection } from "../../components/features/shape/InstructionsSection";
import { SaucePairingsSection } from "../../components/features/shape/SaucePairingsSection";
import { ActionSection } from "../../components/features/shape/ActionSection";
import { Spacing } from "../../constants";

export default function PastaDetailScreen() {
  const { id } = useLocalSearchParams();
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection imageUrl={pasta.imageUrl} />

        <View style={styles.content}>
          <TitleSection
            name={pasta.name}
            italianName={pasta.italianName}
            difficulty={pasta.difficulty}
            region={pasta.region}
            textColor={colors.text}
            textSecondaryColor={colors.textSecondary}
          />

          <DescriptionSection
            description={pasta.description}
            textColor={colors.text}
          />

          <EquipmentSection
            equipment={pasta.equipment}
            textColor={colors.text}
            cardElevatedColor={colors.cardElevated}
            primaryColor={colors.primary}
          />

          <InstructionsSection
            instructions={pasta.instructions}
            textColor={colors.text}
            textSecondaryColor={colors.textSecondary}
            primaryColor={colors.primary}
            accentColor={colors.accent}
          />

          <SaucePairingsSection
            saucePairings={pasta.saucePairings}
            textColor={colors.text}
            textSecondaryColor={colors.textSecondary}
            borderColor={colors.border}
          />

          <ActionSection
            isCompleted={isCompleted}
            onToggleComplete={handleToggleComplete}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.lg,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
