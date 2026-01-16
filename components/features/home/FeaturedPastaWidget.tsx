import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../hooks/useTheme";
import { usePasta } from "../../../hooks/usePasta";
import { Button } from "../../buttons/Button";
import {
  Spacing,
  FontSize,
  FontFamily,
  BorderRadius,
} from "../../../constants";

export default function FeaturedPastaWidget() {
  const router = useRouter();
  const { colors } = useTheme();
  const { pastas } = usePasta();

  // Pick a random pasta
  const featuredPasta = useMemo(() => {
    if (pastas.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * pastas.length);
    return pastas[randomIndex];
  }, [pastas]);

  if (!featuredPasta) return null;

  // Truncate description to ~60 characters
  const truncatedDescription =
    featuredPasta.description.length > 60
      ? featuredPasta.description.substring(0, 60) + "..."
      : featuredPasta.description;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={[styles.badge, { backgroundColor: colors.accentLight }]}>
        <Ionicons name="sparkles" size={16} color={colors.primaryDark} />
        <Text style={[styles.badgeText, { color: colors.primaryDark }]}>
          Featured This Week
        </Text>
      </View>

      <Image
        source={{ uri: featuredPasta.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>
          {featuredPasta.name}
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {truncatedDescription}
        </Text>

        <Button
          title="Learn More"
          onPress={() => router.push(`/shapes/${featuredPasta.id}` as any)}
          variant="secondary"
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.card,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  badge: {
    position: "absolute",
    top: Spacing.md,
    left: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    zIndex: 1,
  },
  badgeText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.semibold,
  },
  image: {
    width: "100%",
    height: 240,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  name: {
    fontSize: FontSize["2xl"],
    fontFamily: FontFamily.primary.bold,
  },
  description: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
    lineHeight: 24,
  },
});
