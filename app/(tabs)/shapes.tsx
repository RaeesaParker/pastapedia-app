import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Screen } from "../../components/layout/Screen";
import { PastaCard } from "../../components/cards/PastaCard";
import { useTheme } from "../../hooks/useTheme";
import { usePasta } from "../../hooks/usePasta";
import { Spacing, FontSize, FontFamily } from "../../constants";

export default function ShapesScreen() {
  const { colors } = useTheme();
  const { filteredPastas } = usePasta();

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Browse Pasta
          </Text>
        </View>

        {/* Pasta Grid */}
        <FlatList
          data={filteredPastas}
          renderItem={({ item }) => <PastaCard pasta={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  header: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize["3xl"],
    fontFamily: FontFamily.primary.bold,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  row: {
    justifyContent: "space-between",
  },
});
