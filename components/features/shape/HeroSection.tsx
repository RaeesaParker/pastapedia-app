import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Spacing, IconSize } from "../../../constants";

interface HeroSectionProps {
  imageUrl: string;
}

export function HeroSection({ imageUrl }: HeroSectionProps) {
  const router = useRouter();

  return (
    <View style={styles.heroContainer}>
      <Image source={{ uri: imageUrl }} style={styles.heroImage} />

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.backButton, { backgroundColor: "rgba(0,0,0,0.5)" }]}
      >
        <Ionicons name="arrow-back" size={IconSize.md} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    height: 300,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: Spacing.md,
    left: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
