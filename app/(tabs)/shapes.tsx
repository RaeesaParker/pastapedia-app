import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Screen } from "../../components/layout/Screen";
import { PastaCard } from "../../components/cards/PastaCard";
import FilterSection from "../../components/features/shapes/FilterSection";
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
        <View style={[styles.header, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            Pasta Shapes
          </Text>
        </View>

        {/* Filter Section */}
        <View
          style={[styles.filterContainer, { backgroundColor: colors.card }]}
        >
          <FilterSection />
        </View>

        {/* Pasta Grid */}
        <View style={styles.pastaContainer}>
          <FlatList
            data={filteredPastas}
            renderItem={({ item }) => <PastaCard pasta={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{ height: Spacing.md }} />
            )}
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
    padding: Spacing.lg,
    borderRadius: 16,
  },
  title: {
    fontSize: FontSize["3xl"],
    fontFamily: FontFamily.primary.bold,
  },
  filterContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  row: {
    justifyContent: "space-between",
    gap: Spacing.md,
  },
  pastaContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
});
