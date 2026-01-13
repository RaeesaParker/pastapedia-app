import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Screen } from '../../components/layout/Screen';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, FontSize, FontFamily } from '../../constants';

export default function ProfileScreen() {
  const { colors, theme, toggleTheme } = useTheme();

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

        <View style={[styles.settingItem, { backgroundColor: colors.card }]}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Dark Mode
          </Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.card}
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Version
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            1.0.0
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Pastapedia - Learn and track homemade pasta shapes
          </Text>
        </View>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.md,
  },
  settingLabel: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.secondary.semibold,
  },
  infoSection: {
    marginTop: Spacing.lg,
  },
  infoLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.tertiary.medium,
    marginBottom: Spacing.xs,
  },
  infoValue: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
  },
  infoText: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.secondary.regular,
    lineHeight: 24,
  },
});
