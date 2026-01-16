import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Pasta } from "../../types";
import { useTheme } from "../../hooks/useTheme";
import { useIsCompleted } from "../../hooks/useProgress";
import { DifficultyBadge } from "../badges/DifficultyBadge";
import { RegionBadge } from "../badges/RegionBadge";
import {
  BorderRadius,
  Spacing,
  FontSize,
  FontFamily,
  Shadow,
} from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const CARD_WIDTH = (Dimensions.get("window").width - Spacing.md * 3) / 2.5;

interface PastaCardProps {
  pasta: Pasta;
}

export function PastaCard({ pasta }: PastaCardProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const isCompleted = useIsCompleted(pasta.id);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/shapes/${pasta.id}` as any)}
      style={[styles.card, { backgroundColor: colors.card }, Shadow.md]}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pasta.thumbnailUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {isCompleted && (
          <View
            style={[styles.completedBadge, { backgroundColor: colors.primary }]}
          >
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {pasta.name}
        </Text>

        <View style={styles.footer}>
          <RegionBadge region={pasta.region} size="small" />
          <DifficultyBadge difficulty={pasta.difficulty} size="small" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: BorderRadius.card,
    overflow: "hidden",
    marginBottom: Spacing.md,
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 120,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  completedBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  name: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.semibold,
    marginBottom: 2,
  },
  regionSection: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginBottom: 2,
  },
  regionName: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.secondary.regular,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: Spacing.sm,
    justifyContent: "center",
  },
});
