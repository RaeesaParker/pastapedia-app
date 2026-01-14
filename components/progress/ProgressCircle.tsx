import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { FontFamily, FontSize, Spacing } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { usePasta } from "../../hooks/usePasta";
import { useStats } from "../../hooks/useProgress";

export default function ProgressCircle() {
  const { colors } = useTheme();
  const stats = useStats();

  const { pastas } = usePasta();
  const completionPercentage = Math.round(
    (stats.uniqueShapes / pastas.length) * 100
  );

  // Circle parameters
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (completionPercentage / 100) * circumference;

  return (
    <View style={styles.progressCircle}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background circle (orange) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.secondary}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle (dark green) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primaryDark}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${progress} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={[styles.progressPercentage, { color: colors.primary }]}>
        {completionPercentage}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  progressCard: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
    marginLeft: Spacing.lg,
    marginRight: Spacing.lg,
    padding: Spacing.lg,
    gap: Spacing.xl,
    alignItems: "center",
  },
  statsCard: {
    gap: Spacing.md,
  },
  progressCircle: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  svg: {
    position: "absolute",
  },
  progressPercentage: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.secondary.bold,
    position: "absolute",
  },
});
