import { FlatList, View, StyleSheet, Text } from "react-native";
import { Spacing, FontSize, FontFamily } from "../../../constants";
import { PastaCard } from "../../cards/PastaCard";
import { useTheme } from "../../../hooks/useTheme";
import { Pasta } from "../../../types";

export default function RecentlyMadeWidget({
  recentlyMade,
}: {
  recentlyMade: Pasta[];
}) {
  const { colors } = useTheme();

  return (
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
        keyExtractor={(item) => item?.id || ""}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl,
    marginLeft: Spacing.lg,
    marginRight: Spacing.lg,
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
